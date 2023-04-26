import {useEffect, useRef, useState} from "react";
import {TodoList} from "../todo-list";
import {Button} from "../ui/buttons";
import {Input} from "../ui/inputs";
import './todo-form.css'

export const TodoForm = () => {
    const todoInputName = 'task';
    const localStorageName = 'todoItems';
    const filterRadiobuttonName = 'filter';
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

    const handleFilter = (e) => {
        switch (e.target.value) {
                case 'completed': setCompletedOnly(true);
                    setUncompletedOnly(false);
                break;
                case 'uncompleted': setUncompletedOnly(true);
                    setCompletedOnly(false);
                break;
            default: setUncompletedOnly(false);
                setCompletedOnly(false);
                break;
        }
    }

    return <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
            <Input type="text" placeholder="Enter task" name={todoInputName} innerRef={todoInput}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}/>
            <Button>+</Button>
        </form>
        <div onChange={handleFilter} className='radiobuttons'>
            <Input type="radio" value={'all'} name={filterRadiobuttonName} id='all'/>
            <label htmlFor="all">all</label>
            <Input type="radio" value={'completed'} name={filterRadiobuttonName} id='completed'/>
            <label htmlFor="completed">completed</label>
            <Input type="radio" value={'uncompleted'} name={filterRadiobuttonName} id='uncompleted'/>
            <label htmlFor="uncompleted">uncompleted</label>
        </div>
        <TodoList todoItems={todoItems}
                  setTodoItems={setTodoItems}
                  completedOnly={completedOnly}
                  uncompletedOnly={uncompletedOnly}
                  handleEdit={handleEdit}
        />
    </div>
}
