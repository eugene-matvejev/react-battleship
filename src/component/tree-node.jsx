import React from 'react';
import PropTypes from 'prop-types';

const TreeNode = ({ className, 'data-cy': cy, text, chunks, nodes, isExpanded }) =>
    <div className={`tree-node ${className}`} data-cy={cy}>
        {
            !!chunks
                ? chunks.map(({ isMatch, v }, i) =>
                    <span key={i} className={isMatch ? 'tree-node--matched' : null}>{v}</span>
                )
                : <span>{text}</span>
        }
        {
            isExpanded
            && nodes
            && nodes.map((v, i) =>
                <TreeNode
                    {...v}
                    key={i}
                    data-cy={`${cy}-${i}`}
                />
            )
        }
    </div>;

TreeNode.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    chunks: PropTypes.arrayOf(
        PropTypes.shape({
            v: PropTypes.string.isRequired,
            isMatch: PropTypes.bool,
        })
    ),
    text: PropTypes.string,
    isExpanded: PropTypes.bool,
    nodes: PropTypes.arrayOf(PropTypes.object),
};
TreeNode.defaultProps = {
    'data-cy': '',
    className: '',
};

export default TreeNode;
