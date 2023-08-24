import CarouselDisplay from './carouselDisplay'
import DurationDisplay from './DurationDisplay'

import Spinner from 'react-bootstrap/Spinner';

export default function GenerationDisplay({resetButtonClicked, generateButtonClicked, imageData, durationData, loading}) {

    function determineDisplay() {
        // console.log(loading)
        // console.log(durationData)
        if (loading.showLoadScreen) return <Spinner animation="border" variant="light"/>
        else if (durationData.done && !durationData.faulted) return <CarouselDisplay imageData={imageData}/>
        else if (!durationData.done) return <DurationDisplay durationData={durationData}/>
        else return
    }

    function resetConfirmationCheck() {
        if (confirm("This will clear your prompts and change all settings back to default. Are you sure?")) {
            resetButtonClicked()
        }
    }

    return (
        <div id="generationDisplay-div">
            <div className="imageDisplay-div">
                {determineDisplay()}
            </div>

            <div className="controlDisplay-div">
                <button id="generate-button" className={`btn btn-danger`} onClick={resetConfirmationCheck}>Reset Settings</button>
                <button id="generate-button" className={`btn ${loading.makingRequest ? "btn-danger" : "btn-primary"}`} onClick={generateButtonClicked}>{!loading.makingRequest ? "Generate" : "Cancel Request"}</button>
            </div>
        </div>
    )
}