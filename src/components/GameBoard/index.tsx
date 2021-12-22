import { createContext, useContext, useEffect, useState } from 'react'
import { Props as GameCardProps } from '../GameCard'
import { generateRandomizedCardsList, cardTransitionDelay } from './gameController'
import './GameBoard.css'
import { GameCard } from '..'

export interface Props {
    endGameHandler: Function
}

interface ClickedCardProps {
    cardKey: number,
    cardId: string
}

const GameBoard = ({ endGameHandler }: Props) => {
    const [gameCards, setGameCards] = useState<GameCardProps[]>()
    const [foundCards, setFoundCards] = useState<Set<number>>(new Set<number>())
    
    // clickedCards are numbers to track the unique entries
    const [clickedCardA, setClickedCardA] = useState<ClickedCardProps | undefined>(undefined)
    const [clickedCardB, setClickedCardB] = useState<ClickedCardProps | undefined>(undefined)

    // On initial render
    useEffect(() => {
        setGameCards(generateRandomizedCardsList())
    }, [])

    async function cardDelay () { await cardTransitionDelay(1.5)}

    // handler for checking matches
    useEffect(() => {
        if (!clickedCardA || !clickedCardB) return
        debugger
        const matched = clickedCardA.cardId === clickedCardB.cardId
        if (matched) debugger
        if (matched) {
            // need some sort of highlight here
            setFoundCards(prev => {
                prev.add(clickedCardA.cardKey)
                prev.add(clickedCardB.cardKey)
                return new Set<number>(prev)
            })
        }
    }, [clickedCardA, clickedCardB])

    /**
     * Handles a click of a game card
     * @param cardId unique identifier for the GameCard
     * @returns boolean value to reflect whether the card image is stored and image should be exposed
     */
    const cardClickHandler = (cardKey: number, cardId: string): boolean => {
        if (foundCards.has(cardKey)) return true
        
        if (!clickedCardA) {
            setClickedCardA({ cardKey, cardId })
            return true
        } else if (cardKey === clickedCardA.cardKey) {
            setClickedCardA(undefined)
            return false
        } else if (!clickedCardB) {
            setClickedCardB({ cardKey, cardId })
            return true
        } else if (cardKey === clickedCardB.cardKey) {
            setClickedCardB(undefined)
            return false
        }

        return false
    }

    /**
     * Checks if the memory game has been completed
     */
    const checkGame = (): boolean => (foundCards?.size === gameCards?.length)

    return (
        // TODO loading circle
        <>
            {foundCards.size !== gameCards?.length ? 
                (<div className="game-container">
                    {gameCards?.map(card => {
                        const showImg = clickedCardA?.cardKey === card.cardKey || clickedCardB?.cardKey === card.cardKey
                        if (foundCards.has(card.cardKey)) debugger
                        return(
                            <GameCard
                                {...card}
                                key={100}
                                cardClickHandler={cardClickHandler}
                                showImg={showImg}
                                matched={foundCards.has(card.cardKey)}
                            />
                        )
                    })}
                </div>) : <div className="game-complete"/>
            }
        </>
    )
}

export default GameBoard