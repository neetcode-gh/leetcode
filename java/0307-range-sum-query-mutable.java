class NumArray {
    public int n;
    public int[] tree;

    public NumArray(int[] nums) {
        this.n = nums.length;
        this.tree = new int[2 * this.n];
        buildTree(nums);
    }

    // O(n)
    private void buildTree(int[] nums) {
        // we build the tree from bottom up
        for (int i = n, j = 0; i < 2 * this.n; i++, j++) {
            this.tree[i] = nums[j];
        }
        for (int i = this.n-1; i > 0; i--) {
            this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1]; // parent value is sum of children values
        }
    }

    // O(logn)
    public void update(int index, int val) {
        index += this.n;
        this.tree[index] = val;
        while (index > 0) {
            int left = index;
            int right = index;
            if ((index % 2 == 0)) {
                // we are on the left node of parent
                right = index + 1;
            } else {
                // we are on the right node of the parent
                left = index -1;
            }
            this.tree[index / 2] = this.tree[right] + this.tree[left]; // parent is updated
            index /= 2;
        }
    }

    // O(logn)
    public int sumRange(int left, int right) {
        int l = left + this.n;
        int r = right + this.n;
        int sum = 0;
        
        while (l <= r) {
            if ((l % 2) == 1) {
                // l is the right child of his parent,
                // parent includes the sum of l and the right node which is not
                // in the query sum, so we just include this.tree[l] in the sum
                sum += this.tree[l];
                l++; // shrink interval
            }
            if ((r % 2) == 0) {
                // r is the left child of his parent,
                // parent includes the sum of r and the left node which is not
                // in the query sum, so we just include this.tree[r] in the sum
                sum += this.tree[r];
                r--; // shrink interval
            }
            l /= 2;
            r /= 2;
        }
        return sum;
    }
}