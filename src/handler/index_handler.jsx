import React from "react";
import Game from "../component/game";
import generator from "../generator/game_generator";
import Slider from "react-rangeslider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-rangeslider/lib/index.css";
import "../stylesheets/css/overwritten.css";

export default class Handler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opponents: 1,
            size: 10
        }
    }

    render() {
        const opponents = this.state.opponents;
        const size = this.state.size;

        const gameModel = generator.generate((opponents + 1), size);

        return (
            <div>
                <fieldset className="col-md-6">
                    <div>opponents: {opponents}</div>
                    <Slider min={1} max={3} step={1} value={opponents} onChange={(val) => this.setState({ opponents: val })}/>
                    <div>game size: {size}</div>
                    <Slider min={5} max={15} step={1} value={size} onChange={(val) => this.setState({ size: val })}/>
                </fieldset>

                <Game className="col-md-12" model={gameModel}/>
            </div>
        );
    }
}