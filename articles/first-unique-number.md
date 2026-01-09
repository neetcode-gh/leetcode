## 1. Brute Force

### Intuition

The straightforward approach stores all numbers in a queue. When asked for the first unique number, we scan through the queue and count occurrences of each element. The first element with count 1 is our answer.

### Algorithm

1. **Constructor**: Store all initial numbers in a queue.
2. **add(value)**: Append the value to the queue.
3. **showFirstUnique()**: Iterate through the queue. For each element, count how many times it appears in the entire queue. Return the first element with count equal to 1, or `-1` if none exists.

::tabs-start

```python
class FirstUnique:
    def __init__(self, nums: List[int]):
        self._queue = deque(nums)

    def showFirstUnique(self):
        for item in self._queue:
            if self._queue.count(item) == 1:
                return item
        return -1

    def add(self, value):
        self._queue.append(value)
```

```java
class FirstUnique {

    private Queue<Integer> queue = new ArrayDeque<>();
    
    public FirstUnique(int[] nums) {
        for (int num : nums) {
            queue.add(num);
        }
    }
        
    public int showFirstUnique() {
        for (int num : queue) {
            int count = Collections.frequency(queue, num);
            if (count == 1) {
                return num;
            }
        }
        return -1;
    }
        
    public void add(int value) {
        queue.add(value);    
    }
}
```

```cpp
class FirstUnique {
private:
    queue<int> q;
    
public:
    FirstUnique(vector<int>& nums) {
        for (int num : nums) {
            q.push(num);
        }
    }
    
    int showFirstUnique() {
        queue<int> temp = q;
        while (!temp.empty()) {
            int num = temp.front();
            temp.pop();
            
            int count = 0;
            queue<int> countTemp = q;
            while (!countTemp.empty()) {
                if (countTemp.front() == num) count++;
                countTemp.pop();
            }
            
            if (count == 1) {
                return num;
            }
        }
        return -1;
    }
    
    void add(int value) {
        q.push(value);
    }
};
```

```javascript
class FirstUnique {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this._queue = nums.slice();
    }
    /**
     * @return {number}
     */
    showFirstUnique() {
        for (let item of this._queue) {
            let count = 0;
            for (let el of this._queue) {
                if (el === item) count++;
            }
            if (count === 1) {
                return item;
            }
        }
        return -1;
    }
    /**
     * @param {number} value
     * @return {void}
     */
    add(value) {
        this._queue.push(value);
    }
}
```

```csharp
public class FirstUnique {

    private Queue<int> queue = new Queue<int>();

    public FirstUnique(int[] nums) {
        foreach (int num in nums) {
            queue.Enqueue(num);
        }
    }

    public int ShowFirstUnique() {
        foreach (int num in queue) {
            int count = 0;
            foreach (int el in queue) {
                if (el == num) count++;
            }
            if (count == 1) {
                return num;
            }
        }
        return -1;
    }

    public void Add(int value) {
        queue.Enqueue(value);
    }
}
```

```go
type FirstUnique struct {
    queue []int
}

func Constructor(nums []int) FirstUnique {
    queue := make([]int, len(nums))
    copy(queue, nums)
    return FirstUnique{queue: queue}
}

func (this *FirstUnique) ShowFirstUnique() int {
    for _, item := range this.queue {
        count := 0
        for _, el := range this.queue {
            if el == item {
                count++
            }
        }
        if count == 1 {
            return item
        }
    }
    return -1
}

func (this *FirstUnique) Add(value int) {
    this.queue = append(this.queue, value)
}
```

```kotlin
class FirstUnique(nums: IntArray) {

    private val queue = ArrayDeque<Int>()

    init {
        for (num in nums) {
            queue.addLast(num)
        }
    }

    fun showFirstUnique(): Int {
        for (num in queue) {
            var count = 0
            for (el in queue) {
                if (el == num) count++
            }
            if (count == 1) {
                return num
            }
        }
        return -1
    }

    fun add(value: Int) {
        queue.addLast(value)
    }
}
```

