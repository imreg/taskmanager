<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Tests\TestCase;

class MaxHoursValidationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return void
     */
    public function test_it_allows_task_within_8_hours_limit():void
    {
        $date = Carbon::parse('next monday')->toDateString();

        Task::factory()->create([
            'utemezett_nap' => $date,
            'hossz' => 300,
            'megbizottak' => ['Anna']
        ]);

        $this->expectNotToPerformAssertions();
        Task::validateMaxHoursOrAbort($date, ['Anna'], 180); // Total 480
    }

    /**
     * @return void
     */
    public function test_it_throws_exception_when_limit_exceeded():void
    {
        $date = Carbon::parse('next monday')->toDateString();

        Task::factory()->create([
            'utemezett_nap' => $date,
            'hossz' => 450,
            'megbizottak' => ['Anna']
        ]);

        $this->expectException(HttpResponseException::class);

        Task::validateMaxHoursOrAbort($date, ['Anna'], 40); // Total 490
    }
}
