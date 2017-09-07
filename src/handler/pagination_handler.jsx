import React from "react";
import PropTypes from "prop-types";

const PaginationHandler = () => {
    const currentPage = this.props.currentPage;
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    const hasPrevPage = this.props.hasPrevPage;
    const hasNextPage = this.props.hasNextPage;

    const onNextCallback = () => {
        if (!hasNextPage) {
            return;
        }

        this.props.onNext(nextPage);
    };

    const onPrevCallback = () => {
        if (!hasPrevPage) {
            return;
        }

        this.props.onPrev(prevPage);
    };

    return (
        <div className={`handler pagination ${this.props.className}`}>
            <span className={`${hasPrevPage ? '' : 'inactive'}`} onClick={onPrevCallback().bind(this)}>{hasPrevPage ? prevPage : ''}</span>
            <span>{currentPage}</span>
            <span className={`${hasNextPage ? '' : 'inactive'}`} onClick={onNextCallback().bind(this)}>{hasNextPage ? nextPage : ''}</span>
            <span/>
            <span>{this.props.totalPages}</span>
        </div>
    );
};

PaginationHandler.defaultProps = {
    className: '',
    hasPrevPage: false,
    hasNextPage: false,
    onPrev: () => {},
    onNext: () => {},
};

PaginationHandler.PropTypes = {
    className: PropTypes.string,
    hasPrevPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default PaginationHandler;