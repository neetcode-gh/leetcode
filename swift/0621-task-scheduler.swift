class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var tasksFrequency = [Character: Int]()
        for task in tasks {
            tasksFrequency[task, default: 0] += 1
        }
        var tasks = tasksFrequency.keys.map { $0 }
        var heap = Heap<Character>(elements: tasks) { task1, task2 in 
            return tasksFrequency[task1]! == tasksFrequency[task2]! ? 
            task1 < task2 : tasksFrequency[task1]! > tasksFrequency[task2]!
        }
        var totalTimeTaken = 0
        while !heap.isEmpty {
            let blockSize = n + 1
            var filledSlots = 0
            var pendingTasks = [Character]()
            // simulate filling the block.
            while(!heap.isEmpty && filledSlots < blockSize) {
                let mostRepeatedTask = heap.remove()
                tasksFrequency[mostRepeatedTask]! -= 1
                filledSlots += 1
                totalTimeTaken += 1
                if tasksFrequency[mostRepeatedTask]! > 0 {
                    pendingTasks.append(mostRepeatedTask)
                }
            }
            for task in pendingTasks {
                heap.add(task)
            }
            if !heap.isEmpty {
                let unfilledSlots = blockSize - filledSlots
                // if there are not enough unique tasks, for a blockSize, 
                // it means that the unfilled slots are idle slots and accounts 
                // for CPU total time taken
                if unfilledSlots > 0 {
                    totalTimeTaken += unfilledSlots
                }
            }
        }

        return totalTimeTaken
    }
}

struct Heap<Element> {
    private let comparator: (Element, Element) -> Bool
    private var elements: [Element] = []
    
    var isEmpty: Bool {
        elements.isEmpty
    }
    
    var size: Int {
        elements.count
    }
    
    init(elements: [Element], comparator: @escaping (Element, Element) -> Bool) {
        self.comparator = comparator
        for element in elements {
            add(element)
        }
    }
    
    mutating func add(_ element: Element) -> Void {
        elements.append(element)
        adjustFromBottom()
    }
    
    mutating func remove() -> Element {
        guard !elements.isEmpty else {
            fatalError("Attempted remove operation when heap is empty")
        }
        let topElement = elements[0]
        if elements.count == 1 {
            return elements.removeLast()
        }
        adjustFromTop()
        return topElement
    }
    
    mutating private func adjustFromBottom() {
        var fromIndex = elements.count - 1
        while true {
            let parentIndex = (fromIndex - 1) / 2
            if parentIndex >= 0 && parentIndex != fromIndex && 
            !comparator(elements[parentIndex], elements[fromIndex]) {
                elements.swapAt(fromIndex, parentIndex)
                fromIndex = parentIndex
            }
            else {
                break
            }
        }
    }
    
    mutating private func adjustFromTop() {
        elements[0] = elements.removeLast()
        var rootIndex = 0
        while true {
            var fromIndex = rootIndex
            let leftChild = 2 * rootIndex + 1
            let rightChild = 2 * rootIndex + 2
            
            if leftChild < elements.count &&
               !comparator(elements[fromIndex], elements[leftChild]) {
                fromIndex = leftChild
            }
            
            if rightChild < elements.count &&
               !comparator(elements[fromIndex], elements[rightChild]) {
                fromIndex = rightChild
            }
            
            if fromIndex == rootIndex {
                break
            }
            elements.swapAt(rootIndex, fromIndex)
            rootIndex = fromIndex
        }
    }
    
    var peek: Element? {
        elements.first
    }
}