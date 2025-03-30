import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { Task } from '../types/Task';

describe('TaskForm initial state', () => {
  it('should initialize form with default values', () => {
    const { result } = renderHook(() =>
      useState<Partial<Task>>({
        megnevezes: '',
        prioritas: 'normal',
        hossz: 0,
        kesz: false,
        megbizottak: [],
        utemezett_nap: new Date().toISOString().split('T')[0],
      })
    );

    const [form] = result.current;

    expect(form.megnevezes).toBe('');
    expect(form.prioritas).toBe('normal');
    expect(form.hossz).toBe(0);
    expect(form.kesz).toBe(false);
    expect(form.megbizottak).toEqual([]);
    expect(typeof form.utemezett_nap).toBe('string');
  });
});
