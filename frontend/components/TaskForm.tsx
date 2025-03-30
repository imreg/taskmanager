import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import API from '../utils/api';
import { Task } from '../types/Task';

interface Props {
  task?: Task;
  onSuccess: () => void;
}

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function TaskForm({ task, onSuccess }: Props): JSX.Element {
  const [form, setForm] = useState<Partial<Task>>({
    megnevezes: '',
    prioritas: 'normal',
    hossz: 0,
    kesz: false,
    megbizottak: [],
    utemezett_nap: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  const handleChange = (e: InputChangeEvent): void => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const payload = {
      ...form,
      megbizottak: form.megbizottak?.toString().split(',').map(s => s.trim()),
    };
    try {
      if (task) {
        await API.put(`/tasks/${task.id}`, payload);
      } else {
        await API.post('/tasks', payload);
      }
      onSuccess();
      setForm({
        megnevezes: '', prioritas: 'normal', hossz: 0,
        kesz: false, megbizottak: [],
        utemezett_nap: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded shadow">
      <input name="megnevezes" placeholder="Megnevezés" className="w-full border p-2" value={form.megnevezes} onChange={handleChange} />
      <input name="megbizottak" placeholder="Megbízottak (vesszővel)" className="w-full border p-2" value={form.megbizottak?.join(', ') ?? ''} onChange={handleChange} />
      <input name="hossz" type="number" min="0" className="w-full border p-2" value={form.hossz ?? 0} onChange={handleChange} />
      <input name="utemezett_nap" type="date" className="w-full border p-2" value={form.utemezett_nap} onChange={handleChange} />
      <select name="prioritas" className="w-full border p-2" value={form.prioritas} onChange={handleChange}>
        <option value="alacsony">Alacsony</option>
        <option value="normal">Normál</option>
        <option value="magas">Magas</option>
      </select>
      <label className="block">
        <input name="kesz" type="checkbox" className="mr-2" checked={form.kesz} onChange={handleChange} /> Kész?
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{task ? 'Frissítés' : 'Mentés'}</button>
    </form>
  );
}