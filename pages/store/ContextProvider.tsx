import { Context } from './context';
import { useReducer, useEffect } from 'react';
import { initialState, reducer } from './reducer';

const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('tasks', JSON.stringify(state));
        }, 0);

        return () => clearTimeout(timer);
    }, [state]);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;