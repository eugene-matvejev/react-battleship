import React from 'react';
import PropTypes from 'prop-types';
import '../../stylesheets/css/component/pagination.css';

const Pagination = ({className, currentPage, totalPages, onClickCallback}) => {
    const hasPrevPage = currentPage - 1 >= 1;
    const hasNextPage = currentPage + 1 <= totalPages;
    const nextPage = hasNextPage ? currentPage + 1 : false;
    const prevPage = hasPrevPage ? currentPage - 1 : false;

    const onPrevCallback = () => {
        if (!hasPrevPage) {
            return;
        }

        onClickCallback(prevPage);
    };

    const onNextCallback = () => {
        if (!hasNextPage) {
            return;
        }

        onClickCallback(nextPage);
    };

    return (
        <div className={`component pagination ${className}`}>
            <span className={`prev ${prevPage ? '' : 'inactive'}`} onClick={onPrevCallback}>{prevPage}</span>
            <span className={`current`}>{currentPage}</span>
            <span className={`next ${nextPage ? '' : 'inactive'}`} onClick={onNextCallback}>{nextPage}</span>
            <span className={`total`}>{totalPages}</span>
        </div>
    );
};

Pagination.propTypes = {
    className: PropTypes.string,
    onClickCallback: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    className: '',
};

export default Pagination;
