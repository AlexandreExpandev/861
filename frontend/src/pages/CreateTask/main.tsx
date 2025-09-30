import { CreateTaskForm } from './_impl/CreateTaskForm';

/**
 * @page CreateTaskPage
 * @summary Page for creating a new task.
 * @domain task
 * @type form-page
 * @category management
 */
export const CreateTaskPage = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Create a New Task</h1>
        <p className="text-gray-600">Fill out the form below to add a new task to your list.</p>
      </header>
      <main>
        <CreateTaskForm />
      </main>
    </div>
  );
};
