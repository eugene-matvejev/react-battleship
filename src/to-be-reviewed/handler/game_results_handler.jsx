import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../component/pagination';

export default class GameResultsHandler extends Component {
    constructor({ current, total }) {
        super();

        this.state = {
            data: [
                /** mocked data */
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

        console.log('handleOnClickCallback', {total, page});
        callback(
            {page},
            (v) => {
                console.log({v});
                const current = v.headers['x-page-page'];
                const total = v.headers['x-page-total'];
                const { data } = v;

                const self = this;
                console.log({v, self, current, total, data});

                this.setState({ data, current });
            },
            (v) => {
                console.log({v});
                const current = v.headers['x-page-page'];
                const total = v.headers['x-page-total'];

                const self = this;
                console.log({v, self, current, total});

                this.setState({ data: []});
            }
        )
    }

    render() {
        const { label, className, headers: { index: col0, col1, col2 } } = this.props;
        const { data, current, total } = this.state;

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
        const { current } = this.state;

        switch (code) {
            case 'ArrowRight':
                this.handleOnClickCallback(current + 1);
                break;
            case 'ArrowLeft':
                this.handleOnClickCallback(current - 1);
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
        current: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
        className: PropTypes.string,
        headers: PropTypes.object,
    };

    static defaultProps = {
        className: '',
        headers: {
            index: '#',
            col1: 'player name',
            col2: 'time',
        },
    };
}
