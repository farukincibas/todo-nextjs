import React, { useContext, useState } from 'react';
import { Tasks, ActionTypes } from '../../store/reducer';
import { Context } from '../../store/context';
import styles from '../../../styles/Table.module.css';

interface TableProps {
    task: Tasks;
}

const Table = () => {
    const { state, dispatch } = useContext(Context);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();

        dispatch({ type: ActionTypes.deleteTask, payload: id });
    };


    const TableChange = ({ task }: TableProps) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: ActionTypes.updateTask, payload: { ...task, [e.target.name]: e.target.value } });
        };
    }


    const FilterableProductTable = ({ products }: any) => {
        const [filterText, setFilterText] = useState('');
        return (
            <div>
                <SearchBar
                    filterText={filterText}
                    setFilterText={setFilterText}
                />
                <ProductTable
                    products={products}
                    filterText={filterText}
                />
            </div>
        );
    }


    const SearchBar = ({ filterText, setFilterText }: any) => (
        <form>
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
                console.log("It is a urgent.");
                colorPriority = "red";
                break;
            case 'Regular':
                console.log("It is a regular.");
                colorPriority = "rgb(229 229 20)";
                break;
            case 'Trivial':
                console.log("It is a trivial.");
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
            </tr>
        );
    }


    const ProductTable = ({ products, filterText }: any) => {
        const rows: any = [];

        products.forEach((product: any) => {
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
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
                        <th>Name</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }



    return (
        <>
            <FilterableProductTable products={state}></FilterableProductTable>
        </>
    );
};

export default Table;