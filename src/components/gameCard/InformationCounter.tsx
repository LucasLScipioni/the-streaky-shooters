import React from "react";
import './InformationCounter.sass'

interface InformationCounterProps {
    text: string
}

const InformationCounter: React.FC<InformationCounterProps> = ({text}) => {
  return (
    <>
        <div className="information-counter">
            <div className="information-counter__display">
                05
            </div>
            <span>{text}</span>
        </div>
    </>
  )
}

export default InformationCounter
