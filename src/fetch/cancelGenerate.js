export async function cancelGenerate(idArray) {
    console.log(idArray)
    try {        
        for (let i=0;i<idArray.length;i++) {
            // try {
                const options = {
                    method: "DELETE"
                }
                
                fetch(`https://aihorde.net/api/v2/generate/status/${idArray[i]}`, options)
                // const response = fetch(`https://aihorde.net/api/v2/generate/status/${idArray[i]}`, options)
                // let data = await response.json()
                // console.log(data)
                
                // return data
            // }
            // catch (error) {console.log(error)}
        }
    }
    catch (error) {console.log(error)}
}