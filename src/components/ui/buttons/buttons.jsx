import './buttons.css'

export const Button = (props) => {
    return <button className={'button'} {...props}>{props.children}</button>
}
