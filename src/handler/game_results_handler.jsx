import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../component';
import '../stylesheets/css/common.css';
import '../stylesheets/css/game_results_handler.css';

export default class GameResultsHandler extends Component {
    constructor({currentPage, totalPages}) {
        super();

        this.state = {
            data: [ /** mocked data */
                { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
                { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
                { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
                { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
                { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
            ],
            currentPage: currentPage,
            totalPages: totalPages,
        }

        this.keyDownEventHandler = this.keyDownEventHandler.bind(this);
    }

    render() {
        const { label, tableHeaders } = this.props;
        const { data, currentPage, totalPages } = this.state;

        const paginationOnClickCallback = (page) => {
            this.setState({currentPage: page});
        };

        return (
            <div className='handler game-results' onKeyDown={this.keyDownEventHandler}>
                <div className='handler-label'>{label}</div>
                <div className='handler-content'>
                    <table>
                        <tbody>
                        <tr>
                            <th>#</th>
                            <th>{tableHeaders.playerName}</th>
                            <th>{tableHeaders.timestamp}</th>
                        </tr>
                        {
                            data.map((data, key) => <tr key={key}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.timestamp}</td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
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
        document.addEventListener('keydown', this.keyDownEventHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownEventHandler.bind(this));
    }

    static propTyps = {
        className: PropTypes.string,
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        label: PropTypes.string,
        tableHeaders: PropTypes.object
    };

    static defaultProps = {
        className: '',
        currentPage: 1,
        totalPages: 1,
        label: 'previous games results',
        tableHeaders: {
            index: '#',
            playerName: 'player name',
            timestamp: 'time',
        },
    };
}
