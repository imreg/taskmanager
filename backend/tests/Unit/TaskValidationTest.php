<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Carbon;
use Tests\TestCase;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskValidationTest extends TestCase
{
    /**
     * @return void
     */
    public function test_it_passes_on_weekday():void
    {
        $monday = Carbon::parse('next monday')->toDateString();

        $this->expectNotToPerformAssertions();
        Task::validateWeekdayOrAbort($monday);
    }

    /**
     * @return void
     */
    public function test_it_throws_http_exception_on_weekend():void
    {
        $saturday = Carbon::parse('next saturday')->toDateString();

        try {
            Task::validateWeekdayOrAbort($saturday);
        } catch (HttpResponseException $e) {
            $this->assertEquals(422, $e->getResponse()->getStatusCode());
        }
    }
}
