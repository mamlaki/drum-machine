import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DrumPad from './components/DrumPad'

export default function App() {
  const [displayText, setDisplayText] = useState('')
  const [volume, setVolume] = useState(0.5)

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value)
    setVolume(newVolume)
    setDisplayText(`Volume: ${Math.round(newVolume * 100)}`)
  }

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center bg-dark text-white fw-bold'>
      <div id='drum-machine' className='border border-5 border-warning rounded p-4 d-flex justify-content-center align-items-center bg-secondary '>
        <div className='row'>
          <div className='col-md-6'>
            <DrumPad setDisplayText={setDisplayText} volume={volume} />
          </div>
          <div className='col-md-6 d-flex align-items-center justify-content-center flex-column '>
            <div id='display' className='bg-dark p-4 rounded text-center w-50 fs-5'>{displayText}</div>
            <input type='range' className='form-range mt-3' min='0' max='1' step='0.01' id='volumeControl' onChange={handleVolumeChange} />
          </div>
        </div>
      </div>
    </div>
  )
}