import { useEffect } from "react"

const drumKeys = [
  { key: 'Q', id: 'heater1', audioSrc: '/audio/heater-1.mp3' },
  { key: 'W', id: 'heater2', audioSrc: '/audio/heater-2.mp3' },
  { key: 'E', id: 'heater3', audioSrc: '/audio/heater-3.mp3' },
  { key: 'A', id: 'heater4', audioSrc: '/audio/heater-4.mp3' },
  { key: 'S', id: 'clap', audioSrc: '/audio/clap.mp3' },
  { key: 'D', id: 'openhh', audioSrc: '/audio/open-hh.mp3' },
  { key: 'Z', id: 'kickhat', audioSrc: '/audio/kick-hat.mp3' },
  { key: 'X', id: 'kick', audioSrc: '/audio/kick.mp3' },
  { key: 'C', id: 'closedhh', audioSrc: '/audio/closed-hh.mp3' }
]

export default function DrumPad() {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const playAudio = (key) => {
    const audio = document.getElementById(key)
    audio.currentTime = 0
    audio.play()
  }

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase()
    const drumKey = drumKeys.find(d => d.key === key)

    if (drumKey) {
      const audio = document.getElementById(key)
      audio.currentTime = 0
      audio.play()
    }
  }

  return (
    <div>
      {drumKeys.map(({ key, id, audioSrc }) => (
        <div id={id} key={id} onClick={() => playAudio(key)}>
          {key}
          <audio id={key} src={audioSrc}></audio>
        </div>
      ))}
    </div>
  )
}