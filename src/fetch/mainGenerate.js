import { imageGenerate } from "./imageGenerate.js"
import { checkGenerate } from "./checkGenerate.js"
import { statusGenerate } from "./statusGenerate.js"
import { cancelGenerate } from "./cancelGenerate.js"

const apiKey = "L15qrkaHUZU7qbAUlkIlXA" //L15qrkaHUZU7qbAUlkIlXA

export default async function mainGenerate(promptData, updateIdCallBack, displayCallback, returnImageCallback) {
    let localDuration = {
        done:false,
        faulted:false,
        wait_time:0, 
        queue_position:0,
        waiting:promptData.batchSize,
        processing:0,
        finished:0,
        restarted:0,
        failed:0,
    }
    let localIdArray = [], checkData
    // imageArray = [], 
    
    console.log("Making Call")
    try {
        //Making initial call
        for (let i=0;i<promptData.batchSize;i++) {
            let tempImageData = await imageGenerate(apiKey, promptData)
            localIdArray.push(tempImageData.id)
        }
        //Returning ID's
        updateIdCallBack(localIdArray)
        console.log(localIdArray)
    }
    catch(error) { 
        console.log(error)
        return {success:false, message:error} 
    }

    //Checking until completion (Success or Fail)
    do {
        let currentTime = 0, currentPosition = 0, currentWaiting = 0, currentProcessing = 0, currentRestarted = 0
        //Iterates for all ID's in batch (ID removed on completion/faliure)
        for(let i=0;i<localIdArray.length;i++) {
            try {
                //Retrieving Check Data
                checkData = await checkGenerate(localIdArray[i])
                console.log(`${localIdArray[i]} data gotten`, checkData)
                if (checkData.message) throw new Error (checkData.message)

                //Updating Time/Position numbers (Highest is used for display)
                if (checkData.wait_time > currentTime) currentTime = checkData.wait_time
                if (checkData.queue_position > currentPosition) currentPosition = checkData.queue_position
                //Updating Status number
                if (checkData.waiting) currentWaiting++
                if (checkData.processing) currentProcessing++
                if (checkData.restarted) currentRestarted++

                //Generation complete?
                if(checkData.done) {
                    console.log("Done!")
                    
                    let statusData = await statusGenerate(localIdArray[i])
                    console.log(statusData)

                    if (statusData.message) throw new Error (statusData.message)
                    if (statusData.generations[0]) returnImageCallback(statusData.generations[0], localDuration.finished)
                    // if (statusData.generations[0]) {
                    //     let image = new Image(statusData.generations[0].img)
                    //     returnImageCallback(image, localDuration.finished)
                    // }


                    localDuration.finished += 1
                    localIdArray.splice(i,1)

                    console.log(localIdArray)
                }
            } 
            catch(error) {
            console.log(error)

            localDuration.failed +=1
            console.log(localIdArray)

            localIdArray.splice(i,1)

            console.log(localIdArray)
            }
        }
        localDuration.wait_time = currentTime 
        localDuration.queue_position = currentPosition
        localDuration.waiting = currentWaiting
        localDuration.processing = currentProcessing
        localDuration.restarted = currentRestarted
        displayCallback(localDuration)

    } while(localIdArray.length > 0 && localDuration.finished + localDuration.failed !== promptData.batchSize)

    localDuration.done = true
    if (localDuration.failed === promptData.batchSize) localDuration.faulted = true

    console.log("Returning")
    displayCallback(localDuration)
    return localDuration.failed? {success:false, message:"Error! All images failed to generate."}  : {success:true, message:"Success!"} 
}