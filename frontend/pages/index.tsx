import Head from 'next/head';
import TaskForm from '../components/TaskForm';
import TaskBoard from '../components/TaskBoard';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Head>
        <title>Task Manager</title>
      </Head>
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center">Task Manager</h1>
        <TaskForm onSuccess={() => setRefresh(!refresh)} />
        <TaskBoard key={refresh.toString()} />
      </main>
    </>
  );
}
