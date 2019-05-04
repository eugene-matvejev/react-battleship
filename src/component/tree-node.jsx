import React from 'react';
import PropTypes from 'prop-types';

const TreeNode = ({ className, 'data-cy': cy, text, chunks, nodes, isExpanded }) =>
    <div className={`tree-node ${className}`} data-cy={cy}>
        {
            !!chunks && !!chunks.length
                ? chunks.map(({ isMatch, v }, i) =>
                    <span key={i} className={isMatch ? 'tree-node_pattern' : null}>{v}</span>
                )
                : <span>{text}</span>
        }
        {
            nodes
            && nodes.map((v, i) =>
                // !!v.isExpanded
                // && <TreeNode
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
    isExpanded: PropTypes.bool,
    text: PropTypes.string,
    chunks: PropTypes.arrayOf(
        PropTypes.shape({
            v: PropTypes.string.isRequired,
            isMatch: PropTypes.bool,
        })
    ),
    nodes: PropTypes.arrayOf(PropTypes.object),
};
TreeNode.defaultProps = {
    'data-cy': '',
    className: '',
    patternClassName: 'tree-node_pattern',
};

export default TreeNode;
