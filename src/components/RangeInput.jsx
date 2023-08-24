import Form from 'react-bootstrap/Form';
import TooltipDisplay from './TooltipDisplay';

export default function RangeInput({field, fieldName, min, max, step, fieldValue, settingsCallback, disabled, tooltipInfo}) {
    // https://www.npmjs.com/package/react-bootstrap-range-slider/v/1.2.2

    return (
        <div className={`${fieldName}Input-div rangeInput-div`}>
            <label htmlFor={`${fieldName}Input-range`}>
                {field}
                {tooltipInfo && <TooltipDisplay tooltipInfo={tooltipInfo}/>}
            </label>

            <Form.Range 
                min = {min}
                max = {max}
                step = {step}
                value = {fieldValue}
                name={`${fieldName}Input`}
                id = {`${fieldName}Input-range`}
                disabled={disabled}
                onChange={e => {
                    settingsCallback({[fieldName]:e.target.value})
                    }
                }
            />
            <Form.Control 
                type="number"
                value={fieldValue} 
                min={min} 
                max={max} 
                disabled={disabled} 
                onChange={e => settingsCallback({[fieldName]:e.target.value})}
            />
            {/* <input 
                type='number' 
                value={fieldValue} 
                min={min} 
                max={max} 
                disabled={disabled} 
                onChange={e => settingsCallback({[fieldName]:e.target.value})}
            /> */}
        </div>
    )
}