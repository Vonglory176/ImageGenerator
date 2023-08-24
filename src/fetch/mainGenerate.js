import { imageGenerate } from "./imageGenerate.js"
import { checkGenerate } from "./checkGenerate.js"
import { statusGenerate } from "./statusGenerate.js"
import { cancelGenerate } from "./cancelGenerate.js"

// const apiKey = "L15qrkaHUZU7qbAUlkIlXA" //L15qrkaHUZU7qbAUlkIlXA

export default async function mainGenerate(idArray, displayCallback) {

    let localDuration = {
        done:false,
        faulted:false,
        wait_time:0, 
        queue_position:0,
        waiting:0,
        processing:0,
        finished:0,
        restarted:0,
        failed:0,
    }

    let imageArray = []

    let checkData, localIdArray = idArray

    do {
        let time = 0, position = 0
        
        //Updating display while waiting
        for(let i=0;i<localIdArray.length;i++) {
            console.log("Starting Loop")
            try {
                checkData = await checkGenerate(localIdArray[i])
                console.log(`${localIdArray[i]} data gotten`, checkData)
                if (checkData.wait_time > localDuration.wait_time) localDuration.wait_time = checkData.wait_time 
                if (checkData.queue_position > localDuration.queue_position) localDuration.queue_position = checkData.queue_position

                if (checkData.message) throw new Error (checkData.message)

                // if (!) displayCallback(checkData)
                //Outputting image if complete
                if(checkData.done) {
                    console.log("Done!")
                    let statusData = await statusGenerate(localIdArray[i])
                    if (!statusData.message) imageArray.push(...statusData.generations)
                    else throw new Error (statusData.message)

                    localDuration.done += 1
                    localIdArray.splice(i,1)
                }
            } 
            catch(error) {
                console.log(error)
                localIdArray.splice(i,1)
            }
        }
        // displayCallback(localDuration)
        
    } while(localIdArray && localDuration.done + localDuration.failed !== idArray.length)

    localDuration.done = true
    if (localDuration.failed === idArray.length) localDuration.faulted = true

    console.log("Returning")
    displayCallback(localDuration)
    return imageArray ? imageArray : "Error! All images failed to generate."
}