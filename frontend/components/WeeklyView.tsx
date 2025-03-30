import { Task } from '../types/Task';

interface WeeklyViewProps {
  tasks: Task[];
}

const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const start = new Date(date);
  start.setDate(date.getDate() + diff);
  return start;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function WeeklyView({ tasks }: WeeklyViewProps): JSX.Element {
  const start = getStartOfWeek(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
      {[...Array(7)].map((_, i) => {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        const dateStr = formatDate(day);
        const dailyTasks = tasks.filter(t => t.utemezett_nap === dateStr);

        return (
          <div key={i} className="bg-white border rounded p-2 shadow-sm">
            <h4 className="text-center font-semibold mb-1">
              {daysOfWeek[i]}<br />
              <span className="text-xs text-gray-500">{dateStr}</span>
            </h4>
            {dailyTasks.length > 0 ? (
              dailyTasks.map(task => (
                <div key={task.id} className="text-sm border-b py-1">
                  {task.megnevezes} ({task.hossz}p)
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center">Nincs feladat</p>
            )}
          </div>
        );
      })}
    </div>
  );
}