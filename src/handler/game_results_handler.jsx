import React, {Component} from "react";
import PropTypes from "prop-types";
import Pagination from "../component/pagination";
import "../stylesheets/css/game_results_handler.css"

export default class GameResultsHandler extends Component {
    render() {

        const tableHeaders = this.props.tableHeaders;
        const meta = {
            currentPage: 1,
            totalPages: 1
        };
        const tableData = [
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
        ];

        return (
            <div className="handler game-results">
                <div className="handler-label">{this.props.label}</div>
                <div className="handler-content">
                    <table>
                        <tbody>
                        <tr>
                            <th>#</th>
                            <th>{tableHeaders.playerName}</th>
                            <th>{tableHeaders.timestamp}</th>
                        </tr>
                        {
                            tableData.map((data, key) => {
                                return <tr key={key}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.timestamp}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                    <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages}/>
                </div>
            </div>
        );
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
