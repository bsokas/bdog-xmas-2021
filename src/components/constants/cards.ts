export interface CardProps {
    imagePath: string
    id: string
}

const imagesRoot = '/cardImages'
export const cards: CardProps[] = [
    {
        id: 'max',
        imagePath: `${imagesRoot}/max.png`
    },
    {
        id: 'obi',
        imagePath: `${imagesRoot}/obes.png`
    },
    {
        id: 'effie',
        imagePath: `${imagesRoot}/effie.png`
    },
    {
        id: 'rooney',
        imagePath: `${imagesRoot}/rooney.png`
    },
    {
        id: 'pepper',
        imagePath: `${imagesRoot}/pepper.jpeg`
    },
    {
        id: 'roo_and_effie',
        imagePath: `${imagesRoot}/roo_and_effie.jpg`
    }
]