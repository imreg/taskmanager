<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Carbon\Carbon;

class TaskController extends Controller
{
    /**
     * GET	/api/tasks
     * @param \Illuminate\Http\Request $request
     * @return Collection<int, Task>
     */
    public function index(Request $request): Collection
    {
        $start = Carbon::parse($request->query('week_start', now()->startOfWeek()));
        $end = (clone $start)->addDays(4);

        return Task::whereBetween('utemezett_nap', [$start, $end])->get();
    }

    /**
     * GET	/api/tasks/{task}
     * @param \App\Models\Task $task
     * @return Task
     */
    public function show(Task $task): Task
    {
        return $task;
    }

    /**
     * POST	/api/tasks
     * @param \Illuminate\Http\Request $request
     * @return Task
     */
    public function store(Request $request): Task
    {
        $data = $request->validate([
            'megnevezes' => 'required|string',
            'prioritas' => 'in:alacsony,normal,magas',
            'utemezett_nap' => 'required|date',
            'hossz' => 'integer|min:0',
            'kesz' => 'boolean',
            'megbizottak' => 'array|max:4',
            'megbizottak.*' => 'string',
        ]);
        
        Task::validateWeekdayOrAbort($data['utemezett_nap']);
        Task::validateMaxHoursOrAbort($data['utemezett_nap'], $data['megbizottak'], $data['hossz']);

        return Task::create($data);
    }

    /**
     * PUT	/api/tasks/{task}
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Task $task
     * @return Task
     */
    public function update(Request $request, Task $task): Task
    {
        $data = $request->validate([
            'megnevezes' => 'string',
            'prioritas' => 'in:alacsony,normal,magas',
            'utemezett_nap' => 'date',
            'hossz' => 'integer|min:0',
            'kesz' => 'boolean',
            'megbizottak' => 'array|max:4',
            'megbizottak.*' => 'string',
        ]);

        if (isset($data['utemezett_nap'])) {
            Task::validateWeekdayOrAbort($data['utemezett_nap']);
        }
        if (isset($data['utemezett_nap'], $data['megbizottak'], $data['hossz'])) {
            Task::validateMaxHoursOrAbort($data['utemezett_nap'], $data['megbizottak'], $data['hossz']);
        }

        $task->update($data);
        return $task;
    }

    /**
     * DELETE	/api/tasks/{task}
     * @param \App\Models\Task $task
     * @return mixed|Response
     */
    public function destroy(Task $task): Response
    {
        $task->delete();
        return response()->noContent();
    }

    /**
     * POST	/api/tasks/{task}/duplicate
     * @param \App\Models\Task $task
     * @return JsonResponse|mixed
     */
    public function duplicate(Task $task): JsonResponse
    {
        $new = $task->replicate();
        $new->utemezett_nap = Carbon::parse($task->utemezett_nap)->addDay();
        $new->save();

        return response()->json($new, 201);
    }

    /**
     * POST	/api/tasks/{task}/reschedule
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Task $task
     * @return Task
     */
    public function reschedule(Request $request, Task $task): Task
    {
        $data = $request->validate([
            'new_date' => 'required|date',
        ]);

        $task->utemezett_nap = Carbon::parse($data['new_date']);
        $task->save();

        return $task;
    }
}
