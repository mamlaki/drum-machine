import { useState } from 'react'
import DrumPad from './components/DrumPad'

export default function App() {
  const [displayText, setDisplayText] = useState('')

  return (
    <div id='drum-machine'>
      <div id='display'>{displayText}</div>
      <DrumPad setDisplayText={setDisplayText} />
    </div>
  )
}