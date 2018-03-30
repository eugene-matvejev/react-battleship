import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AuthHandler extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onPasswordChange(password) {
        this.setState({ password });
    }

    onUsernameChange(username) {
        this.setState({ username });
    }

    onSubmit() {
        const { onSubmit, onResolve } = this.props;
        const { username, password } = this.state;

        onSubmit(
            { username, password },
            ( payload ) => {
                onResolve(true);
            },
            ( payload ) => {
                onResolve(false);
            },
        ).then();
    }

    render() {
        const { className, signedUpLink, resetPasswordLink } = this.props;

        return <div className={`handler auth ${className}`}>
            <h1>Login required</h1>
            <div className="input-wrapper">
                <input type="text" onChange={(e) => this.onUsernameChange(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <input type="password" onChange={(e) => this.onPasswordChange(e.target.value)}/>
            </div>
            <div>
                <button className="btn-submit" onClick={this.onSubmit}>log in</button>
            </div>
            <Link to={signedUpLink}>sign up</Link>
            <Link to={resetPasswordLink}>forgotten password</Link>
        </div>;
    }

    static propTypes = {
        className: PropTypes.string,
        signedUpLink: PropTypes.string,
        resetPasswordLink: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onResolve: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
        signedUpLink: '',
        resetPasswordLink: '',
    };
}
