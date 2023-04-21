import {TodoItem} from "../todo-item";
import {useId} from "react";

export const TodoList = ({todoItems, setTodoItems}) => {
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

    return <ul>
        {/*key here isn't the best solution, ideally I'd use something like uuid*/}
        {todoItems.map((item, index) => (
            <TodoItem key={`${id}-${index}`} item={item} index={index}
                      handleChange={() => handleChange(index)}
                      handleDelete={() => deleteItem(index)} />
        ))}
    </ul>
}
