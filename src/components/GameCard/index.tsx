import { CardProps } from '../constants/cards'
import './GameCard.css'

export type Props = {
    cardKey: number,
} & CardProps

type GameCardProps = {
    cardClickHandler: Function,
    showImg: boolean,
    matched: boolean
} & Props

const GameCard = ({ imagePath, cardKey, id, cardClickHandler, matched, showImg }: GameCardProps) => {
    let gameCardColor: string
    if (matched) {
        gameCardColor = 'matched'
    } else if (!showImg) {
        gameCardColor = 'hide-card'
    } else {
        gameCardColor = 'show-card'
    }

    return (
        <div 
            key={cardKey}
            className={`GameCard ${gameCardColor}`}
            onClick={() => {
                if (matched) return
                
                cardClickHandler(cardKey, id)
            }}
        >
            {showImg || matched? (
                <img alt={id} src={imagePath} className={`card-img`} />
            ) : (
                <img alt="snowflake" src={'/cardImages/snowflake.png'} className="card-img snowflake"/>
                
            )}
            {matched && <div className="matched-indicator"/>}
        </div>
    )
}

export default GameCard