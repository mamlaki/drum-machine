import { useRef, useEffect, useState } from 'react'

export default function VolumeKnob({ volume, setVolume, isPoweredOn }) {
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(isDragging)
  const initialMousePosition = useRef({ x: 0, y: 0 })
  const movementThreshold = 5

  const knobRef = useRef(null)
  const numberOfNotches = 11
  const knobDiameter = 100

  useEffect(() => {
    console.log('useEffect running, isPoweredOn:', isPoweredOn);

    const knob = knobRef.current
    if (!knob || !isPoweredOn) {
      return
    }

    const handleMouseMove = (event) => {
      if (isDraggingRef.current) {
        const knobRect = knobRef.current.getBoundingClientRect()

        const centerX = knobRect.left + knobRect.width / 2
        const centerY = knobRect.top + knobRect.height / 2
  
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        
        let angle = Math.atan2(dy, dx) * (180 / Math.PI)
        angle = (angle + 360) % 360
    
        let normalizedAngle = angle - 45
        normalizedAngle = Math.max(0, Math.min(normalizedAngle, 270))
    
        let newVolume = normalizedAngle / 270
        console.log('Setting new volume: ', newVolume)
  
        setVolume(newVolume)
        console.log(`Angle: ${angle}, Normalized Angle: ${normalizedAngle}, New Volume: ${newVolume}`);
      } else {
        const dx = event.clientX - initialMousePosition.current.x
        const dy = event.clientY - initialMousePosition.current.y
        if (Math.sqrt(dx * dx + dy * dy) > movementThreshold) {
          setIsDragging(true)
          isDraggingRef.current = true
        }
      }
      // updateDisplayVolume(newVolume)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      isDraggingRef.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = (event) => {
      initialMousePosition.current = { x: event.clientX, y: event.clientY }
      console.log('MouseDown event attached');
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp, { once: true })
      console.log('test')
    }

    knob.addEventListener('mousedown', handleMouseDown)

    return () => {
      knob.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isPoweredOn])


  const calculatePosition = (index, numberOfNotches, diameter, offset) => {
    const angle = (index / (numberOfNotches - 1)) * 300 - 150
    const angleInRadians = (angle * Math.PI) / 180

    const radiusForNotches = diameter / 2
    const radiusForNumbers = (diameter / 2) + offset

    const xForNotches = (diameter / 2) + (radiusForNotches * Math.cos(angleInRadians))
    const yForNotches = (diameter / 2) + (radiusForNotches * Math.sin(angleInRadians))
    const xForNumbers = (diameter / 2) + (radiusForNumbers * Math.cos(angleInRadians))
    const yForNumbers = (diameter / 2) + (radiusForNumbers * Math.sin(angleInRadians))

    return {
      xForNotches,
      yForNotches,
      xForNumbers,
      yForNumbers,
      angle
    }
  }

  const notchesAndNumbers = []
  const offset = 10
  for (let i = 0; i < numberOfNotches; i++) {
    const { xForNotches, yForNotches, xForNumbers, yForNumbers } = calculatePosition(i, numberOfNotches, knobDiameter, offset)

    notchesAndNumbers.push(
      <div 
        key={`notch-${i}`}
        className='knob-notch'
        style={{
          left: `${xForNotches}px`,
          top: `${yForNotches}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    )

    notchesAndNumbers.push(
      <div
        key={`number-${i}`}
        className='knob-number'
        style={{
          left: `${xForNumbers - 10}px`,
          top: `${yForNumbers + 10}px`,
          transform: `rotate(90deg)`,
          transformOrigin: 'center center'
        }}
      >
        {i}
      </div>
    )
  }

  const createRidges = (numberOfRidges) => {
    let clipPath = 'polygon('

    for (let i = 0; i <= numberOfRidges; i++) {
      const angle = (2 * Math.PI * i) / numberOfRidges
      const x = 50 + 48 * Math.cos(angle)
      const y = 50 + 48 * Math.sin(angle)
      clipPath += `${x}% ${y}%, `

      const ridgeAngle = angle + Math.PI / numberOfRidges
      const ridgeX = 50 + 50 * Math.cos(ridgeAngle)
      const ridgeY = 50 + 50 * Math.sin(ridgeAngle)
      clipPath += `${ridgeX}% ${ridgeY}%${i < numberOfRidges ? ', ' : ''}`
    }

    clipPath += ')'
    return clipPath
  }

  const clipPathStyling = {
    clipPath: createRidges(41)
  }

  return (
    <div
      id='volume-control-container'
      className='volume-control-container'
      style={{
        width: `${knobDiameter}px`,
        height: `${knobDiameter}px`
      }}
    >
      <div className='notches-and-numbers'>
        {notchesAndNumbers}
      </div>
      <div 
        ref={knobRef}
        className='volume-knob'
        style={{
          transform: `rotate(${volume * 300 - 155}deg) scale(1.35)`
        }}
      >
        <div className='inner-knob' style={clipPathStyling}></div>
      </div>
    </div>
  )
}