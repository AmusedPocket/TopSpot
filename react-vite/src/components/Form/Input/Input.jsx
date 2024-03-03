
export const toInput = (label, value, onChange, type="text") => ({
    label,
    value,
    onChange,
    type
})

export const errorHandler = (isSubmitted, error) => ({
    isSubmitted,
    error
})

const FormInput = ({input, errorHandler}) => {
    const {label, value, onChange, type} = input;

    const {isSubmitted, error} = errorHandler ? errorHandler : {}

    return (
        <div className="form-input">
            {isSubmitted && error && <p className="p-error">{Error}</p> }
            <input 
                type={type}
                name={label}
                value={value}
                onChange={(e)=> onChange(e.target.value)}
                placeHolder={label}
                />
        </div>
    )
}

export default FormInput;