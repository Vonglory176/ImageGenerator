export async function cancelGenerate(idArray) {
    for (let i=0;i<idArray.length;i++) {
        try {
            const options = {
                method: "DELETE"
            }
    
            const response = await fetch(`https://aihorde.net/api/v2/generate/status/${idArray[i]}`, options)
            let data = await response.json()
            console.log(data)
    
            // return data
        }
        catch (error) {
            console.log(error)
            // return error
        }
    }
}