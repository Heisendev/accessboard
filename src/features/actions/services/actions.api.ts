import type {
    Action,
    CreateActionInput,
    UpdateActionInput,
    ApiError,
} from '../types';

export interface ActionsApi {
    getActions(): Promise<Action[]>;
    createAction(input: CreateActionInput): Promise<Action>;
    updateAction(id: string, input: UpdateActionInput): Promise<Action>;
    deleteAction(id: string): Promise<void>;
}

const generateId = () => crypto.randomUUID();

const now = () => new Date().toISOString();

let actionsDb: Action[] = [
  {
    id: generateId(),
    title: 'Préparer le projet',
    status: 'todo',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: generateId(),
    title: 'Préparer le projet 2',
    status: 'in-progress',
    createdAt: now(),
    updatedAt: now(),
  },
];

const simulateDelay = (min = 300, max = 300) =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min));

const shouldFail = (failureRate = 0.1) => Math.random() < failureRate;

const getActions = async (): Promise<Action[]> => {
    await simulateDelay();
    if (shouldFail()) {
        throw { message: 'unable to fetch actions', code: 'NETWORK_ERROR' } as ApiError;
    }
    return [...actionsDb]
};

const createAction = async (
    input: CreateActionInput
): Promise<Action> => {
    await simulateDelay();
    if (!input.title.trim()) {
        throw { message: 'title is required', code: 'VALIDATION_ERROR' } as ApiError;
    }

    const newAction: Action = {
        id: generateId(),
        title: input.title,
        status: 'todo',
        createdAt: now(),
        updatedAt: now(),
    };
    actionsDb = [newAction, ...actionsDb];
    return newAction;
}

const updateAction = async (
    id: string,
    input: UpdateActionInput
): Promise<Action> => {
    await simulateDelay();
    if (shouldFail()) {
        throw { message: 'impossible de modifier l\'action', code: 'VALIDATION_ERROR' } as ApiError;
    }
    const actionIndex = actionsDb.findIndex((action) => action.id === id);
    if (actionIndex === -1) {
        throw { message: 'action not found', code: 'NOT_FOUND' } as ApiError;
    }
    
    const existingAction = actionsDb[actionIndex]!;
    const updatedAction: Action = {
        ...existingAction,
        ...input,
        updatedAt: now(),
    };
    actionsDb[actionIndex] = updatedAction; 
    return updatedAction;
}

const deleteAction = async (
    id: string
): Promise<void> => {
    await simulateDelay();
    const exist = actionsDb.some((action) => action.id === id);
    if (!exist) {
        throw { message: 'action not found', code: 'NOT_FOUND' } as ApiError;
    }
    actionsDb = actionsDb.filter((action) => action.id !== id);
}

export const actionsApi: ActionsApi = {
    getActions,
    createAction,
    deleteAction,
    updateAction,
}