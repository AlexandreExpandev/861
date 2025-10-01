import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';
import { CreateTaskForm } from '@/domain/task';
import { TaskList } from './_impl/TaskList';

/**
 * @page DashboardPage
 * @summary The main dashboard page shown after a user logs in.
 * @domain functional
 * @type dashboard-page
 * @category task-management
 */
export const DashboardPage = () => {
  const { user } = useAuth();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <>
      <Helmet>
        <title>Dashboard - TO DO List</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Here are your tasks for today.</p>
          </div>
          {!isCreatingTask && <Button onClick={() => setIsCreatingTask(true)}>+ New Task</Button>}
        </div>

        {isCreatingTask && (
          <CreateTaskForm
            onSuccess={() => setIsCreatingTask(false)}
            onCancel={() => setIsCreatingTask(false)}
          />
        )}

        <div className="mt-6">
          <TaskList />
        </div>
      </div>
    </>
  );
};
