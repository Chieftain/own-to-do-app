import {useEffect, useRef, useState} from "react";
import {TodoList} from "../todo-list";

export const TodoForm = () => {
    const todoInputName = 'task';
    const localStorageName = 'todoItems';
    const [todoItems, setTodoItems] = useState(extractListFromLocalStorage);
    const [completedOnly, setCompletedOnly] = useState(false);
    const [uncompletedOnly, setUncompletedOnly] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [index, setIndex] = useState();
    const todoInput = useRef();

    useEffect(() => {
        localStorage.setItem(localStorageName, JSON.stringify(todoItems));
    }, [todoItems]);

    function extractListFromLocalStorage () {
        const saved = localStorage.getItem(localStorageName);
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const task = event.target.elements[todoInputName].value;

        if (isEdited) {
            const newTodoItems = todoItems.map((item, i) => {
                if (i === Number(index)) {
                    item.task = task
                }
                return item;
            });
            setTodoItems(newTodoItems);
            setInputValue('');
            setIsEdited(false)
        }

        if (task && !isEdited) {
            setTodoItems((prevState) => [...prevState, {task: task, completed: false}]);

            setInputValue('');
        }
    }

    const handleEdit = (index) => {
        setIsEdited(true);
        setIndex(index);
        setInputValue(todoItems[index].task);
        todoInput.current.focus()
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
            <input type="text" placeholder="Enter task" name={todoInputName} ref={todoInput}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}/>
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
                  uncompletedOnly={uncompletedOnly}
                  handleEdit={handleEdit}/>
    </>
}
