import { Props as GameCardProps } from '../GameCard'
import { cards } from "../constants/cards";

/**
 * Generates an array of two copies of each current card entry
 * @returns array of GameCardProps, for render GameCards
 */
export function generateRandomizedCardsList(): GameCardProps[] {
    let cardsList: GameCardProps[] = new Array<GameCardProps>(cards.length * cards.length)
    let usedSlotList: Set<number> = new Set<number>()
    let id = 0

    for (let card of cards) {
        let copies = [card, card]
        
        copies.forEach(copy => {
            let slot = randomIntSlot(cardsList.length)
            while(usedSlotList.has(slot)) slot = randomIntSlot(cardsList.length)
            
            cardsList[slot] = {...copy, id}
            id++
        })
    }

    return cardsList
}

function randomIntSlot(max: number): number {
    return Math.floor(Math.random() * max)
}