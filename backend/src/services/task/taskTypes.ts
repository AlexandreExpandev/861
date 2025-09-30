/**
 * @summary Task entity interface
 */
export interface TaskEntity {
  idTask: number;
  idUser: number;
  title: string;
  description: string;
  status: string;
  dateCreated: Date;
  dateModified?: Date;
  deleted: boolean;
}

/**
 * @summary Parameters for creating a task
 */
export interface TaskCreateParams {
  idUser: number;
  title: string;
  description?: string;
}

/**
 * @summary Parameters for updating a task
 */
export interface TaskUpdateParams {
  idUser: number;
  idTask: number;
  title: string;
  description?: string;
  status?: string;
}

/**
 * @summary Task status enum
 */
export enum TaskStatus {
  Pendente = 'Pendente',
  EmAndamento = 'Em Andamento',
  Concluida = 'Concluída'
}
