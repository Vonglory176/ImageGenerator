import {useState, useEffect} from 'react'
import getModels from '../fetch/getModels'
import Select from 'react-select';
import TooltipDisplay from './TooltipDisplay';

export default function SelectInput({field, fieldName, defaultOption, settingsCallback, tooltipInfo}) {
    const [data, setData] = useState()

    //https://www.geeksforgeeks.org/how-to-use-setinterval-method-inside-react-components/
    
    useEffect(() => {
        updateModelData()
        const interval = setInterval(updateModelData,15000) //Checking again ever 15 seconds

        async function updateModelData() {
    
            //Saving response
            let res = await getModels(), tempArray = []
            
            //Converting to selector option elements
            for (let i=0;i<res.length;i++) tempArray.push({label: `${res[i].name} (${res[i].count})`, value: res[i].name, count: res[i].count})
            tempArray = tempArray.sort((a,b) => {return b.count - a.count})
            
            //Updating selector options
            setData(tempArray)
        }           

        return () => clearInterval(interval);
    }, [])
    
    //https://www.digitalocean.com/community/tutorials/react-react-select
    
    return (
        <div className={`${fieldName}Input-div selectorInput-div`}>
            <label>
                {field}
                {tooltipInfo && <TooltipDisplay tooltipInfo={tooltipInfo}/>}
            </label>

            <Select //Lacks local useState update!!!
                options={data}
                menuPlacement = "auto"
                value = { //Setting default option
                    data && data.filter(option => option.value === defaultOption)
                 }
                onChange={e => {
                    let value=e.value
                    settingsCallback({[fieldName]:value})
                    }
                }
            />
        </div>
        )
    }