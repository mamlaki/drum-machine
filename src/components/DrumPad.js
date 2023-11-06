import { useEffect, useState } from "react"
import '../App.css'

const drumKeys = [
  { key: 'Q', id: 'heater1', displayName: 'Heater 1', audioSrc: '/audio/heater-1.mp3' },
  { key: 'W', id: 'heater2', displayName: 'Heater 2', audioSrc: '/audio/heater-2.mp3' },
  { key: 'E', id: 'heater3', displayName: 'Heater 3', audioSrc: '/audio/heater-3.mp3' },
  { key: 'A', id: 'heater4', displayName: 'Heater 4', audioSrc: '/audio/heater-4.mp3' },
  { key: 'S', id: 'clap', displayName: 'Clap', audioSrc: '/audio/clap.mp3' },
  { key: 'D', id: 'openhh', displayName:'Open HH', audioSrc: '/audio/open-hh.mp3' },
  { key: 'Z', id: 'kickhat', displayName: "Kick n' Hat", audioSrc: '/audio/kick-hat.mp3' },
  { key: 'X', id: 'kick', displayName: 'Kick', audioSrc: '/audio/kick.mp3' },
  { key: 'C', id: 'closedhh', displayName: 'Closed HH', audioSrc: '/audio/closed-hh.mp3' }
]

export default function DrumPad({ setDisplayText }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [hoverId, setHoverId] = useState(null)
  const [activeId, setActiveId] = useState(null)

  const playAudio = (key, displayName) => {
    const audio = document.getElementById(key)
    audio.currentTime = 0
    audio.play()
    setDisplayText(displayName)
  }

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase()
    const drumKey = drumKeys.find(d => d.key === key)

    if (drumKey) {
      setActiveId(drumKey.id)
      const audio = document.getElementById(key)
      audio.currentTime = 0
      audio.play()
      setDisplayText(drumKey.displayName)

      setTimeout(() => {
        setActiveId(null)
      }, 200)
    }
  }

  return (
    <div className="row">
      {drumKeys.map(({ key, id, audioSrc, displayName }) => (
        <div id={id} key={id} onClick={() => playAudio(key, displayName)} className="col-md-4 p-2">
          <div className={`drumkeys-container p-4 text-center rounded shadow-lg fs-4 ${hoverId === id || activeId === id ? 'drumkeys' : 'bg-secondary'} ${activeId === id ? 'drumkeys-active' : ''}`} onMouseEnter={() => setHoverId(id)} onMouseLeave={() => setHoverId(null)}>
            {key}
          </div>
          <audio id={key} src={audioSrc}></audio>
        </div>
      ))}
    </div>
  )
}