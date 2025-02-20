/**
 * You are given the root of a binary tree. Return only the values of the nodes that are visible from the right side of
 * the tree, ordered from top to bottom.
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    return TreeNode;
}());
var rightSideView = function (root) {
    var queue = [];
    if (root) {
        queue.push(root);
    }
    var levels = new Map();
    var currentLevel = 1;
    while (queue.length) {
        var _root = queue.shift();
        var vals = levels.get(currentLevel) || [];
        vals.push(_root.val);
        levels.set(currentLevel, vals);
        if (_root === null || _root === void 0 ? void 0 : _root.right) {
            queue.push(_root.right);
        }
        if (_root === null || _root === void 0 ? void 0 : _root.left) {
            queue.push(_root.left);
        }
        currentLevel++;
    }
    // Now for every level, select the first index.
    var levelOrderTraversalArray = [];
    for (var _i = 0, _a = Object.values(levels); _i < _a.length; _i++) {
        var n = _a[_i];
        levelOrderTraversalArray.push(n[0]);
    }
    return levelOrderTraversalArray;
};
