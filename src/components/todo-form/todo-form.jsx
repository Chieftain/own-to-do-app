import {useState} from "react";
import {TodoList} from "../todo-list";

export const TodoForm = () => {
    const todoInputName = 'task';
    const [todoItems, setTodoItems] = useState([]);

   const handleSubmit = (event) => {
        event.preventDefault();

        const task = event.target.elements[todoInputName].value;

        if (task) {
            setTodoItems((prevState) => [...prevState, {task: task, completed: false}]);

            event.target.elements[todoInputName].value = '';
        }
    }

    return <>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter task" name={todoInputName} />
        <button>Add</button>
    </form>
        <TodoList todoItems={todoItems} setTodoItems={setTodoItems} />
    </>
}
