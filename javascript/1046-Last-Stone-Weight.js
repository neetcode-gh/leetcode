class Heap {
    constructor(stones){
        this.heap = stones
        this.size = stones.length
        this.heapify(0)
    }
    right(pos) {
        return 2*pos + 2
    }
    left(pos) {
        return 2*pos + 1
    }
    isleaf(pos) {
        if (2*pos + 1 >= this.size) return true
        return false
    }
    swap(a,b){
        let temp = this.heap[a]
        this.heap[a] = this.heap[b]
        this.heap[b] = temp
    }
    fix(pos){
        if (this.isleaf(pos)) return
        let left = this.left(pos)
        let right = this.right(pos)
        let bigger = left
        if (right < this.size) bigger = this.heap[left] > this.heap[right] ? left : right
        if (this.heap[pos] < this.heap[bigger]) {
            this.swap(pos,bigger)
            this.fix(bigger)
        }
    }
    heapify(pos){
        if (this.isleaf(pos)) return
        this.heapify(this.left(pos))
        this.heapify(this.right(pos))
        this.fix(pos)
    }
    delete(){
        this.swap(0, --this.size)
        this.fix(0)
        return this.heap[0]
    }
    insert(val){
        this.size++
        this.heap[this.size-1] = val
        this.heapify(0)
    }
    peek(){
        return this.heap[0]
    }
}
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    //use a max heap to pop off the top 2 stones at each time
    //if result is 0 we can do nothing
    //if the result is a new weight we can push it back to the heap
    const heap = new Heap(stones)
    while(heap.size > 1) {
        let x = heap.peek()
        heap.delete()
        let y = heap.peek()
        heap.delete()
        const res = x-y
        if (res > 0) heap.insert(res)
    }
    if (heap.size) return heap.peek()
    return 0
};