```swift
class FirstUnique {

    private var queue: [Int]

    init(_ nums: [Int]) {
        queue = nums
    }

    func showFirstUnique() -> Int {
        for item in queue {
            var count = 0
            for el in queue {
                if el == item {
                    count += 1
                }
            }
            if count == 1 {
                return item
            }
        }
        return -1
    }

    func add(_ value: Int) {
        queue.append(value)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - **constructor**: $O(K)$

    - **add()**: $O(1)$

    - **showFirstUnique()**: $O(N^2)$

- Space complexity: $O(N)$

>  Where $K$ is the length of the initial array passed into the constructor and $N$ is the total number of items added into the queue so far (including those from the constructor).

---

## 2. Queue and HashMap of Unique-Status

### Intuition

We can speed up uniqueness checks by maintaining a hash map that tracks whether each number is unique. The queue preserves insertion order. When showing the first unique, we pop non-unique elements from the front of the queue until we find a unique one or the queue is empty.

### Algorithm

1. **Constructor**: For each number in the initial array, call `add()`.
2. **add(value)**:
   - If the value is new, mark it as unique in the hash map and add to the queue.
   - If it already exists, mark it as non-unique in the hash map.
3. **showFirstUnique()**:
   - Remove elements from the front of the queue while they are marked as non-unique.
   - Return the front element if the queue is non-empty, otherwise return `-1`.

::tabs-start

```python
class FirstUnique:
    
    def __init__(self, nums: List[int]):
        self._queue = deque(nums)
        self._is_unique = {}
        
        for num in nums:
            # Notice that we're calling the "add" method of FirstUnique; not of the queue. 
            self.add(num)
    

    def showFirstUnique(self) -> int:
        # We need to start by "cleaning" the queue of any non-uniques at the start.
        # Note that we know that if a value is in the queue, then it is also in
        # is_unique, as the implementation of add() guarantees this.
        while self._queue and not self._is_unique[self._queue[0]]:
            self._queue.popleft()
        
        # Check if there is still a value left in the queue. There might be no uniques.
        if self._queue:
            return self._queue[0]  # We don't want to actually *remove* the value.
        
        return -1
    

    def add(self, value: int) -> None:
        # Case 1: We need to add the number to the queue and mark it as unique. 
        if value not in self._is_unique:
            self._is_unique[value] = True
            self._queue.append(value)
        
        # Case 2 and 3: We need to mark the number as no longer unique.
        else:
            self._is_unique[value] = False

```

```java
class FirstUnique {

    private Queue<Integer> queue = new ArrayDeque<>();
    private Map<Integer, Boolean> isUnique = new HashMap<>();

    public FirstUnique(int[] nums) {
        for (int num : nums) {
            // Notice that we're calling the "add" method of FirstUnique; not of the queue. 
            this.add(num);
        }
    }

    public int showFirstUnique() {
        // We need to start by "cleaning" the queue of any non-uniques at the start.
        // Note that we know that if a value is in the queue, then it is also in
        // isUnique, as the implementation of add() guarantees this.
        while (!queue.isEmpty() && !isUnique.get(queue.peek())) {
            queue.remove();
        }

        // Check if there is still a value left in the queue. There might be no uniques.
        if (!queue.isEmpty()) {
            return queue.peek(); // We don't want to actually *remove* the value.
        }

        return -1;
    }

    public void add(int value) {
        // Case 1: We need to add the number to the queue and mark it as unique. 
        if (!isUnique.containsKey(value)) {
            isUnique.put(value, true);
            queue.add(value);

        // Case 2 and 3: We need to mark the number as no longer unique.
        } else {
            isUnique.put(value, false);
        }
    }
}
```

```cpp
class FirstUnique {
private:
    queue<int> q;
    unordered_map<int, bool> isUnique;
    
public:
    FirstUnique(vector<int>& nums) {
        for (int num : nums) {
            this->add(num);
        }
    }
    
    int showFirstUnique() {
        while (!q.empty() && !isUnique[q.front()]) {
            q.pop();
        }
        
        if (!q.empty()) {
            return q.front();
        }
        
        return -1;
    }
    
    void add(int value) {
        if (isUnique.find(value) == isUnique.end()) {
            isUnique[value] = true;
            q.push(value);
        } else {
            isUnique[value] = false;
        }
    }
};
```

```javascript
class FirstUnique {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this._queue = nums.slice();
        this._is_unique = {};

