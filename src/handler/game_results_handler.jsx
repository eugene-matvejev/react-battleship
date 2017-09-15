import React, {Component} from "react";
import PropTypes from "prop-types";
import Pagination from "../component/pagination";
import "../stylesheets/css/common.css";
import "../stylesheets/css/game_results_handler.css";

export default class GameResultsHandler extends Component {
    constructor(props) {
        super(props);

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
            currentPage: props.currentPage,
            totalPages: props.totalPages
        }
    }

    render() {
        const headers = this.props.tableHeaders;
        const data = this.state.data;

        const paginationOnClickCallback = (page) => {
            this.setState({currentPage: page});
        };

        return (
            <div className="handler game-results" onKeyDown={this.keyDownEventHandler.bind(this)}>
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
                        currentPage={this.state.currentPage}
                        totalPages={this.state.totalPages}
                        onClickCallback={paginationOnClickCallback}
                    />
                </div>
            </div>
        );
    }

    keyDownEventHandler(event) {
        let v = this.state.currentPage;

        switch (event.code) {
            case 'ArrowRight':
                v++;
                this.setState({currentPage: v});
                break;
            case 'ArrowLeft':
                v--;
                this.setState({currentPage: v});
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
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        tableHeaders: PropTypes.object
    };

    static defaultProps = {
        label: 'previous games results',
        tableHeaders: {
            index: '#',
            playerName: 'player name',
            timestamp: 'time'
        },
        currentPage: 1,
        totalPages: 1
    };
}
