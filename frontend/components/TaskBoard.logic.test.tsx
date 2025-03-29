import { Task } from '../types/Task';

describe('Task toggle logic', () => {
  it('should toggle the "kesz" field from false to true', () => {
    const task: Task = {
      id: 1,
      megnevezes: 'Teszt',
      prioritas: 'normal',
      hossz: 60,
      kesz: false,
      megbizottak: ['Anna'],
      utemezett_nap: '2025-03-29',
    };

    const toggled = { ...task, kesz: !task.kesz };
    expect(toggled.kesz).toBe(true);
  });

  it('should keep other fields unchanged when toggling "kesz"', () => {
    const task: Task = {
      id: 2,
      megnevezes: 'Dokumentálás',
      prioritas: 'magas',
      hossz: 120,
      kesz: true,
      megbizottak: ['Béla'],
      utemezett_nap: '2025-03-30',
    };

    const toggled = { ...task, kesz: !task.kesz };
    expect(toggled.kesz).toBe(false);
    expect(toggled.id).toBe(task.id);
    expect(toggled.megnevezes).toBe(task.megnevezes);
    expect(toggled.megbizottak).toEqual(task.megbizottak);
  });
});
