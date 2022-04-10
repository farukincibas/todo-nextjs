import { createContext } from 'react';
import { Tasks, Actions, initialState } from './reducer';


export type ContextState = {
    state: Tasks[];
    dispatch: React.Dispatch<Actions>;
};



const contextDefaultValues: ContextState = {
    state: initialState,
    dispatch: () => undefined,
};

export const Context = createContext<ContextState>(contextDefaultValues);