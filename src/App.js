import { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DrumPad from './components/DrumPad'

export default function App() {
  const [displayText, setDisplayText] = useState('')
  const [volume, setVolume] = useState(0.5)
  const [isPoweredOn, setIsPoweredOn] = useState(true)
  const displayTimeoutRef = useRef(null)
  const previousDisplayTextRef = useRef('')
  const knobRef = useRef(null)

  const buttonAudio = new Audio('/audio/hollow-button-click.mp3')
  buttonAudio.volume = 0.1

  useEffect(() => {
    const knob = knobRef.current
    if (!knob || !isPoweredOn) {
      return
    }

    const handleMouseMove = (event) => {
      const knobRect = knobRef.current.getBoundingClientRect()

      const centerX = knobRect.left + knobRect.width / 2
      const centerY = knobRect.top + knobRect.height / 2

      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      
      let angle = Math.atan2(dy, dx) * (180 / Math.PI)
      angle = (angle + 360) % 360
  
      let normalizedAngle = (angle - 45 + 360) % 360
      normalizedAngle = Math.max(0, Math.min(normalizedAngle, 270))
  
      let newVolume = normalizedAngle / 270
      console.log('Setting new volume: ', newVolume)

      setVolume(newVolume)
      updateDisplayVolume(newVolume)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp, { once: true})
    }

    knob.addEventListener('mousedown', handleMouseDown)

    return () => {
      knob.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isPoweredOn])


  const updateDisplayVolume = (newVolume) => {
    clearTimeout(displayTimeoutRef.current)
    setDisplayText(`Volume: ${(newVolume * 100).toFixed(0)}`)
    displayTimeoutRef.current = setTimeout(() => {
      if (isPoweredOn) {
        setDisplayText(previousDisplayTextRef.current)
      }
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
          <div className='col-md-6 d-flex align-items-center justify-content-center flex-column gap-3'>
            <div className='d-flex gap-3'>
              <div className='d-flex flex-column text-center'>
                <p className='power-btn-label text-warning mb-1'>POWER</p>
                <div className='power-btn-container d-flex p-2 justify-content-center'>
                  <button onClick={() => {
                    setIsPoweredOn(prev => !prev)
                    buttonAudio.play()
                  }} className='power-button bg-dark shadow'>
                  </button>
                </div>
              </div>
              <div className='power-light-container d-flex flex-column'>
                <div className='d-flex align-items-baseline gap-2'>
                  <div className={`on-off-lights ${isPoweredOn ? 'bg-success' : 'bg-dark'}`}></div>
                  <p className='text-warning'>ON</p>
                </div>
                <div className='d-flex align-items-baseline gap-2'>
                  <div className={`on-off-lights ${isPoweredOn ? 'bg-dark' : 'bg-danger'}`}></div>
                  <p className='text-warning'>OFF</p>
                </div>
              </div>
            </div>
            <div id='display' className='bg-dark p-4 rounded text-center w-50 fs-5'>{displayText}</div>
            <div 
              ref={knobRef} 
              id='volume-control' 
              className='volume-knob' 
              style={{ 
                transform: `rotate(${volume * 270 - 45}deg)`, 
                boxShadow: `0px ${4 + volume * 4}px ${8 + volume * 4}px rgba(0, 0, 0, ${0.3 + volume * 0.2})`
              }}>  
            </div>
          </div>
          <div className='col-md-6'>
            <DrumPad setDisplayText={handleDisplayText} volume={volume} isPoweredOn={isPoweredOn} />
          </div>
        </div>
      </div>
      { console.log('Rendering with displayText: ', displayText) }
    </div>
  )
}