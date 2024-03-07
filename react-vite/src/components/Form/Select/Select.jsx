import { useState } from "react"
import './Select.css'

export const inputSelections = (value, onChange, options) => ({
    value,
    onChange,
    options
})

const FormSelect = ({buttonText, input, handleErrors}) => {
    const {value, onChange, options} = input
    const {isSubmitted, error} = handleErrors ? handleErrors : {}
    const [optionSelected, setOptionSelected] = useState(false)

    const handleSelectChange = (e) => {
        onChange(e.target.value);
        setOptionSelected(true);
    }
    return (
        <div className="form-select">
            {isSubmitted && error && <p className="p-error">{Error}</p>}

            <select value={value} onChange={handleSelectChange}>
                {optionSelected ? null : <option value={""}>{buttonText}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option[0].toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormSelect;