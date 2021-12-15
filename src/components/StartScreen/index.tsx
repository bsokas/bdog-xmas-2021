import { useState } from 'react'
import './StartScreen.css'
import { GameBoard } from '..'

const StartScreen = () => {
    const [gameOn, setGameOn] = useState<boolean>(false)

    const endGame = () => {
        setGameOn(false)
    }

    return (
        <div className="start-container">
            {!gameOn && 
                <>
                    <div>
                        <h2 className="title">HAPPY HOLIDAYS!</h2>
                    </div>
                    <div className="subtext">
                        <h3>- Welcome to a festive pet-filled holiday edition of the Memory game!</h3>
                        <h3>- Feeling sad? Mad? Frustrated with <code>[Insert parent's name here]</code> and/or <code>[Lynn or Mark]?</code></h3>
                        <h3>- Look no further. Nothing distracts from the troubles of life like holiday pet-picking.</h3> 
                        <h3>- Happy memorizing!</h3>
                    </div>
                    <div 
                        className="start-button"
                        onClick={() => { setGameOn(true) }}
                    >
                        <p className="button">
                            PLAY!
                        </p>
                    </div>
                    <div
                        className="start-button"
                        onClick={() => console.log('Clicked')}
                    >
                        <p className="button">
                            {/* TODO instructions modal */}
                            INSTRUCTIONS
                        </p>
                    </div>
                </>
            }
            {gameOn &&
                <GameBoard endGameHandler={endGame} />
            }
        </div>
    )
}

export default StartScreen