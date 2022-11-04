function simplifyPath(path: string): string {
    const stack: string[] = [];
    let cur = '';

    for (const c of path + '/') {
        if (c === '/') {
            if (cur === '..') {
                if (stack.length > 0) {
                    stack.pop();
                }
            } else if (cur != '' && cur != '.') {
                stack.push(cur);
            }
            cur = '';
        } else {
            cur += c;
        }
    }

    return '/' + stack.join('/');
}
