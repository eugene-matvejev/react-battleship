import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormHandler from './form-handler';
import Text from '../component/form/input/text';

export default class AuthHandler extends PureComponent {
    constructor() {
        super();

        this.state = {
            username: undefined,
            password: undefined,
            errors: [],
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onPasswordChange({ target: { value: password } }) {
        this.setState({ password });
    }

    onUsernameChange({ target: { value: username } }) {
        this.setState({ username });
    }

    onSubmit() {
        this.props.callback(this.state, this.props);
    }

    render() {
        const { className, label, signUpLink, resetPasswordLink } = this.props;

        return <FormHandler
            title="login required"
            className="form--rounded"
            config={
                [
                    {
                        title: 'account details',
                        items: [
                            {
                                c: Text,
                                label: 'username',
                                errors: [
                                    'error 1',
                                    'error 2',
                                ],
                            },
                            {
                                c: Text,
                                label: 'password',
                                type: 'password'
                            },
                        ],
                    },
                    {
                        title: 'public details',
                        items: [
                            {
                                c: Text,
                                label: 'nickname'
                            },
                        ],
                    },
                ]
            }
            cancelCTRL = {{
                label: 'cancel',
            }}
            updateCTRL = {{
                label: 'update',
            }}
            submitCTRL = {{
                label: 'submit',
            }}
        />;

        return <section className={`handler auth ${className}`}>
            <h1>{label}</h1>
            <div className="input-wrapper">
                <input type="text" onChange={this.onUsernameChange} />
            </div>
            <div className="input-wrapper">
                <input type="password" onChange={this.onPasswordChange} />
            </div>
            <div>
                <button className="btn-submit" onClick={this.onSubmit}>log in</button>
            </div>
            <Link to={signUpLink}>sign up</Link>
            <Link to={resetPasswordLink}>forgotten password</Link>
        </section>;
    }

    static propTypes = {
        callback: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        signUpLink: PropTypes.string.isRequired,
        resetPasswordLink: PropTypes.string.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: '',
    };
}
