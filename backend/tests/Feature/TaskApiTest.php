<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_creation_successful():void
    {
        $day = Carbon::parse('next monday')->toDateString();
        $response = $this->postJson('/api/tasks', [
            'megnevezes' => 'Teszt Feladat',
            'prioritas' => 'normal',
            'utemezett_nap' => $day,
            'hossz' => 120,
            'kesz' => false,
            'megbizottak' => ['Anna'],
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', ['megnevezes' => 'Teszt Feladat']);
    }

    public function test_task_creation_fails_on_weekend():void
    {
        $saturday = Carbon::parse('next saturday')->toDateString();

        $response = $this->postJson('/api/tasks', [
            'megnevezes' => 'Weekend Task',
            'prioritas' => 'normal',
            'utemezett_nap' => $saturday,
            'hossz' => 60,
            'kesz' => false,
            'megbizottak' => ['Béla'],
        ]);
        
        $response->assertStatus(422);
    }

    public function test_task_listing():void
    {
        Task::factory()->create([
            'utemezett_nap' => now()->toDateString(),
        ]);

        $response = $this->getJson('/api/tasks?week_start=' . now()->startOfWeek()->toDateString());
        $response->assertStatus(200)->assertJsonCount(1);
    }

    public function test_task_update():void
    {
        $task = Task::factory()->create();
        $response = $this->putJson("/api/tasks/{$task->id}", ['megnevezes' => 'Frissített Név']);

        $response->assertStatus(200);
        $this->assertEquals('Frissített Név', $task->fresh()->megnevezes);
    }

    public function test_task_deletion():void
    {
        $task = Task::factory()->create();
        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_task_duplication():void
    {
        $task = Task::factory()->create([
            'utemezett_nap' => now()->toDateString()
        ]);
        $response = $this->postJson("/api/tasks/{$task->id}/duplicate");

        $response->assertStatus(201);
        $this->assertDatabaseCount('tasks', 2);
    }

    public function test_max_hours_per_user_validation():void
    {
        $day = Carbon::parse('next monday')->toDateString();

        Task::factory()->create([
            'utemezett_nap' => $day,
            'hossz' => 480,
            'megbizottak' => ['Anna'],
        ]);

        $response = $this->postJson('/api/tasks', [
            'megnevezes' => 'Extra munka',
            'prioritas' => 'normal',
            'utemezett_nap' => $day,
            'hossz' => 60,
            'kesz' => false,
            'megbizottak' => ['Anna'],
        ]);

        $response->assertStatus(422);
    }
}
