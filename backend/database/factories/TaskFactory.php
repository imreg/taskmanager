<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'megnevezes' => $this->faker->sentence(3),
            'prioritas' => $this->faker->randomElement(['alacsony', 'normal', 'magas']),
            'utemezett_nap' => $this->faker->dateTimeBetween('-1 week', '+1 week')->format('Y-m-d'),
            'hossz' => $this->faker->numberBetween(15, 120),
            'kesz' => $this->faker->boolean(30),
            'megbizottak' => $this->faker->randomElements([
                'Anna', 'Béla', 'Csaba', 'Dóra', 'Eszter', 'Ferenc', 'Gábor'
            ], rand(1, 4)),
        ];
    }
}
