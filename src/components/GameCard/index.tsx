import React, { useState } from 'react'
import './GameCard.css'

export interface Props {
    showPicture?: boolean
}

const GameCard = ({ showPicture }: Props) => {
    const [showImg, setShowImg] = useState<boolean>(false)

    return (
        <div 
            className={`GameCard ${showImg ? 'hide-card' : 'show-card'}`} 
            onClick={() => setShowImg(!showImg)}
        />
    )
}

export default GameCard