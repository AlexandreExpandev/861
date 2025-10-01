import { useState } from 'react';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';
import { CreateTaskForm, TaskList } from '@/domain/task';

/**
 * @page DashboardPage
 * @summary The main dashboard page shown after a user logs in.
 * @domain functional
 * @type dashboard-page
 * @category management
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo, {user?.name}!</h1>
          <p className="text-lg text-gray-600">Gerencie suas tarefas aqui.</p>
        </div>
        <Button onClick={logout} variant="destructive">
          Sair
        </Button>
      </header>

      <section className="mb-8">
        {isCreatingTask ? (
          <CreateTaskForm
            onTaskCreated={() => setIsCreatingTask(false)}
            onCancel={() => setIsCreatingTask(false)}
          />
        ) : (
          <div className="text-right">
            <Button onClick={() => setIsCreatingTask(true)} variant="default">
              + Nova Tarefa
            </Button>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Suas Tarefas</h2>
        <TaskList />
      </section>
    </div>
  );
};
