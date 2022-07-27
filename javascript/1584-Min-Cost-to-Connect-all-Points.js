
// Min Heap Implementation

class MinHeap {
    constructor(nums) {
        this.data = [];
        for (let i = 0; i < nums.length; i++) {
            this.add(nums[i]);
        }
    }

    getParentIndex = (i) => Math.floor((i - 1) / 2);

    getLeftChildIndex = (i) => (i * 2) + 1;

    getRightChildIndex = (i) => (i * 2) + 2;

    swap = (i1, i2) => {
        const tmp = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = tmp;
    };

    add = (e) => {
        this.data[this.data.length] = e;
        this.heapify(this.data.length - 1);
        return this.data[0];
    };

    heapify = (curIndex) => {
        if (this.data[this.getParentIndex(curIndex)] !== undefined
            && this.data[curIndex][0] < this.data[this.getParentIndex(curIndex)][0]) {
            this.swap(curIndex, this.getParentIndex(curIndex));
            this.heapify(this.getParentIndex(curIndex));
        }
    };

    pop = () => {
        const firstElement = this.data[0];
        if (this.data.length > 1) {
            // replace it with the last element in heap
            this.data[0] = this.data[this.data.length - 1];
            // remove last elem
            this.data.pop();
            this.heapifyDown();
        }

        return firstElement;
    };

    heapifyDown = () => {
        let cur = 0;

        while (this.data[this.getLeftChildIndex(cur)] !== undefined) {
            // get the smallest child (right or left)
            let smallChildInd = this.getLeftChildIndex(cur);
            if (
                this.data[this.getRightChildIndex(cur)] !== undefined
                && this.data[this.getRightChildIndex(cur)][0] < this.data[this.getLeftChildIndex(cur)][0]
            ) {
                smallChildInd = this.getRightChildIndex(cur);
            }
            // if one child (r or l) is less than curr we swap
            if (this.data[smallChildInd][0] < this.data[cur][0]) {
                this.swap(cur, smallChildInd);
            }
            cur = smallChildInd;
        }
    };
}

const minCostConnectPoints = function (points) {
    const n = points.length;
    let finalCost = 0;

    if (n > 1 && n <= 1000) {
        let x1, x2;
        let y1, y2;
        let dist;

        const adjList = new Map();
        // prepare adjacent list (each node has cost to every other node)
        for (let i = 0; i < n - 1; i++) {
            [x1, y1] = points[i];

            for (let j = i + 1; j < n; j++) {
                [x2, y2] = points[j];
                dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                adjList.get(i) ? adjList.get(i).push([dist, j]) : adjList.set(i, [[dist, j]]);
                adjList.get(j) ? adjList.get(j).push([dist, i]) : adjList.set(j, [[dist, i]]);
            }
        }

        // prim's algorithm
        const visited = new Set();
        const minHeap = new MinHeap([[0, 0]]); // [cost,point]
        // we gonna visit each node
        while (visited.size < n) {
            let partialCost = 0, i = 0;

            // get the least cost & its correspondent node
            [partialCost, i] = minHeap.pop();

            // if the node hasn't been visited
            if (!visited.has(i)) {
                finalCost += partialCost;
                visited.add(i);
                for (const neighbourWithCost of adjList.get(i)) {
                    if (!visited.has(neighbourWithCost[1])) {
                        minHeap.add(neighbourWithCost);
                    }
                }
            }
        }
    }
    return finalCost;
};
