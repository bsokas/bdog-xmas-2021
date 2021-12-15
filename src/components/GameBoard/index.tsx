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
    const [clickedCardA, setClickedCardA] = useState<number>()
    const [clickedCardB, setClickedCardB] = useState<number>()
    const [foundCards, setFoundCards] = useState<Set<number>>(new Set<number>())

    // On initial render
    useEffect(() => {
        setGameCards(generateRandomizedCardsList())
    }, [])

    /**
     * Handles a click of a game card
     * @param cardId unique identifier for the GameCard
     * @returns boolean value to reflect whether the card image is stored and image should be exposed
     */
    const cardClickHandler = (cardId: number): boolean => {
        if (foundCards.has(cardId)) return true
        
        if (!clickedCardA) {
            setClickedCardA(cardId)
            return true
        } else if (!clickedCardB) {
            setClickedCardB(cardId)
            return true
        } else if (cardId === clickedCardA) { // switch off
            setClickedCardA(undefined)
            return false
        } else if (cardId === clickedCardB) { // switch off
            setClickedCardB(undefined)
            return false
        }

        return false
    }

    /**
     * 
     * @param cardId 
     * @returns boolean true if a match has been found, false if not, and undefined if matching is unavailable
     */
    const checkMatch = (): boolean | undefined => {
        debugger
        if (!clickedCardA || !clickedCardB) return

        const matched = clickedCardA === clickedCardB
        if (matched) {
            setFoundCards(prev => {
                prev.add(clickedCardA)
                prev.add(clickedCardB)
                return new Set<number>(prev)
            })
        }

        setClickedCardA(undefined)
        setClickedCardB(undefined)

        return matched
    }

    /**
     * Checks if the memory game has been completed
     */
    const checkGame = (): boolean => (foundCards?.size === gameCards?.length)

    let cardsRendered = 0
    return (
        // TODO loading circle
        <div className="game-container">
            {gameCards?.map(card => {
                cardsRendered += 1
                console.log(cardsRendered)
                return <GameCard {...card} cardClickHandler={cardClickHandler} checkMatch={checkMatch}/>
            })}
        </div>
    )
}

export default GameBoard