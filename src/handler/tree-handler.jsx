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

        this.onChange = this.onChange.bind(this);

        this.onCollapse = this.onCollapse.bind(this);
    }

    componentDidMount() {
        this.props.onMount && this.props.onMount(this.props, this.state, this.onSuccess, this.onError);
    }

    onSuccess({ data }) {
        this.setState({ data });

        this.props.onSuccess && this.props.onSuccess(this.props, this.state);
    }

    onError({ data }) {
        this.setState({ data });

        this.props.onError && this.props.onError(this.props, this.state);
    }

    onCollapse(e) {
        e.preventDefault();
        e.stopPropagation();
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
                data && <section className={`tree ${className}`}>
                    {
                        data.map((v, i) =>
                            // !!v.isExpanded
                            // && <TreeNode
                            <TreeNode
                                {...v}
                                key={i}
                                data-cy={`${cy}tree-node-${i}`}
                            />
                        )
                    }
                </section>
            }
        </Fragment>

    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,

        data: PropTypes.arrayOf(
            PropTypes.shape({
                pattern: PropTypes.string,
            })
        ),

        onMount: PropTypes.func,
        onError: PropTypes.func,
        onSuccess: PropTypes.func,

        onFilter: PropTypes.func.isRequired,
    }

    static defaultProps = {
        'data-cy': '',
        className: '',
    }
}
