import {useState} from "react";
import {TodoList} from "../todo-list";

export const TodoForm = () => {
    const todoInputName = 'task';
    const [todoItems, setTodoItems] = useState([]);
    const [completedOnly, setCompletedOnly] = useState(false);
    const [uncompletedOnly, setUncompletedOnly] = useState(false);

   const handleSubmit = (event) => {
        event.preventDefault();

        const task = event.target.elements[todoInputName].value;

        if (task) {
            setTodoItems((prevState) => [...prevState, {task: task, completed: false}]);

            event.target.elements[todoInputName].value = '';
        }
    }

    const showCompletedOnly = () => {
        setCompletedOnly(true);
        setUncompletedOnly(false);
    }

    const showUncompletedOnly = () => {
        setUncompletedOnly(true);
        setCompletedOnly(false);
    }

    const showAllTasks = () => {
        setUncompletedOnly(false);
        setCompletedOnly(false);
    }

    return <>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter task" name={todoInputName} />
        <button>Add</button>
    </form>
        <div>
            <button onClick={showCompletedOnly}>Show completed only</button>
            <button onClick={showUncompletedOnly}>Show uncompleted only</button>
            <button onClick={showAllTasks}>Show all tasks</button>
        </div>
        <TodoList todoItems={todoItems}
                  setTodoItems={setTodoItems}
                  completedOnly={completedOnly}
                  uncompletedOnly={uncompletedOnly}/>
    </>
}
