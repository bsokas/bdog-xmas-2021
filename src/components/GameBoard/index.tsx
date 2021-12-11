import React, { useEffect, useState } from 'react'
import { Props as GameCardProps } from '../GameCard'
import { generateRandomizedCardsList } from './gameController'
import './GameBoard.css'
import { GameCard } from '..'

export interface Props {
    endGameHandler: Function
}

const GameBoard = ({ endGameHandler }: Props) => {
    const [gameCards, setGameCards] = useState<GameCardProps[]>()

    // On initial render
    useEffect(() => {
        setGameCards(generateRandomizedCardsList())
    }, [])

    let cardsRendered = 0
    return (
        // TODO loading circle
        <div className="game-container">
            {gameCards?.map(card => {
                cardsRendered += 1
                console.log(cardsRendered)
                return <GameCard {...card}/>
            })}
        </div>
    )
}

export default GameBoard