import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/css/pagination.css";

const PaginationHandler = (props) => {
    const currentPage = props.currentPage;
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    const hasPrevPage = props.hasPrevPage;
    const hasNextPage = props.hasNextPage;

    const onPrevCallback = () => {
        if (!hasPrevPage) {
            return;
        }

        props.pageChangeCallback(prevPage);
    };

    const onNextCallback = () => {
        if (!hasNextPage) {
            return;
        }

        props.pageChangeCallback(nextPage);
    };

    return (
        <div className={`component pagination ${props.className}`}>
            <span className={`prev ${hasPrevPage ? '' : 'inactive'}`} onClick={onPrevCallback}>{hasPrevPage ? prevPage : ''}</span>
            <span>{currentPage}</span>
            <span className={`next ${hasNextPage ? '' : 'inactive'}`} onClick={onNextCallback}>{hasNextPage ? nextPage : ''}</span>
            <span/>
            <span>{props.totalPages}</span>
        </div>
    );
};

PaginationHandler.defaultProps = {
    className: '',
    hasPrevPage: true,
    hasNextPage: true,
    pageChangeCallback: () => {},
};

PaginationHandler.PropTypes = {
    className: PropTypes.string,
    hasPrevPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    pageChangeCallback: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default PaginationHandler;
