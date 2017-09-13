import React, {Component} from "react";
import PropTypes from "prop-types";
import Pagination from "../component/pagination";
import "../stylesheets/css/game_results_handler.css";

export default class GameResultsHandler extends Component {
    constructor() {
        super();

        this.state = {
            data: [
                {
                    id: 1,
                    name: 'test',
                    timestamp: (new Date()).toLocaleString()
                },
                {
                    id: 1,
                    name: 'test',
                    timestamp: (new Date()).toLocaleString()
                },
                {
                    id: 1,
                    name: 'test',
                    timestamp: (new Date()).toLocaleString()
                },
                {
                    id: 1,
                    name: 'test',
                    timestamp: (new Date()).toLocaleString()
                },
                {
                    id: 1,
                    name: 'test',
                    timestamp: (new Date()).toLocaleString()
                }
            ],
            meta: {
                currentPage: 1,
                totalPages: 1
            }
        }
    }

    render() {
        const headers = this.props.tableHeaders;
        const meta = this.state.meta;
        const data = this.state.data;

        return (
            <div className="handler game-results">
                <div className="handler-label">{this.props.label}</div>
                <div className="handler-content">
                    <table>
                        <tbody>
                        <tr>
                            <th>#</th>
                            <th>{headers.playerName}</th>
                            <th>{headers.timestamp}</th>
                        </tr>
                        {
                            data.map((data, key) => {
                                return <tr key={key}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.timestamp}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={meta.currentPage}
                        totalPages={meta.totalPages}
                        pageChangeCallback={
                            (page) => {
                                const meta = this.state.meta;
                                meta.currentPage = page;

                                this.setState({meta: meta});
                            }
                        }
                    />
                </div>
            </div>
        );
    }

    keyDownEventHandler(event) {
        const meta = this.state.meta;

        switch (event.code) {
            case 'ArrowRight':
                meta.currentPage++;
                this.setState({meta: meta});
                break;
            case 'ArrowLeft':
                meta.currentPage--;
                this.setState({meta: meta});
                break;
            default:
                break;
        }
    };

    componentWillMount() {
        document.addEventListener("keydown", this.keyDownEventHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownEventHandler.bind(this));
    }

    static propTyps = {
        label: PropTypes.string,
        tableHeaders: PropTypes.object
    };

    static defaultProps = {
        label: 'current game',
        tableHeaders: {
            index: '#',
            playerName: 'player name',
            timestamp: 'time'
        }
    };
}
