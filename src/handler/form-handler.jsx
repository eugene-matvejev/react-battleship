import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../component/form/accordion';
import Button from '../component/button';

export default class FormHandler extends PureComponent {
    constructor({ config, data, isValid }) {
        super();

        this.state = {
            config,
            data,
            isValid,
        }

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.onCollapse = this.onCollapse.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.onMount && this.props.onMount(this.props, this.state, this.onSuccess, this.onError);
    }

    onSuccess({ data, config }) {
        this.setState({ data, config });

        this.props.onSuccess && this.props.onSuccess(this.props, this.state);
    }

    onError({ data, config }) {
        this.setState({ data, config });

        this.props.onError && this.props.onError(this.props, this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const { config } = this.state;

        if (!this.props.validate || this.props.validate(config)) {
            this.setState({ isValid: true });

            this.props.onSubmit && this.props.onSubmit(this.props, this.state, this.onSuccess, this.onError);
        } else {
            this.setState({ config: [...config], isValid: false });
        }
    }

    onCancel(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onCancel && this.props.onCancel(this.props, this.state, this.onSuccess, this.onError);
    }

    onCollapse(e) {
        e.preventDefault();
        e.stopPropagation();

        const { config } = this.state;

        const section = e.target.getAttribute('data-section');

        config[section].isCollapsed = !config[section].isCollapsed;

        this.setState({ config: [...config] });
    }

    onChange(e) {
        e.preventDefault();
        e.stopPropagation();

        const { config } = this.state;

        const section = e.target.getAttribute('data-section');
        const field = e.target.getAttribute('data-field');

        config[section].items[field].value = e.target.value;

        this.props.validate && this.props.validate(config, [[section, field]]);

        const isValid = config.every(({ items }) => items.every(({ errors }) => !Array.isArray(errors) || !errors.length));

        this.setState({ config: [...config], isValid });
    }

    render() {
        const { config, data, isValid } = this.state;
        const { cy, className, title, submitCTRL, updateCTRL, cancelCTRL } = this.props;

        return <form className={`form ${className}`}>
            {title && <h1 className="form_title" data-cy={`${cy}form-title`}>{title}</h1>}
            {
                config.map(({ className, title, isCollapsed, items }, i) =>
                    <Accordion
                        className={className}
                        isCollapsed={isCollapsed}
                        onCollapse={this.onCollapse}
                        title={title}
                        key={i}
                        data-section={i}
                        data-cy={`${cy}section-${i}`}
                    >
                        {
                            items.map(({ c: C, ...props }, j) =>
                                <C
                                    {...props}
                                    key={j}
                                    onChange={this.onChange}
                                    data-cy={`${cy}section-${i}-input-${j}`}
                                    data-section={i}
                                    data-field={j}
                                />
                            )
                        }
                    </Accordion>
                )
            }
            <div className="form_controls">
                {
                    updateCTRL && data &&
                    <Button
                        className={updateCTRL.className}
                        data-cy={`${cy}form-action-update`}
                        label={updateCTRL.label}
                        onClick={this.onSubmit}
                        disabled={!isValid}
                    />
                }
                {
                    submitCTRL && !data &&
                    <Button
                        className={submitCTRL.className}
                        data-cy={`${cy}form-action-submit`}
                        label={submitCTRL.label}
                        onClick={this.onSubmit}
                        disabled={!isValid}
                    />
                }
                {
                    cancelCTRL &&
                    <Button
                        className={cancelCTRL.className}
                        data-cy={`${cy}form-action-cancel`}
                        label={cancelCTRL.label}
                        onClick={this.onCancel}
                    />
                }
            </div>
        </form>;
    }

    static propTypes = {
        className: PropTypes.string,
        cy: PropTypes.string,

        config: PropTypes.arrayOf(
            PropTypes.shape({
                className: PropTypes.string,
                title: PropTypes.string,
                isCollapsed: PropTypes.bool,
                items: PropTypes.arrayOf(
                    PropTypes.shape({
                        c: PropTypes.func.isRequired,
                        errors: PropTypes.array,
                    })
                ).isRequired,
            })
        ).isRequired,
        data: PropTypes.object,
        isValid: PropTypes.bool,

        updateCTRL: PropTypes.shape({
            className: PropTypes.string,
            label: PropTypes.string,
        }),
        submitCTRL: PropTypes.shape({
            className: PropTypes.string,
            label: PropTypes.string,
        }),
        cancelCTRL: PropTypes.shape({
            className: PropTypes.string,
            label: PropTypes.string,
        }),

        onMount: PropTypes.func,
        onError: PropTypes.func,
        onSuccess: PropTypes.func,

        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,

        validate: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        cy: '',
    }
}
