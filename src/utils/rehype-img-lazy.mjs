import { visit } from 'unist-util-visit';

export default function rehypeImgLazy() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'img') {
                node.properties = node.properties || {};
                if (!node.properties.loading) {
                    node.properties.loading = 'lazy';
                }
                if (!node.properties.decoding) {
                    node.properties.decoding = 'async';
                }
            }
        });
    };
} 