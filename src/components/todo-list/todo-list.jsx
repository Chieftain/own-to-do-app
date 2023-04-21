import {TodoItem} from "../todo-item";
import {useId} from "react";

export const TodoList = ({todoItems, setTodoItems, completedOnly, uncompletedOnly}) => {
    const id = useId();

    const handleChange = (index) => {
        const newTodoItems = [...todoItems];
        newTodoItems[index].completed = !newTodoItems[index].completed;
        setTodoItems(newTodoItems);
    }

    const deleteItem = (index) => {
        const newTodoItems = [...todoItems];
        newTodoItems.splice(index, 1);
        setTodoItems(newTodoItems);
    }

    const generateTodoItem = (item, index) => <TodoItem key={`${id}-${index}`} item={item} index={index}
                                             handleChange={() => handleChange(index)}
                                             handleDelete={() => deleteItem(index)}
    />

    return <ul>
        {/*key here isn't the best solution, ideally I'd use something like uuid*/}
        {!completedOnly && !uncompletedOnly && todoItems.map((item, index) => generateTodoItem(item, index))}
        {completedOnly && todoItems.map((item, index) => item.completed && generateTodoItem(item, index))}
        {uncompletedOnly && todoItems.map((item, index) => !item.completed && generateTodoItem(item, index))}
    </ul>
}
