import {TodoItem} from "../todo-item";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import {StrictModeDroppable} from "../ui/strict-mode-droppable";
import './todo-list.css'

export const TodoList = ({todoItems, setTodoItems, completedOnly, uncompletedOnly, handleEdit}) => {
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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newTodoItems = [...todoItems];
        const [removed] = newTodoItems.splice(result.source.index, 1);
        newTodoItems.splice(result.destination.index, 0, removed);
        setTodoItems(newTodoItems)
    };

    const generateTodoItem = (item, index) =>
        <Draggable key={index} draggableId={`item-${index}`} index={index}>
            {(provided) => (
                <TodoItem item={item} index={index}
                          handleChange={() => handleChange(index)}
                          handleDelete={() => deleteItem(index)}
                          handleEdit={() => handleEdit(index)}
                          provided={provided}
                />)}
        </Draggable>

    const generateEmptyList = () => <div className={'empty-list'}><p>there are no tasks yet</p></div>

    return <>
        {todoItems.length < 1 && generateEmptyList()}
    <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="todoItems">
            {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className='list-container'>
                    {!completedOnly && !uncompletedOnly && todoItems.map((item, index) => generateTodoItem(item, index))}
                    {completedOnly && todoItems.map((item, index) => item.completed && generateTodoItem(item, index))}
                    {uncompletedOnly && todoItems.map((item, index) => !item.completed && generateTodoItem(item, index))}
                    {provided.placeholder}
                </ul>
            )}
        </StrictModeDroppable>
    </DragDropContext>
    </>
}
