
/**
 * Stack
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/simplify-path
 * @param {string} path
 * @return {string}
 */
var simplifyPath = (path, slash = '/', stack = []) => {    
    const paths = path.split(slash).filter(Boolean);

    for (const _path of paths) traversePath(_path, stack);

    return `${slash}${stack.join(slash)}`;
};

const traversePath = (path, stack) => {
    if (canPush(path)) return stack.push(path);

    if (canPop(path, stack)) stack.pop();
};

const canPush = (path) => !(
    isCurrentDirectory(path) ||
    isParentDirectory(path)
);

const canPop = (path, stack) =>
    isParentDirectory(path) &&
    !isEmpty(stack);

const isCurrentDirectory = (path) => (path === '.');

const isParentDirectory = (path) => (path === '..');

const isEmpty = ({ length }) => (0 === length);
