import {Button} from "../ui/buttons";
import './todo-item.css'

export const TodoItem = ({item, handleChange, handleDelete, handleEdit, provided}) => {
    return <li  {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
    className='list-item'>
        <input
            type="checkbox"
            checked={item.completed}
            onChange={handleChange}
        />
        {item.task}
        <div className='action-buttons'>
            <Button onClick={handleEdit}> edit </Button>
            <Button onClick={handleDelete}> delete </Button>
        </div>
    </li>
}
