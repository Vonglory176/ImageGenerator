import Form from 'react-bootstrap/Form'
import TooltipDisplay from './TooltipDisplay'

export default function TextInput({field, fieldName, fieldValue, settingsCallback, tooltipInfo}) {
    return (
        
        <Form.Group className={`${fieldName}Input-div textInput-div`}>
            <Form.Label htmlFor={`${fieldName}Input-textarea`}>
                {field}
                {tooltipInfo && <TooltipDisplay tooltipInfo={tooltipInfo}/>}
            </Form.Label>

            <Form.Control 
                as="textarea" 
                id={`${fieldName}Input-textarea`} 
                onChange={e => {settingsCallback({[fieldName]:e.target.value})}}
                placeholder={`${field} goes here.. ${field === "Prompt" ? "" : "(Optional)"}`}
                value={fieldValue}
            />
        </Form.Group>
    )
}

{/* 
    <div className={`${fieldName}Input-div textInput-div`}>
        <label htmlFor={`${fieldName}Input`}>{field}:</label>
        <textarea 
        name={`${fieldName}Input`} 
        onChange={e => {
            settingsCallback({[fieldName]:e.target.value})
            }
        }
        placeholder={`${field} goes here`}
        value={fieldValue}
        >                
        </textarea>
    </div> 
*/}