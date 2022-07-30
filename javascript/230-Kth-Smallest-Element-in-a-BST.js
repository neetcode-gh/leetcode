function kthSmallest(root, k) {
    let n = 0;
    const stack = [];
    let cur = root;

    while (cur || stack) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }

        cur = stack.pop();
        n += 1;

        if (n == k) {
            return cur.val;
        }

        cur = cur?.right;
    }
}
