import { Props as GameCardProps } from '../GameCard'
import { cards } from "../constants/cards";

/**
 * Generates an array of two copies of each current card entry
 * @returns array of GameCardProps, for render GameCards
 */
export function generateRandomizedCardsList(): GameCardProps[] {
    let cardsList: GameCardProps[] = new Array<GameCardProps>(cards.length * 2)
    let usedSlotList: Set<number> = new Set<number>()
    let cardKey = 0

    for (let card of cards) {
        let copies = [card, card]
        
        copies.forEach(copy => {
            let slot = randomIntSlot(cardsList.length)
            while(usedSlotList.has(slot)) slot = randomIntSlot(cardsList.length)
            
            cardsList[slot] = {...copy, cardKey}
            usedSlotList.add(slot)
            cardKey++
        })
    }

    return cardsList
}

export async function cardTransitionDelay(delayInSec: number) {
    return new Promise( delay => setTimeout(() => {}, delayInSec * 1000))
}

function randomIntSlot(max: number): number {
    return Math.floor(Math.random() * max)
}