import React, { useContext } from 'react';
import { Tasks, ActionTypes } from '../../store/reducer';
import { Context } from '../../store/context';

interface TableProps {
    task: Tasks;
}

const Table = ({ task }: TableProps) => {
    const { state, dispatch } = useContext(Context);

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name: 'New',
            priority: 'urgent',

        };

        dispatch({ type: ActionTypes.addTask, payload: newTask });
    };


    /*
      const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
    
        dispatch({ type: ActionTypes.deleteCompany, payload: id });
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionTypes.updateCompany, payload: { ...company, [e.target.name]: e.target.value } });
      }; */



    return (
        <></>
    );
};

export default Table;