export type ActionStatus = 'todo' | 'in-progress' | 'blocked' | 'done';

export interface Action {
  id: string;
  title: string;
  status: ActionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActionInput {
  title: string;
}

export interface UpdateActionInput {
  title?: string;
  status?: ActionStatus;
}

export interface ApiError {
  message: string;
  code: 'NETWORK_ERROR' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'UNKNOWN';
}

export const ACTION_STATUS_LABELS: Record<ActionStatus, string> = {
  todo: 'À faire',
  'in-progress': 'En cours',
  blocked: 'Bloqué',
  done: 'Terminé',
}
