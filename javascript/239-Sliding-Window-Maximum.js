/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function Node(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
}

function Deque() {
    this.left = null;
    this.right = null;
    this.size = 0;
    this.pushRight = function (value) {
        const node = new Node(value);
        if (this.size == 0) {
            this.left = node;
            this.right = node;
        } else {
            this.right.next = node;
            node.prev = this.right;
            this.right = node;
        }
        this.size++;
        return this.size;
    };
    this.popRight = function () {
        if (this.size == 0) return null;
        const removedNode = this.right;
        this.right = this.right.prev;
        if (this.right) this.right.next = null;
        this.size--;
        return removedNode;
    };
    this.pushLeft = function (value) {
        const node = new Node(value);
        if (this.size == 0) {
            this.left = node;
            this.right = node;
        } else {
            this.left.prev = node;
            node.next = this.left;
            this.left = node;
        }
        this.size++;
        return this.size;
    };
    this.popLeft = function () {
        if (this.size == 0) return null;
        const removedNode = this.left;
        this.left = this.left.next;
        if (this.left) this.left.prev = null;
        this.size--;
        return removedNode;
    };
}

var maxSlidingWindow = function (nums, k) {
    const output = [];
    let deque = new Deque();
    let left = 0;
    let right = 0;

    while (right < nums.length) {
        // pop smaller values from q
        while (deque.right && nums[deque.right.value] < nums[right])
            deque.popRight();
        deque.pushRight(right);

        // remove left val from window
        if (left > deque.left.value) deque.popLeft();

        if (right + 1 >= k) {
            output.push(nums[deque.left.value]);
            left++;
        }
        right++;
    }
    return output;
};
