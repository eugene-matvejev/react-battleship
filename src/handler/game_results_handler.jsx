import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../component';
import '../stylesheets/css/handler/game_results_handler.css';

export default class GameResultsHandler extends Component {
    constructor({ current, total }) {
        super();

        this.state = {
            data: [ /** mocked data */

            ],
            current,
            total,
        }

        this.keyDownEventHandler = this.keyDownEventHandler.bind(this);
        this.handleOnClickCallback = this.handleOnClickCallback.bind(this);
    }

    handleOnClickCallback(page) {
        const { total } = this.state;
        const { callback } = this.props;

        /** dublicated check from <Pagination/> need think how to avoid such stuff */
        if (page <= 0 || page > total) {
            return;
        }

        callback(
            {page},
            ({response}) => {
                const { data, page } = response;

                this.setState({ data, page});
            },
            ({response}) => {
                const { data, page } = response;

                this.setState({ data, page, failed: true});
            },
        )
    }

    render() {
        const { label, className, headers: { index: col0, col1, col2 } } = this.props;
        const { data, current, total } = this.state;
        debugger;

        return <div className={`handler game-results ${className}`} onKeyDown={this.keyDownEventHandler}>
            <div className='label'>{label}</div>
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <th>{col0}</th>
                            <th>{col1}</th>
                            <th>{col2}</th>
                        </tr>
                        {
                            data.map(({ id, name, timestamp }) => <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{timestamp}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <Pagination
                    current={current}
                    total={total}
                    onClickCallback={this.handleOnClickCallback}
                />
            </div>
        </div>;
    }

    keyDownEventHandler({ code }) {
        let v = this.state.current;

        switch (code) {
            case 'ArrowRight':
                v++;
                this.handleOnClickCallback(v);
                break;
            case 'ArrowLeft':
                v--;
                this.handleOnClickCallback(v);
                break;
            default:
                break;
        }
    };

    componentWillMount() {
        document.addEventListener('keydown', this.keyDownEventHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownEventHandler);
    }

    static propTyps = {
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        current: PropTypes.number,
        total: PropTypes.number,
        headers: PropTypes.object,
    };

    static defaultProps = {
        className: '',
        current: 1,
        total: 1,
        headers: {
            index: '#',
            col1: 'player name',
            col2: 'time',
        },
    };
}
