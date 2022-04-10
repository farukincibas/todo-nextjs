import type { NextPage } from 'next'
import styles from '../../../styles/AddTask.module.css';
import { FaPlusCircle } from "react-icons/fa"
import { Context } from '../../store/context';
import { useContext, useEffect, useState } from 'react';
import { ActionTypes } from '../../store/reducer';


const AddTask: NextPage = () => {
    const { state, dispatch } = useContext(Context);
    const [priority, setPriority] = useState("");
    const [name, setName] = useState("");

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name: name,
            priority: priority,
        };
        if (name.length > 0 && priority.length > 0) {
            dispatch({ type: ActionTypes.addTask, payload: newTask });
        }
        else { alert("Please provide name and urgent info you given empty"); }


    };

    const handleSelection = (value: string) => {
        setPriority(value);
    }

    const handleInputChange = (value: string) => {
        var regEx = /^[a-zA-Z0-9 ]*$/;
        if (!value.match(regEx)) {
            alert("Please enter letters and numbers only.");
            const clearLastValue = (value.substring(0, value.length - 1));
            setName(clearLastValue);
            return false;
        }
        setName(value);
    }


    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <div className={styles.flexRow}>

                <div className={styles.flexColumTwo}>
                    <label>Job Name</label>
                    <input value={name} maxLength={255} onChange={(e) => handleInputChange(e.target.value)} className={styles.inputAdd} type="text" id="jname" name="jname"></input>
                </div>

                <div className={styles.flexColumOne}>
                    <label>Job Priority</label>
                    <select onChange={(e) => handleSelection(e.target.value)} className={styles.selectPriority} id="standard-select">
                        <option disabled selected value="0">Choose</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Regular">Regular</option>
                        <option value="Trivial">Trivial</option>
                    </select>
                </div>

                <button onClick={handleAdd} className={styles.addButton}>
                    <FaPlusCircle /> Create
                </button>

            </div>
        </>
    )
}

export default AddTask
