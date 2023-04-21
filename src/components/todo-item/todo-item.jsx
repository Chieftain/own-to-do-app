export const TodoItem = ({item, handleChange, handleDelete, handleEdit, provided}) => {
    return <li  {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
        <input
            type="checkbox"
            checked={item.completed}
            onChange={handleChange}
        />
        {item.task}
        <button onClick={handleEdit}> edit </button>
        <button onClick={handleDelete}> delete </button>
    </li>
}
