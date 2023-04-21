export const TodoItem = ({item, handleChange, handleDelete}) => {
    return <li>
        <input
            type="checkbox"
            checked={item.completed}
            onChange={handleChange}
        />
        {item.task}
    <button onClick={handleDelete}> delete </button>
    </li>
}
