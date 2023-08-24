import Form from 'react-bootstrap/Form';
import TooltipDisplay from './TooltipDisplay';

export default function SwitchInput({field, fieldName, fieldCheck, settingsCallback, tooltipInfo}) {

    return (
        <div className={`${fieldName}Input-div switchInput-div`}>
            <label htmlFor={`${fieldName}Input-switch`}>
                {field}
                {tooltipInfo && <TooltipDisplay tooltipInfo={tooltipInfo}/>}
            </label>

            <Form.Check // prettier-ignore
                type="switch"
                name={`${fieldName}Input`}
                id={`${fieldName}Input-switch`}
                onChange={e => {
                    settingsCallback({[fieldName]:e.target.checked})
                    }
                }
                checked={fieldCheck}
            />
        </div>
    )
}