import { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DrumPad from './components/DrumPad'

export default function App() {
  const [displayText, setDisplayText] = useState('')
  const [volume, setVolume] = useState(0.5)
  const [isPoweredOn, setIsPoweredOn] = useState(true)
  const displayTimeoutRef = useRef(null)
  const previousDisplayTextRef = useRef('')

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value)
    setVolume(newVolume)
    clearTimeout(displayTimeoutRef.current)
   
    if (displayText.includes('Volume:')) {
      setDisplayText(`Volume: ${(newVolume * 100).toFixed(0)}`)
    } else {
      previousDisplayTextRef.current = displayText
      setDisplayText(`Volume: ${(newVolume * 100).toFixed(0)}`)
    }

    displayTimeoutRef.current = setTimeout(() => {
      setDisplayText(previousDisplayTextRef.current)
    }, 1000)
  }

  const handleDisplayText = (text) => {
    clearTimeout(displayTimeoutRef.current)
    previousDisplayTextRef.current = text
    setDisplayText(text)

    displayTimeoutRef.current = setTimeout(() => {
      setDisplayText(previousDisplayTextRef.current)
    }, 1000)
    
  }

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center bg-dark text-white fw-bold'>
      <div id='drum-machine' className='border border-5 border-warning rounded p-4 d-flex justify-content-center align-items-center bg-secondary '>
        <div className='row'>
          <div className='col-md-6 d-flex align-items-center justify-content-center flex-column '>
            <button onClick={() => setIsPoweredOn(prev => !prev)} className='power-button'>
              Power
            </button>
            <div id='display' className='bg-dark p-4 rounded text-center w-50 fs-5'>{displayText}</div>
            <input type='range' className='form-range mt-3' min='0' max='1' step='0.01' value={volume} id='volumeControl' onChange={handleVolumeChange} disabled={!isPoweredOn} />
          </div>
          <div className='col-md-6'>
            <DrumPad setDisplayText={handleDisplayText} volume={volume} isPoweredOn={isPoweredOn} />
          </div>
        </div>
      </div>
    </div>
  )
}