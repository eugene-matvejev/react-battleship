import React from "react";

export default class AbstractComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            attributes: {}
        }
    }

    /**
     * @param attribute
     * @param value
     */
    setAttribute(attribute, value) {
        this.setState(state => state.attributes[attribute] = value);
    }

    getAttribute(attribute) {
        return this.state.attributes[attribute] || undefined;
    }

    getAttributes() {
        return this.state.attributes;
    }

    getData() {
        return this.state.data;
    }
}