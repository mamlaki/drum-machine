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

export default function DrumPad({ setDisplayText, volume, isPoweredOn }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isPoweredOn) return
      const key = event.key.toUpperCase()
      const drumKey = drumKeys.find(d => d.key === key)

      if (drumKey) {
        setActiveId(drumKey.id)
        playAudio(key, drumKey.displayName)

        setTimeout(() => {
          setActiveId(null)
        }, 200)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [volume, isPoweredOn])

  const [hoverId, setHoverId] = useState(null)
  const [activeId, setActiveId] = useState(null)

  const playAudio = (key, displayName) => {
    if (!isPoweredOn) return

    const audio = document.getElementById(key)
    console.log('Playing audio at volume:', volume)
    audio.volume = volume
    audio.currentTime = 0
    audio.play()
    setDisplayText(displayName)
  }

  return (
    <div className="row">
      {drumKeys.map(({ key, id, audioSrc, displayName }) => (
        <div id={id} key={id} onClick={() => isPoweredOn && playAudio(key, displayName)} className="col-md-4 p-2">
          <div className={`drumkeys-container p-4 text-center rounded fs-4 unselectable ${hoverId === id || activeId === id ? 'drumkeys' : 'bg-dark'} ${activeId === id ? 'drumkeys-active' : ''}`} onMouseEnter={() => setHoverId(id)} onMouseLeave={() => setHoverId(null)}>
            {key}
          </div>
          <audio id={key} src={audioSrc}></audio>
        </div>
      ))}
    </div>
  )
}