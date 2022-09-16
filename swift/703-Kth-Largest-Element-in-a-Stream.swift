// Heap source code at: https://gist.github.com/kalub92/d269ba6b2bf05ca7dcbaae64b4ff7a2d
struct MinHeap {
    var items: [Int] = []

    //Get Index
    private func getLeftChildIndex(_ parentIndex: Int) -> Int {
        return 2 * parentIndex + 1
    }
    private func getRightChildIndex(_ parentIndex: Int) -> Int {
        return 2 * parentIndex + 2
    }
    private func getParentIndex(_ childIndex: Int) -> Int {
        return (childIndex - 1) / 2
    }

    // Boolean Check
    private func hasLeftChild(_ index: Int) -> Bool {
        return getLeftChildIndex(index) < items.count
    }
    private func hasRightChild(_ index: Int) -> Bool {
        return getRightChildIndex(index) < items.count
    }
    private func hasParent(_ index: Int) -> Bool {
        return getParentIndex(index) >= 0
    }

    // Return Item From Heap
    private func leftChild(_ index: Int) -> Int {
        return items[getLeftChildIndex(index)]
    }
    private func rightChild(_ index: Int) -> Int {
        return items[getRightChildIndex(index)]
    }
    private func parent(_ index: Int) -> Int {
        return items[getParentIndex(index)]
    }

    // Heap Operations
    mutating private func swap(indexOne: Int, indexTwo: Int) {
        let placeholder = items[indexOne]
        items[indexOne] = items[indexTwo]
        items[indexTwo] = placeholder
    }

    public func peek() -> Int {
        if items.count != 0 {
            return items[0]
        } else {
            fatalError()
        }
    }

    mutating public func poll() -> Int {
        if items.count != 0 {
            let item = items[0]
            items[0] = items[items.count - 1]
            heapifyDown()
            items.removeLast()
            return item
        } else {
            fatalError()
        }
    }

    mutating public func add(_ item: Int) {
        items.append(item)
        heapifyUp()
    }

    mutating private func heapifyUp() {
        var index = items.count - 1
        while hasParent(index) && parent(index) > items[index] {
            swap(indexOne: getParentIndex(index), indexTwo: index)
            index = getParentIndex(index)
        }
    }

    mutating private func heapifyDown() {
        var index = 0
        while hasLeftChild(index) {
        var smallerChildIndex = getLeftChildIndex(index)
        if hasRightChild(index) && 
            rightChild(index) < leftChild(index) {
            smallerChildIndex = getRightChildIndex(index)
        }

        if items[index] < items[smallerChildIndex] {
            break
        } else {
            swap(indexOne: index, indexTwo: smallerChildIndex)
        }

          index = smallerChildIndex
        }
    }
}

// Extensions to add for the required problem
extension MinHeap {
    var size: Int { items.count }
}

class KthLargest {
    var minHeap = MinHeap()
    var capacity = 0
        
    init(_ k: Int, _ nums: [Int]) {
        self.capacity = k
        nums.forEach { add($0) }
    }
    
    func add(_ val: Int) -> Int {
        if minHeap.size >= capacity {
            if val > minHeap.peek() {  
                minHeap.poll()
                minHeap.add(val)
            }
        } else {
            minHeap.add(val)
        }
        return minHeap.peek()
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * let obj = KthLargest(k, nums)
 * let ret_1: Int = obj.add(val)
 */