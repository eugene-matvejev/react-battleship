import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TreeNode from '../component/tree-node';

export default class TreeHandler extends PureComponent {
    constructor({ data, pattern }) {
        super();

        this.state = {
            data,
            pattern,
        }

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        this.onExpand = this.onExpand.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.onMount && this.props.onMount(this.props, this.state, this.onSuccess, this.onError);
    }

    onSuccess({ data }) {
        this.setState({ data });

        this.props.onSuccess && this.props.onSuccess(this.props, this.state);
    }

    onError() {
        this.setState({ data: [] });

        this.props.onError && this.props.onError(this.props, this.state);
    }

    onExpand(e) {
        e.preventDefault();
        e.stopPropagation();

        const { data } = this.state;
        const path = e.target.getAttribute('data-node');

        if (!path) {
            return;
        }

        this.props.onExpand(data, path);

        this.setState({ data: [...data] });
    }

    onChange(e) {
        e.preventDefault();
        e.stopPropagation();

        const { target: { value: pattern } } = e;
        const { data } = this.state;

        this.props.onFilter(data, pattern);

        this.setState({ data: [...data], pattern });
    }

    render() {
        const { data, pattern } = this.state;
        const { 'data-cy': cy, className, placeholder } = this.props;

        return <Fragment>
            <input
                data-cy={`${cy}tree-pattern`}
                className="tree_input"
                placeholder={placeholder}
                value={pattern}
                onChange={this.onChange}
            />
            {
                data && <section className={`tree ${className}`} onClick={this.onExpand}>
                    {
                        data.map((v, i) =>
                            <TreeNode
                                {...v}
                                key={i}
                                data-cy={`${cy}tree-node-${i}`}
                                data-node={`${i}`}
                            />
                        )
                    }
                </section>
            }
        </Fragment>;
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        pattern: PropTypes.string,

        data: PropTypes.arrayOf(
            PropTypes.shape({
                isExpanded: PropTypes.bool,
            })
        ),

        onMount: PropTypes.func,
        onError: PropTypes.func,
        onSuccess: PropTypes.func,

        onFilter: PropTypes.func.isRequired,
        onExpand: PropTypes.func.isRequired,
    }

    static defaultProps = {
        'data-cy': '',
        className: '',
        pattern: '',
    }
}
