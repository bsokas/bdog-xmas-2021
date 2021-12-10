import React, { useEffect, useState } from 'react'
import { Props as GameCardProps } from '../GameCard'
import { generateRandomizedCardsList } from './gameController'
import './GameBoard.css'
import { GameCard } from '..'

export interface Props {
    endGameHandler: Function
}

const GameBoard = ({  }) => {
    const [gameCards, setGameCards] = useState<GameCardProps[]>()

    // On initial render
    useEffect(() => {
        setGameCards(generateRandomizedCardsList())
    })

    return (
        // TODO loading circle
        <div className="game-container">
            {gameCards?.map(card => (
                <GameCard {...card}/>
            ))}
        </div>
    )
}

export default GameBoard