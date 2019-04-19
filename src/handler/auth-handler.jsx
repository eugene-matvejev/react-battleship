import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormHandler from './form-handler';
import Text from '../component/form/input/generic-input';
import { validationEngine } from '../validation/engine';
import UserContext from '../context/user-context';

export default class AuthHandler extends PureComponent {
    constructor({ user }) {
        super();

        this.state = {
            user,
        };
    }

    render() {
        const { children } = this.props;
        const { user } = this.state;

        return <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>;
    }

    static propTypes = {
        callback: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
    };
}
