import { useEffect, useState } from 'react'
import { CardProps } from '../constants/cards'
import './GameCard.css'

export type Props = {
    key: number
} & CardProps

type GameCardProps = {
    cardClickHandler: Function,
    checkMatch: Function
} & Props

const GameCard = ({ imagePath, key, id, cardClickHandler, checkMatch }: GameCardProps) => {
    const [showImg, setShowImg] = useState<boolean>(false)
    const [cardMatched, setCardMatched] = useState<boolean>(false)

    useEffect(() => {
        if (!showImg) return

        // TODO need to figure out how to turn off cards after no match, maybe a timer
        const matched = checkMatch()
        if (matched !== undefined && !matched) setShowImg(false)
        setCardMatched(matched)
    }, [showImg])

    return (
        <div 
            key={key}
            className={`GameCard ${!showImg ? 'hide-card' : 'show-card'}`}
            onClick={() => {
                if (cardMatched) return
                
                setShowImg(cardClickHandler(id))
            }}
        >
            {!showImg && <img alt="snowflake" src={'/cardImages/snowflake.png'} className="card-img snowflake"/>}
            {showImg && <img alt={id} src={imagePath} className="card-img" /> }
        </div>
    )
}

export default GameCard