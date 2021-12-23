import './Instructions.css'

export interface Props {
    closeInstructions: Function
}

const Instructions = ({ closeInstructions }: Props) => (
    <div className="instruction-container">
        <p className="instructions-p">
            I thought everyone who'd be playing this would be smart enough to know how it works,
            but apparently Gary does not. So the important pieces:
        </p>
        <p className="piece">1) The goal is to match all the pairs of cards</p>
        <p className="piece">2) You can only have two cards flipped over at any time</p>
        <p className="piece">3) The app will take care of the rest</p>
        <div className="close" onClick={() => closeInstructions()}>
            <p className="close-text">Close</p>
        </div>
    </div>
)

export default Instructions