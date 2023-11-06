import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DrumPad from './components/DrumPad'

export default function App() {
  const [displayText, setDisplayText] = useState('')

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center bg-dark text-white fw-bold'>
      <div id='drum-machine' className='border border-5 border-warning rounded p-4 d-flex justify-content-center align-items-center bg-secondary '>
        <div className='row'>
          <div className='col-md-6'>
            <DrumPad setDisplayText={setDisplayText} />
          </div>
          <div className='col-md-6 d-flex align-items-center justify-content-center'>
            <div id='display' className='bg-dark p-4 rounded text-center w-50 fs-5'>{displayText}</div>
          </div>
        </div>
      </div>
    </div>
    
  )
}