import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../component/form/accordion';
import Button from '../component/button';

export default class FormHandler extends PureComponent {
    constructor({ config, data }) {
        super();

        this.state = {
            config,
            data,
        }

        this.onMount = this.onMount.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.onCollapse = this.onCollapse.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onMount() {
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
        e.stopPropogation();

        this.props.onSubmit && this.props.onSubmit(this.props, this.state, this.onSuccess, this.onError);
    }

    onCollapse({ target }) {
        const { config } = this.state;

        const section = target.getAttribute('data-section');

        config[section].isCollapsed = !config[section].isCollapsed;

        this.setState({ config: [...config] });
    }

    onChange({ target }) {
        const { config } = this.state;
        const { validationEngine, onChange } = this.props;

        const section = target.getAttribute('data-section');
        const field = target.getAttribute('data-field');

        config[section].items[field].value = target.value;

        validationEngine && validationEngine(config, [{ section, field }]);

        this.setState({ config: [...config] })

        onChange && onChange(this.props, this.state);
    }

    render() {
        const { config, data } = this.state;
        const { cy, className, title, submitCTRL, updateCTRL, cancelCTRL, onCancel } = this.props;

        return <form className={`form ${className}`}>
            {title && <h1 className="form_title" data-cy={`${cy}form-title`}>{title}</h1>}
            {
                config.map(({ className, title, isCollapsed, items }, i) =>
                    <Accordion
                        className={className}
                        title={title}
                        onCollapse={this.onCollapse}
                        isCollapsed={isCollapsed}
                        data-cy={`${cy}section-${i}`}
                        data-section={i}
                        key={i}
                    >
                        {
                            items.map(({ c: Component, ...props }, j) =>
                                <Component {...props} data-cy={`${cy}section-${i}-input-${j}`} data-section={i} data-field={j} key={j} />
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
                    />
                }
                {
                    submitCTRL && !data &&
                    <Button
                        className={submitCTRL.className}
                        data-cy={`${cy}form-action-submit`}
                        label={submitCTRL.label}
                        onClick={this.onSubmit}
                    />
                }
                {
                    cancelCTRL &&
                    <Button
                        className={cancelCTRL.className}
                        data-cy={`${cy}form-action-cancel`}
                        label={cancelCTRL.label}
                        onClick={onCancel}
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
                        c: PropTypes.func,
                    })
                ).isRequired,
            })
        ).isRequired,

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

        onCollapse: PropTypes.func,
        onChange: PropTypes.func,

        validationEngine: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        cy: '',
    }
}
