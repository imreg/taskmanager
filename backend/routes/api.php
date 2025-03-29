<?php
declare(strict_types=1);

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/tasks', TaskController::class);
Route::post('/tasks/{task}/duplicate', [TaskController::class, 'duplicate']);
Route::post('/tasks/{task}/reschedule', [TaskController::class, 'reschedule']);
