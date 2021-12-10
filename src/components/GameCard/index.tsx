import React, { useState } from 'react'
import { CardProps } from '../constants/cards'
import './GameCard.css'

export type Props = {
    showPicture?: boolean
    id: number
} & CardProps

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