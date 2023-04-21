export const TodoItem = ({item, handleChange, handleDelete, handleEdit}) => {
    return <li>
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
