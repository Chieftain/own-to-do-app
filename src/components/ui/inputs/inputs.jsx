import './inputs.css'

export const Input = (props) => {
    return <input className={'input'} ref={props?.innerRef} {...props}/>
}
