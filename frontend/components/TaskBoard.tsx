import { useEffect, useState } from 'react';
import API from '../utils/api';
import { Task } from '../types/Task';
import TaskForm from './TaskForm';
import WeeklyView from './WeeklyView';

export default function TaskBoard(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async (): Promise<void> => {
    const res = await API.get<Task[]>('/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id: number): Promise<void> => {
    if (confirm('Biztosan törlöd?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const duplicateTask = async (id: number): Promise<void> => {
    await API.post(`/tasks/${id}/duplicate`);
    fetchTasks();
  };

  const toggleKesz = async (task: Task): Promise<void> => {
    await API.put(`/tasks/${task.id}`, { ...task, kesz: !task.kesz });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {editingTask && (
        <div className="mb-6">
          <TaskForm task={editingTask} onSuccess={() => { setEditingTask(null); fetchTasks(); }} />
        </div>
      )}

      <WeeklyView tasks={tasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {tasks.map(task => (
          <div key={task.id} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-bold">{task.megnevezes}</h3>
            <p className="text-sm text-gray-500">{task.utemezett_nap}</p>
            <p>{task.megbizottak.join(', ')}</p>
            <p>{task.hossz} perc • {task.prioritas}</p>
            <p>
              <button onClick={() => toggleKesz(task)}>
                {task.kesz ? '✅ Kész' : '❌ Nincs kész'}
              </button>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => duplicateTask(task.id)} className="bg-yellow-400 px-2 py-1 rounded">Duplikálás</button>
              <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">Törlés</button>
              <button onClick={() => setEditingTask(task)} className="bg-green-500 text-white px-2 py-1 rounded">Szerkesztés</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
