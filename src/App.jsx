import { useState, useEffect } from 'react'
import jQuery from "jquery"
window.$ = window.jQuery = jQuery
import Carousel from 'react-bootstrap/Carousel'

import GenerationDisplay from './components/generationDisplay'
import GenerationSettings from './components/GenerationSettings'

import { checkGenerate } from "./fetch/checkGenerate.js"
import { statusGenerate } from "./fetch/statusGenerate.js"

import mainGenerate from "./fetch/mainGenerate"
import { imageGenerate } from "./fetch/imageGenerate.js"

import promptDataImport from './data/promptData'
import durationDataImport from './data/durationData'

import "./style/index.css"
import { cancelGenerate } from './fetch/cancelGenerate'

export default function App() {
  const [imageData, setImageData] = useState()
  const [loading, setLoading] = useState({
    showLoadScreen:false,
    makingRequest:false
  })
  const [id, setId] = useState()
  const [durationData, setDurationData] = useState(durationDataImport)
  const [data, setData] = useState(promptDataImport)

  async function generateButtonClicked() {
    // Already loading? If not, check prompt
    if (!loading.makingRequest) {
      if (data.prompt) {

        //Image reset and loading animation
        setImageData("")
        setLoading(prevLoad => {
          return {
            ...prevLoad,
            showLoadScreen:true,
            makingRequest:true
          }
        })
        
        try {
          //Making initial call
          let tempImageDataArray = []
          for (let i=0;i<data.batchSize;i++) {
            let tempImageData = await imageGenerate("L15qrkaHUZU7qbAUlkIlXA", data)
            tempImageDataArray.push(tempImageData.id)
            console.log(tempImageDataArray)
          }

          //Saving ID
          if (tempImageDataArray) setId(tempImageDataArray)
          else throw new Error (tempImageDataArray)
          
          setLoading(prevLoad => {return {...prevLoad, showLoadScreen:false}})
        
      }
        catch (error) {
          alert(error)
          resetRequestDisplay()
        }
      }
      else alert("Please enter a legitimate prompt!")
    }
    //Call cancelation
    else if (confirm("This will cancel your request. Are you sure?")) {
      cancelGenerate(id)
      resetRequestDisplay()
    }
  }

  //Repeat when ID changes
  useEffect(() => {
    console.log(id)

    async function startCheckProcess() {
      let tempImageData
      try {
        console.log("Starting Main Generate")
        tempImageData = await startCheckingProcess()
        if (tempImageData) {
          let imageKey = 1
          setImageData(tempImageData.map(e => {
            return (
              <Carousel.Item key={imageKey++}>
                <img alt="Generated picture" src={e.img}/>
              </Carousel.Item>
            )
          }))
        }
      }
      catch (error) {
        console.log(error)
        if (tempImageData.message) alert(tempImageData.message)
        cancelGenerate(id)
      }
  
      //Loading screen reset
      setLoading(prevLoad => {return {...prevLoad, makingRequest:false}})
    }
    if (id) startCheckProcess()
  }, [id])

  async function startCheckingProcess() {
    let localDuration = {
    done:false,
    faulted:false,
    wait_time:0, 
    queue_position:0,
    waiting:id.length,
    processing:0,
    finished:0,
    restarted:0,
    failed:0,
  }

  let imageArray = []

  let localIdArray = [], checkData
  localIdArray.push(...id)

  do {
    
    //Updating display while waiting
    for(let i=0;i<localIdArray.length;i++) {
        console.log("Starting Loop")
        try {
            checkData = await checkGenerate(localIdArray[i])
            console.log(`${localIdArray[i]} data gotten`, checkData)
            if (checkData.wait_time > localDuration.wait_time) localDuration.wait_time = checkData.wait_time 
            if (checkData.queue_position > localDuration.queue_position) localDuration.queue_position = checkData.queue_position

            if (checkData.message) throw new Error (checkData.message)

            //Outputting image if complete
            if(checkData.done) {
                console.log("Done!")
                let statusData = await statusGenerate(localIdArray[i])
                console.log(statusData)
                if (!statusData.message) imageArray.push(...statusData.generations)
                else throw new Error (statusData.message)

                localDuration.processing -=1
                localDuration.finished += 1
                localIdArray.splice(i,1)
                console.log(localIdArray)
            }
        } 
        catch(error) {
          console.log(error)
          localIdArray.splice(i,1)
          console.log(localIdArray)
          localDuration.processing -=1
          localDuration.failed +=1
        }
    }
    displayCallBack(localDuration)
    
  } while(localIdArray && localDuration.finished + localDuration.failed !== id.length)

  localDuration.done = true
  if (localDuration.failed === id.length) localDuration.faulted = true
    console.log("Returning")
    displayCallBack(localDuration)
    return imageArray ? imageArray : "Error! All images failed to generate."
  }
/////////////////////////////////////////////////////////////////////////////////////////
  function resetRequestDisplay() {
    setLoading(prevLoading => {return {...prevLoading, makingRequest:false, showLoadScreen:false}})
    setDurationData(durationDataImport)
  }

  // Duration update
  function displayCallBack(checkData) {
    if (loading.showLoadScreen) {
      setLoading(prevLoad => {
        return {
          ...prevLoad,
          showLoadScreen:false
        }
      })
    }
    if (checkData) {
      setDurationData({...checkData})
    }
  }

  //Settings reset
  function resetButtonClicked() {
    setData(promptDataImport)
  }

  //Settings update on change
  function settingsCallback(value) {
    setData(prevData => {
      return {
        ...prevData,
        ...value
      }
    })
  }

  return (
    <>
      {/* Header */}
      <section id="mainTitle-section">
        <h1>Image Generator</h1>
      </section>
      
      {/* Content */}
      <section id="mainContent-section">
        <GenerationSettings data={data} settingsCallback={settingsCallback}/>
        <GenerationDisplay resetButtonClicked={resetButtonClicked} generateButtonClicked={generateButtonClicked} imageData={imageData} durationData={durationData} loading={loading}/>
      </section>

      {/* Footer */}
      <section id="mainFooter-section" className='d-flex align-items-center gap-1'>
        <h6>Skyler 2023</h6> 
        <a href="https://github.com/Vonglory176/ImageGenerator" className="navbar-imageLink" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"/>
          </svg>
        </a>
      </section>
    </>
  )
}