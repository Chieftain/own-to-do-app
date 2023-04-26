import './inputs.css'

export const Input = ({ innerRef, ...props }) => {
    return <input className={'input'} ref={innerRef} {...props}/>
}
