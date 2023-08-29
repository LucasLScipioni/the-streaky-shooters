import React from "react";
import './InformationCounter.sass'

interface InformationCounterProps {
    text: string,
    value: number
}

const InformationCounter: React.FC<InformationCounterProps> = ({text, value}) => {
  return (
    <>
        <div className="information-counter">
            <div className="information-counter__display">
                { value }
            </div>
            <span>{text}</span>
        </div>
    </>
  )
}

export default InformationCounter
