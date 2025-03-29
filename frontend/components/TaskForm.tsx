import { useState } from 'react';
import API from '../utils/api';
import { Task } from '../types/Task';

interface Props {
  onSuccess: () => void;
}

export default function TaskForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Partial<Task>>({
    megnevezes: '',
    prioritas: 'normal',
    hossz: 0,
    kesz: false,
    megbizottak: [],
    utemezett_nap: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      megbizottak: form.megbizottak?.toString().split(',').map(s => s.trim()),
    };
    try {
      await API.post('/tasks', payload);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded shadow">
      <input name="megnevezes" placeholder="Megnevezés" className="w-full border p-2" onChange={handleChange} />
      <input name="megbizottak" placeholder="Megbízottak (vesszővel)" className="w-full border p-2" onChange={handleChange} />
      <input name="hossz" type="number" min="0" className="w-full border p-2" value={form.hossz} onChange={handleChange} />
      <input name="utemezett_nap" type="date" className="w-full border p-2" value={form.utemezett_nap} onChange={handleChange} />
      <select name="prioritas" className="w-full border p-2" onChange={handleChange}>
        <option value="alacsony">Alacsony</option>
        <option value="normal">Normál</option>
        <option value="magas">Magas</option>
      </select>
      <label className="block">
        <input name="kesz" type="checkbox" className="mr-2" onChange={handleChange} /> Kész?
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Mentés</button>
    </form>
  );
}
