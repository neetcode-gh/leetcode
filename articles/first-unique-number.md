## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: 
    - **constructor**: $O(K)$

    - **add()**: $O(1)$

    - **showFirstUnique()**: $O(1)$

- Space complexity: $O(N)$

>  Where $K$ is the length of the initial array passed into the constructor and $N$ is the total number of items added into the queue so far (including those from the constructor).
