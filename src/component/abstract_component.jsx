import React from "react";

export default class AbstractComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            model: {},
            attributes: {}
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    /**
     * @param {string} attribute
     * @param {any}    value
     */
    setAttribute(attribute, value) {
        this.setState(state => state.attributes[attribute] = value);
    }

    /**
     * @param {string} attribute
     *
     * @returns {*|undefined}
     */
    getAttribute(attribute) {
        return this.state.attributes[attribute] || undefined;
    }

    /**
     * @returns {object}
     */
    getAttributes() {
        return this.state.attributes;
    }

    /**
     * @param {object} attributes
     */
    setAttributes(attributes) {
        this.setState({ attributes: attributes });
    }

    /**
     * @returns {object}
     */
    getData() {
        return this.state.data;
    }

    /**
     * @param {object} data
     */
    setData(data) {
        this.setState({ data: data });
    }
}