        for (let num of nums) {
            this.add(num);
        }
    }

    /**
     * @return {number}
     */
    showFirstUnique() {
        while (this._queue.length > 0 && !this._is_unique[this._queue[0]]) {
            this._queue.shift();
        }

        if (this._queue.length > 0) {
            return this._queue[0];
        }

        return -1;
    }

    /**
     * @param {number} value
     * @return {void}
     */
    add(value) {
        if (!(value in this._is_unique)) {
            this._is_unique[value] = true;
            this._queue.push(value);
        } else {
            this._is_unique[value] = false;
        }
    }
}
```

```csharp
public class FirstUnique {

    private Queue<int> queue = new Queue<int>();
    private Dictionary<int, bool> isUnique = new Dictionary<int, bool>();

    public FirstUnique(int[] nums) {
        foreach (int num in nums) {
            Add(num);
        }
    }

    public int ShowFirstUnique() {
        while (queue.Count > 0 && !isUnique[queue.Peek()]) {
            queue.Dequeue();
        }

        if (queue.Count > 0) {
            return queue.Peek();
        }

        return -1;
    }

    public void Add(int value) {
        if (!isUnique.ContainsKey(value)) {
            isUnique[value] = true;
            queue.Enqueue(value);
        } else {
            isUnique[value] = false;
        }
    }
}
```

```go
type FirstUnique struct {
    queue    []int
    isUnique map[int]bool
}

func Constructor(nums []int) FirstUnique {
    fu := FirstUnique{
        queue:    []int{},
        isUnique: make(map[int]bool),
    }
    for _, num := range nums {
        fu.Add(num)
    }
    return fu
}

func (this *FirstUnique) ShowFirstUnique() int {
    for len(this.queue) > 0 && !this.isUnique[this.queue[0]] {
        this.queue = this.queue[1:]
    }

    if len(this.queue) > 0 {
        return this.queue[0]
    }

    return -1
}

func (this *FirstUnique) Add(value int) {
    if _, exists := this.isUnique[value]; !exists {
        this.isUnique[value] = true
        this.queue = append(this.queue, value)
    } else {
        this.isUnique[value] = false
    }
}
```

```kotlin
class FirstUnique(nums: IntArray) {

    private val queue = ArrayDeque<Int>()
    private val isUnique = HashMap<Int, Boolean>()

    init {
        for (num in nums) {
            add(num)
        }
    }

    fun showFirstUnique(): Int {
        while (queue.isNotEmpty() && isUnique[queue.first()] == false) {
            queue.removeFirst()
        }

        if (queue.isNotEmpty()) {
            return queue.first()
        }

        return -1
    }

    fun add(value: Int) {
        if (value !in isUnique) {
            isUnique[value] = true
            queue.addLast(value)
        } else {
            isUnique[value] = false
        }
    }
}
```

```swift
class FirstUnique {

    private var queue: [Int]
    private var isUnique: [Int: Bool]

    init(_ nums: [Int]) {
        queue = []
        isUnique = [:]
        for num in nums {
            add(num)
        }
    }

    func showFirstUnique() -> Int {
        while !queue.isEmpty && isUnique[queue[0]] == false {
            queue.removeFirst()
        }

        if !queue.isEmpty {
            return queue[0]
        }

        return -1
    }

