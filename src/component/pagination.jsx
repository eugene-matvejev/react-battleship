import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/css/pagination.css";

const Pagination = (props) => {
    const currentPage = props.currentPage;
    const hasPrevPage = currentPage - 1 >= 1;
    const hasNextPage = currentPage + 1 <= props.totalPages;
    const nextPage = hasNextPage ? currentPage + 1 : false;
    const prevPage = hasPrevPage ? currentPage - 1 : false;

    const onPrevCallback = () => {
        if (!hasPrevPage) {
            return;
        }

        props.onClickCallback(prevPage);
    };

    const onNextCallback = () => {
        if (!hasNextPage) {
            return;
        }

        props.onClickCallback(nextPage);
    };

    return (
        <div className={`component pagination ${props.className}`}>
            <span className={`prev ${prevPage ? '' : 'inactive'}`} onClick={onPrevCallback}>{prevPage}</span>
            <span className={`current`}>{currentPage}</span>
            <span className={`next ${nextPage ? '' : 'inactive'}`} onClick={onNextCallback}>{nextPage}</span>
            <span className={`total`}>{props.totalPages}</span>
        </div>
    );
};

Pagination.propTypes = {
    className: PropTypes.string,
    onClickCallback: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    className: '',
    onClickCallback: () => {},
};

export default Pagination;
