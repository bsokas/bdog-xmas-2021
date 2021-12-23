import { useEffect, useState } from 'react'
import { Props as GameCardProps } from '../GameCard'
import { generateRandomizedCardsList, cardTransitionDelay } from './gameController'
import './GameBoard.css'
import { GameCard, GameComplete } from '..'

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
    const [gameComplete, setGameComplete] = useState<boolean>(false)
    
    // clickedCards are numbers to track the unique entries
    const [clickedCardA, setClickedCardA] = useState<ClickedCardProps | undefined>(undefined)
    const [clickedCardB, setClickedCardB] = useState<ClickedCardProps | undefined>(undefined)

    // On initial render
    useEffect(() => {
        setGameCards(generateRandomizedCardsList())
    }, [])

    async function cardDelay () { await cardTransitionDelay(10)}

    // handler for checking matches
    useEffect(() => {
        if (!clickedCardA || !clickedCardB) return
        
        const matched = clickedCardA.cardId === clickedCardB.cardId
        
        if (matched) {
            // need some sort of highlight here
            setFoundCards(prev => {
                prev.add(clickedCardA.cardKey)
                prev.add(clickedCardB.cardKey)
                return new Set<number>(prev)
            })
        }
    }, [clickedCardA, clickedCardB])


    // handler for handling a new match
    useEffect(() => {
        if (gameCards && foundCards.size === gameCards.length) {
            setGameComplete(true)
        } else if (clickedCardA && clickedCardB) {
            cardDelay()
            setClickedCardA(undefined)
            setClickedCardB(undefined)
        }

    }, [foundCards])

    /**
     * Handles a click of a game card
     * @param cardId unique identifier for the GameCard
     * @returns boolean value to reflect whether the card image is stored and image should be exposed
     */
    const cardClickHandler = (cardKey: number, cardId: string): boolean => {
        if (foundCards.has(cardKey)) return true

        if (!clickedCardA && !clickedCardB) {
            setClickedCardA({ cardKey, cardId })
            return true
        } else if ((!clickedCardA && clickedCardB) && clickedCardB.cardKey !== cardKey) {
            setClickedCardA({ cardKey, cardId })
            return true
        } else if ((!clickedCardB && clickedCardA) && clickedCardA.cardKey !== cardKey) {
            setClickedCardB({ cardKey, cardId })
            return true
        } else if (clickedCardA && clickedCardA.cardKey === cardKey) {
            setClickedCardA(undefined)
            return false
        } else if (clickedCardB && clickedCardB.cardKey === cardKey) {
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
            <div className="game-container">
                <div className="cards-container">
                    {gameCards?.map(card => {
                        const showImg = clickedCardA?.cardKey === card.cardKey || clickedCardB?.cardKey === card.cardKey
            
                        return(
                            <GameCard
                                {...card}
                                key={card.cardKey}
                                cardClickHandler={cardClickHandler}
                                showImg={showImg}
                                matched={foundCards.has(card.cardKey)}
                            />
                        )
                    })}
                </div>
                {/* TODO need a nicer completion window */}
                {gameComplete && <GameComplete />}
            </div>
        </>
    )
}

export default GameBoard