export interface Tasks {
    id: number;
    name: string;
    priority: string;
}

export const initialState: Tasks[] = JSON.parse(localStorage.getItem('tasks') || '[]');

export enum ActionTypes {
    addTask,
    deleteTask,
    updateTask,
}
export interface AddTaskAction {
    type: ActionTypes.addTask;
    payload: Tasks;
}

export interface DeleteTaskAction {
    type: ActionTypes.deleteTask;
    payload: number;
}

export interface UpdateTaskAction {
    type: ActionTypes.updateTask;
    payload: Tasks;
}

export type Actions = AddTaskAction | DeleteTaskAction | UpdateTaskAction;

export const reducer = (state: Tasks[], action: Actions) => {
    switch (action.type) {
        case ActionTypes.addTask:
            return [...state, action.payload];

        case ActionTypes.deleteTask:
            return state.filter((s) => s.id !== action.payload);

        case ActionTypes.updateTask:
            const foundCompanyIdx = state.findIndex((s) => s.id === action.payload.id);
            const newState = [...state];
            newState[foundCompanyIdx] = action.payload;
            return newState;

        default:
            return state;
    }
};