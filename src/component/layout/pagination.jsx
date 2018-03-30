import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({className, current, total, onClickCallback}) => {
    const hasPrevPage = current - 1 >= 1;
    const hasNextPage = current + 1 <= total;
    const nextPage = hasNextPage ? current + 1 : false;
    const prevPage = hasPrevPage ? current - 1 : false;

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

    return <div className={`component pagination ${className}`}>
        <span className={`prev ${prevPage ? '' : 'inactive'}`} onClick={onPrevCallback}>{prevPage}</span>
        <span className={`current`}>{current}</span>
        <span className={`next ${nextPage ? '' : 'inactive'}`} onClick={onNextCallback}>{nextPage}</span>
        <span className={`total`}>{total}</span>
    </div>;
};

Pagination.propTypes = {
    onClickCallback: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    className: PropTypes.string,
};

Pagination.defaultProps = {
    className: '',
};

export default Pagination;
