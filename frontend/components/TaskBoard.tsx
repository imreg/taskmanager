import { useEffect, useState } from 'react';
import API from '../utils/api';
import { Task } from '../types/Task';

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id: number) => {
    if (confirm('Biztosan törlöd?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const duplicateTask = async (id: number) => {
    await API.post(`/tasks/${id}/duplicate`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks.map(task => (
        <div key={task.id} className="border p-4 rounded bg-white shadow">
          <h3 className="text-lg font-bold">{task.megnevezes}</h3>
          <p className="text-sm text-gray-500">{task.utemezett_nap}</p>
          <p>{task.megbizottak.join(', ')}</p>
          <p>{task.hossz} perc • {task.prioritas}</p>
          <p>{task.kesz ? '✅ Kész' : '❌ Nincs kész'}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => duplicateTask(task.id)} className="bg-yellow-400 px-2 py-1 rounded">Duplikálás</button>
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">Törlés</button>
          </div>
        </div>
      ))}
    </div>
  );
}

