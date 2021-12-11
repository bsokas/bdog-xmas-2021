import { useState } from 'react'
import { CardProps } from '../constants/cards'
import './GameCard.css'

export type Props = {
    showPicture?: boolean
    key: number
} & CardProps

const GameCard = ({ showPicture, imagePath, key, id }: Props) => {
    const [showImg, setShowImg] = useState<boolean>(false)

    return (
        <div 
            className={`GameCard ${!showImg ? 'hide-card' : 'show-card'}`}
            onClick={() => setShowImg(!showImg)}
        >
            {!showImg && <img alt="snowflake" src={'/cardImages/snowflake.png'} className="card-img snowflake"/>}
            {showImg && <img alt={id} src={imagePath} className="card-img" /> }
        </div>
    )
}

export default GameCard