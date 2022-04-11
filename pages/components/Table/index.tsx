import React, { useContext, useState } from 'react';
import { Tasks, ActionTypes } from '../../store/reducer';
import { Context } from '../../store/context';
import styles from '../../../styles/Table.module.css';
import addTaskStyles from '../../../styles/AddTask.module.css';
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';
import CustomPopup from "../Popup";


const Table = () => {
    const { state, dispatch } = useContext(Context);
    const [visibility, setVisibility] = useState(false);
    const [visibilityDelete, setVisibilityDelete] = useState(false);
    const [visibilityUpdate, setVisibilityUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('all');
    const [importance, setImportance] = useState(0);


    const popupCloseHandler = () => {
        setVisibility(false);
        setVisibilityDelete(false);
        setVisibilityUpdate(false);
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        dispatch({ type: ActionTypes.deleteTask, payload: id });
        popupCloseHandler();
    };



    const handleChange = ({ id, name, priority, importance }: Tasks) => {

        const updateTask = {
            id: id,
            name: name,
            priority: priority,
            importance: importance,
        };

        if (name.length > 0 && priority!=="all") {
            dispatch({ type: ActionTypes.updateTask, payload: { ...updateTask } });
            popupCloseHandler();
        }
        else { alert("if you want to update it! Please provide name and urgent info..."); }

    };



    const FilterableProductTable = ({ products }: any) => {
        const [filterText, setFilterText] = useState('');
        const [priorityFilter, setPriorityFilter] = useState('all');
        return (
            <div>
                <div className={styles.colorBisque} >
                    <div className={styles.flexRow}>
                        <SearchBar
                            filterText={filterText}
                            setFilterText={setFilterText}
                        />
                        <FilterSelectBox setPriorityFilter={setPriorityFilter} />
                    </div>

                </div>
                <ProductTable
                    products={products}
                    filterText={filterText}
                    priorityFilter={priorityFilter}
                />
            </div>
        );
    }

    const FilterSelectBox = ({ setPriorityFilter }: any) => (
        <div className={addTaskStyles.flexColumOne}>
            <select onChange={(e) => setPriorityFilter(e.target.value)} className={addTaskStyles.selectPriority} id="standard-select">
                <option selected value="all">Priority(all)</option>
                <option value="Urgent">Urgent</option>
                <option value="Regular">Regular</option>
                <option value="Trivial">Trivial</option>
            </select>
        </div>
    )


    const SearchBar = ({ filterText, setFilterText }: any) => (
        <form className={addTaskStyles.flexColumTwo}>
            <input
                className={styles.taskInput}
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
        </form>
    );



    const ProductRow = ({ product }: any) => {
        let colorPriority: any = 'white';

        switch (product.priority) {
            case 'Urgent':
                colorPriority = "red";
                break;
            case 'Regular':
                colorPriority = "rgb(229 229 20)";
                break;
            case 'Trivial':
                colorPriority = "blue";
                break;
            default:
                console.log("No such priority exists!");
                break;
        }

        const priorityStyle = {
            color: colorPriority,
        };

        return (
            <tr>
                <td>{product.name}</td>
                <td><span style={priorityStyle}>{product.priority}</span></td>
                <td>
                    <button onClick={() => { setVisibility(true), setId(product.id); setVisibilityUpdate(true); setPriority('all'); }}>
                        <RiEdit2Fill />
                    </button>
                    {" "}
                    <button onClick={() => { setVisibility(true), setId(product.id); setVisibilityDelete(true); }}>
                        <RiDeleteBin5Fill />
                    </button>
                </td>
            </tr>
        );
    }


    const sortByUrgent = (products: any) => {
        const sortedMinToMax = [...products].sort((a, b) => a.importance - b.importance);
        return sortedMinToMax;
    }

    const handlePriorityValue = (priorityVal: React.SetStateAction<string>) => {
        setPriority(priorityVal);
        let importance: number = 0;
        switch (priorityVal) {
            case 'Urgent':
                importance = 1;
                break;
            case 'Regular':
                importance = 2;
                break;
            case 'Trivial':
                importance = 3;
                break;
            default:
                console.log("No such priority exists!");
                break;
        }
        setImportance(importance);
    }

    const ProductTable = ({ products, filterText, priorityFilter }: any) => {
        const rows: any = [];
        let taskList = sortByUrgent(products);

        taskList.forEach((product: any) => {
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (product.priority.toLowerCase().indexOf(priorityFilter.toLowerCase()) === -1 && priorityFilter !== 'all') {
                return;
            }

            rows.push(
                <ProductRow
                    product={product}
                    key={product.id} />
            );
        });



        return (
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th className={styles.width60}>Name</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }



    return (
        <>
            <h4>Job List</h4>
            <FilterableProductTable products={state}></FilterableProductTable>
            <CustomPopup
                onClose={popupCloseHandler}
                show={visibility}
            >
                {visibilityDelete && (
                    <>
                        <h1>Are you sure want to delete it!</h1>
                        <div className={styles.flexRowPopup}>
                            <button onClick={popupCloseHandler}>Cancel</button>
                            <button onClick={(e) => handleDelete(e, id)}>Approve</button>
                        </div>
                    </>
                )}

                {visibilityUpdate && (
                    <>
                        <h1>Job Edit</h1>
                        <div className={styles.flexColumnPopup}>
                            <label>Job Name</label>
                            <input
                                className={styles.paddingElements}
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label>Job Priority</label>
                            <select onChange={(e) => handlePriorityValue(e.target.value)} className={styles.paddingElements} id="standard-select">
                                <option disabled selected value="all">Choose</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Regular">Regular</option>
                                <option value="Trivial">Trivial</option>
                            </select>
                            <div className={styles.flexRowPopup}>
                                <button onClick={popupCloseHandler}>Cancel</button>
                                <button onClick={(e) => handleChange({ id, name, priority, importance })}>Save</button>
                            </div>
                        </div>

                    </>
                )}

            </CustomPopup>
        </>
    );
};

export default Table;