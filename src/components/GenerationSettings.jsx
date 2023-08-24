import TextInput from "./TextInput"
import RangeInput from "./RangeInput"
import SwitchInput from "./SwitchInput"
import SelectorInput from "./SelectorInput"

export default function GenerationSettings({data, settingsCallback}) {
    return(
        <div id="generationSettings-div">
            <TextInput field="Prompt" fieldName="prompt" fieldValue={data.prompt} settingsCallback={settingsCallback}/>

            <TextInput field="Negative Prompt" fieldName="negativePrompt" fieldValue={data.negativePrompt} settingsCallback={settingsCallback}/> {/*tooltipInfo={"What you don't want to see in the image."}*/}

            <TextInput field="Seed" fieldName="seed" fieldValue={data.seed} settingsCallback={settingsCallback}/>

            {/* SAMPLER GOES HERE */}

            <RangeInput field="Batch Size" fieldName="batchSize" min="1" max="5" fieldValue={data.batchSize} settingsCallback={settingsCallback}/>

            <RangeInput field="Steps" fieldName="steps" min="1" max="50" fieldValue={data.steps} settingsCallback={settingsCallback} tooltipInfo={"How detailed the image is. Around 30-50 steps is reccomended, though be aware that more steps means longer generation time."}/>

            <RangeInput field="Width" fieldName="width" min="64" max="1024" step={64} fieldValue={data.width} settingsCallback={settingsCallback}/>

            <RangeInput field="Height" fieldName="height" min="64" max="1024" step={64} fieldValue={data.height} settingsCallback={settingsCallback}/>

            <RangeInput field="Guidance" fieldName="guidance" min="1" max="24" fieldValue={data.guidance} settingsCallback={settingsCallback} tooltipInfo={"How closely the AI should adhere to your prompt, lower numbers giving it more freedom."}/>

            <RangeInput field="CLIP Skip" fieldName="clipSkip" min="1" max="10" fieldValue={data.clipSkip} settingsCallback={settingsCallback} tooltipInfo={"Last layers of CLIP to ignore. For most situations this can be left alone."}/>
            
            {/* Models */}
            <SelectorInput field="Model" fieldName="model" defaultOption={data.model} settingsCallback={settingsCallback} tooltipInfo={"Different models can drastically change the style of your image. Keep an eye on the number in the parentheses however, as this represents avalible workers. Fewer workers can mean much longer generation times or even potential timeout."}/>

            {/* POST PROCESSOR GOES HERE */}
            {/* <SelectorInput field="Post Processor" fieldName="postProcessor" apiLink="https://raw.githubusercontent.com/db0/AI-Horde-image-model-reference/main/stable_diffusion.json"/> */}

            <div className="switchInputContainer-div">
                <SwitchInput field="Hi-res fix" fieldName="hiResFix" fieldCheck={data.hiResFix} settingsCallback={settingsCallback} tooltipInfo={"May improve high resolution images."}/>

                <SwitchInput field="Karras" fieldName="karras" fieldCheck={data.karras} settingsCallback={settingsCallback} tooltipInfo={"Improves generation while requiring fewer steps."}/>

                <SwitchInput field="Use TW" fieldName="trustedWorkers" fieldCheck={data.trustedWorkers} settingsCallback={settingsCallback} tooltipInfo={"Whether or not to allow only trusted workers to fulfill your requests."}/>

                {/* <SwitchInput field="Create Video" fieldName="createVideo" fieldCheck={data.createVideo} settingsCallback={settingsCallback} tooltipInfo={"Generates an interpolated video - requires no extra kudos. Looks great when images are similar to each other! Note: will not be saved in the gallery."}/> */}

                {/* <SwitchInput field="Tiling" fieldName="tiling" fieldCheck={data.tiling} settingsCallback={settingsCallback}/> */}

                <SwitchInput field="NSFW" fieldName="nsfw" fieldCheck={data.nsfw} settingsCallback={settingsCallback} tooltipInfo={"Generated NSFW images will be censored if disabled."}/>

                {/* <SwitchInput field="X/Y Plot" fieldName=""/> */}
            </div>

            {/* MULTI SELECT GOES HERE */}
        </div>
        )
    }