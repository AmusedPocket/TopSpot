import './Button.css'

const Button = ({text, onClick, color = "red"}) => {
    return (
        <button className={`default-button ${color}`} type="submit" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;