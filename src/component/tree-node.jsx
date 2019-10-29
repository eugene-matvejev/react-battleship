import React from 'react';
import PropTypes from 'prop-types';

const TreeNode = ({ className, 'data-cy': cy, 'data-node': node, text, chunks, nodes, isExpanded }) =>
    <div
        className={`tree-node${nodes ? `--with-children${isExpanded ? '-expanded' : ''}` : ''} ${className}`}
        data-cy={cy}
        data-node={!!nodes ? node : 0}
    >
        {
            !!chunks
                ? chunks.map(({ isMatch, v }, i) => <span key={i} className={isMatch ? 'tree-node--pattern-match' : null}>{v}</span>)
                : <span>{text}</span>
        }
        {
            isExpanded &&
            nodes &&
            nodes.map((v, i) =>
                v.isVisible &&
                <TreeNode
                    {...v}
                    key={i}
                    data-cy={`${cy}-${i}`}
                    data-node={`${node}-${i}`}
                />
            )
        }
    </div>;

TreeNode.propTypes = {
    'data-cy': PropTypes.string,
    'date-node': PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    chunks: PropTypes.arrayOf(
        PropTypes.shape({
            v: PropTypes.string.isRequired,
            isMatch: PropTypes.bool,
        })
    ),
    isExpanded: PropTypes.bool,
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            isVisible: PropTypes.bool,
        })
    ),
};
TreeNode.defaultProps = {
    'data-cy': '',
    className: '',
};

export default TreeNode;
