export default function DurationDisplay({durationData}) {

    function getTranslatedTime() {
        let time = durationData.wait_time
        let seconds = (`${time%60}`.length === 2 ? time%60 : (`${time%60}`.length === 1 ?`0${time%60}`:`00`))
        let minutes = Math.floor(time/60)
        return `${minutes}:${seconds}`
    }

    return (
        <div id="statusDisplay-div">
            
            <h3>Generation Status</h3>
            <h5 id="durationStatus">Time left: {getTranslatedTime()} - Queue position: {durationData.queue_position}</h5>
            {/* <p id="imageStatus">Pending: {durationData.waiting} - Finished: {durationData.finished} - Failed: {durationData.faulted ? 1 : 0}</p> */}
            <p id="imageStatus">Pending: {durationData.waiting} - Processing: {durationData.processing} - Finished: {durationData.finished} - Restarted: {durationData.restarted} - Failed: {durationData.failed}</p>
        </div>
    )
}