class SegmentTree {
    leftIndex: number;
    rightIndex: number;
    sum: number;
    left: SegmentTree | null;
    right: SegmentTree | null;

    constructor(leftIndex: number, rightIndex: number, sum: number) {
        this.leftIndex = leftIndex;
        this.rightIndex = rightIndex;
        this.sum = sum;

        this.left = null;
        this.right = null;
    }

    update(index: number, value: number) {
        if (this.leftIndex === this.rightIndex) {
            this.sum = value;
            return;
        }

        const mid = (this.leftIndex + this.rightIndex) >> 1;
        if (index <= mid) {
            this.left.update(index, value);
        } else {
            this.right.update(index, value);
        }

        this.sum = this.left.sum + this.right.sum;
    }

    queryRange(leftIndex: number, rightIndex: number) {
        if (this.leftIndex === leftIndex && this.rightIndex === rightIndex) {
            return this.sum;
        }

        const mid = (this.leftIndex + this.rightIndex) >> 1;
        if (leftIndex > mid) {
            return this.right.queryRange(leftIndex, rightIndex);
        } else if (rightIndex <= mid){
            return this.left.queryRange(leftIndex, rightIndex);
        }

        return this.left.queryRange(leftIndex, mid) + this.right.queryRange(mid + 1, rightIndex);
    }
}

function build(values: number[], leftIndex: number, rightIndex: number) {
    if (leftIndex === rightIndex) {
        return new SegmentTree(leftIndex, rightIndex, values[leftIndex]);
    }

    const root = new SegmentTree(leftIndex, rightIndex, 0);
    const mid = (leftIndex + rightIndex) >> 1;

    root.left = build(values, leftIndex, mid);
    root.right = build(values, mid + 1, rightIndex);
    root.sum = root.left.sum + root.right.sum;

    return root;
}

class NumArray {
    root: SegmentTree;

    constructor(nums: number[]) {
        this.root = build(nums, 0, nums.length - 1);
    }

    update(index: number, val: number): void {
        this.root.update(index, val);
    }

    sumRange(left: number, right: number): number {
        return this.root.queryRange(left, right);
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