    func add(_ value: Int) {
        if isUnique[value] == nil {
            isUnique[value] = true
            queue.append(value)
        } else {
            isUnique[value] = false
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - **constructor**: $O(K)$

    - **add()**: $O(1)$

    - **showFirstUnique()**: $O(1)$ (amortized)

- Space complexity: $O(N)$

>  Where $K$ is the length of the initial array passed into the constructor and $N$ is the total number of items added into the queue so far (including those from the constructor).

---

## 3. LinkedHashSet for Queue, and HashMap of Unique-Statuses

### Intuition

Instead of lazily removing non-unique elements during `showFirstUnique()`, we can eagerly remove them when they become non-unique. Using a LinkedHashSet (or OrderedDict) allows O(1) removal by value while preserving insertion order. This makes `showFirstUnique()` a true O(1) operation.

### Algorithm

1. **Constructor**: For each number in the initial array, call `add()`.
2. **add(value)**:
   - If the value is new, mark it as unique in the hash map and add it to the set.
   - If seen once before (currently unique), mark it as non-unique and remove it from the set.
   - If already non-unique, do nothing.
3. **showFirstUnique()**: Return the first element from the set if non-empty, otherwise return `-1`.

::tabs-start

```python
# In Python, we have to make do with the OrderedDict class. We can use it as a Set by setting
# the values to None.

class FirstUnique:

    def __init__(self, nums: List[int]):
        self._queue = OrderedDict()
        self._is_unique = {}

        for num in nums:
            # Notice that we're calling the "add" method of FirstUnique; not of the queue. 
            self.add(num)
        
    def showFirstUnique(self) -> int:
        # Check if there is still a value left in the queue. There might be no uniques.
        if self._queue:
            # We don't want to actually *remove* the value.
            # Seeing as OrderedDict has no "get first" method, the way that we can get
            # the first value is to create an iterator, and then get the "next" value
            # from that. Note that this is O(1).
            return next(iter(self._queue))
        
        return -1
        
    def add(self, value: int) -> None:
        # Case 1: We need to add the number to the queue and mark it as unique. 
        if value not in self._is_unique:
            self._is_unique[value] = True
            self._queue[value] = None

        # Case 2: We need to mark the value as no longer unique and then 
        # remove it from the queue.
        elif self._is_unique[value]:
            self._is_unique[value] = False
            self._queue.pop(value)

        # Case 3: We don't need to do anything; the number was removed from the queue
        # the second time it occurred.
```

```java
class FirstUnique {

    private Set<Integer> setQueue = new LinkedHashSet<>();
    private Map<Integer, Boolean> isUnique = new HashMap<>();

    public FirstUnique(int[] nums) {
        for (int num : nums) {
            this.add(num);
        }
    }

    public int showFirstUnique() {
        // If the queue contains values, we need to get the first one from it.
        // We can do this by making an iterator, and getting its first item.
        if (!setQueue.isEmpty()) {
            return setQueue.iterator().next();
        }
        return -1;
    }

    public void add(int value) {
        // Case 1: This value is not yet in the data structure.
        // It should be ADDED.
        if (!isUnique.containsKey(value)) {
            isUnique.put(value, true);
            setQueue.add(value);
        // Case 2: This value has been seen once, so is now becoming
        // non-unique. It should be REMOVED.
        } else if (isUnique.get(value)) {
            isUnique.put(value, false);
            setQueue.remove(value);
        }
    }
}
```

```cpp
class FirstUnique {
private:
    std::list<int> setQueue;
    std::unordered_map<int, std::list<int>::iterator> queuePosition;
    std::unordered_map<int, bool> isUnique;
    
public:
    FirstUnique(vector<int>& nums) {
        for (int num : nums) {
            this->add(num);
        }
    }
    
    int showFirstUnique() {
        // If the queue contains values, we need to get the first one from it.
        // We can do this by making an iterator, and getting its first item.
        if (!setQueue.empty()) {
            return setQueue.front();
        }
        return -1;
    }
    
    void add(int value) {
        // Case 1: This value is not yet in the data structure.
        // It should be ADDED.
        if (isUnique.find(value) == isUnique.end()) {
            isUnique[value] = true;
            setQueue.push_back(value);
            queuePosition[value] = std::prev(setQueue.end());
        // Case 2: This value has been seen once, so is now becoming
        // non-unique. It should be REMOVED.
        } else if (isUnique[value]) {
            isUnique[value] = false;
            setQueue.erase(queuePosition[value]);
            queuePosition.erase(value);
        }
    }
};
```

```javascript
class FirstUnique {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.setQueue = new Set();
        this.isUnique = new Map();

        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * @return {number}
     */
    showFirstUnique() {
        // If the queue contains values, we need to get the first one from it.
        // We can do this by making an iterator, and getting its first item.
        if (this.setQueue.size > 0) {
            return this.setQueue.values().next().value;
        }
        return -1;
    }

    /**
     * @param {number} value
     * @return {void}
     */
    add(value) {
        // Case 1: This value is not yet in the data structure.
        // It should be ADDED.
        if (!this.isUnique.has(value)) {
            this.isUnique.set(value, true);
            this.setQueue.add(value);
        // Case 2: This value has been seen once, so is now becoming
        // non-unique. It should be REMOVED.
        } else if (this.isUnique.get(value)) {
            this.isUnique.set(value, false);
            this.setQueue.delete(value);
        }
    }
}
```

```csharp
public class FirstUnique {

    private LinkedList<int> setQueue = new LinkedList<int>();
    private Dictionary<int, LinkedListNode<int>> queuePosition = new Dictionary<int, LinkedListNode<int>>();
    private Dictionary<int, bool> isUnique = new Dictionary<int, bool>();

    public FirstUnique(int[] nums) {
        foreach (int num in nums) {
            Add(num);
        }
    }

    public int ShowFirstUnique() {
        if (setQueue.Count > 0) {
            return setQueue.First.Value;
        }
        return -1;
    }

    public void Add(int value) {
        if (!isUnique.ContainsKey(value)) {
            isUnique[value] = true;
            setQueue.AddLast(value);
            queuePosition[value] = setQueue.Last;
        } else if (isUnique[value]) {
            isUnique[value] = false;
            setQueue.Remove(queuePosition[value]);
            queuePosition.Remove(value);
        }
    }
}
```

```go
type FirstUnique struct {
    setQueue      *list.List
    queuePosition map[int]*list.Element
    isUnique      map[int]bool
}

func Constructor(nums []int) FirstUnique {
    fu := FirstUnique{
        setQueue:      list.New(),
        queuePosition: make(map[int]*list.Element),
        isUnique:      make(map[int]bool),
    }
    for _, num := range nums {
        fu.Add(num)
    }
    return fu
}

func (this *FirstUnique) ShowFirstUnique() int {
    if this.setQueue.Len() > 0 {
        return this.setQueue.Front().Value.(int)
    }
    return -1
}

func (this *FirstUnique) Add(value int) {
    if _, exists := this.isUnique[value]; !exists {
        this.isUnique[value] = true
        elem := this.setQueue.PushBack(value)
        this.queuePosition[value] = elem
    } else if this.isUnique[value] {
        this.isUnique[value] = false
        this.setQueue.Remove(this.queuePosition[value])
        delete(this.queuePosition, value)
    }
}
```

```kotlin
class FirstUnique(nums: IntArray) {

    private val setQueue = LinkedHashSet<Int>()
    private val isUnique = HashMap<Int, Boolean>()

    init {
        for (num in nums) {
            add(num)
        }
    }

    fun showFirstUnique(): Int {
        if (setQueue.isNotEmpty()) {
            return setQueue.iterator().next()
        }
        return -1
    }

    fun add(value: Int) {
        if (value !in isUnique) {
            isUnique[value] = true
            setQueue.add(value)
        } else if (isUnique[value] == true) {
            isUnique[value] = false
            setQueue.remove(value)
        }
    }
}
```

```swift
class FirstUnique {

    private var setQueue: [Int] = []
    private var queuePosition: [Int: Int] = [:]
    private var isUnique: [Int: Bool] = [:]

    init(_ nums: [Int]) {
        for num in nums {
            add(num)
        }
    }

    func showFirstUnique() -> Int {
        if !setQueue.isEmpty {
            return setQueue[0]
        }
        return -1
    }

    func add(_ value: Int) {
        if isUnique[value] == nil {
            isUnique[value] = true
            queuePosition[value] = setQueue.count
            setQueue.append(value)
        } else if isUnique[value] == true {
            isUnique[value] = false
            if let pos = queuePosition[value] {
                setQueue.remove(at: pos)
                queuePosition.removeValue(forKey: value)
                for (key, idx) in queuePosition {
                    if idx > pos {
                        queuePosition[key] = idx - 1
                    }
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - **constructor**: $O(K)$

    - **add()**: $O(1)$

    - **showFirstUnique()**: $O(1)$

- Space complexity: $O(N)$

>  Where $K$ is the length of the initial array passed into the constructor and $N$ is the total number of items added into the queue so far (including those from the constructor).
