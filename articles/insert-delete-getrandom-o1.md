## 1. Hash Map

### Intuition

A hash map provides O(1) average time for insert and delete operations, making it a natural choice for the first two requirements. However, hash maps don't support random access by index.
For `getRandom()`, we need to pick a random element, but iterating to a random position takes O(n) time. We convert the keys to a list and pick a random index.
This approach sacrifices `getRandom()` performance to keep the implementation simple.

### Algorithm

1. Initialize a hash map `numMap` and a size counter.
2. **insert(val)**: If `val` exists in the map, return `false`. Otherwise, add it to the map with any value and increment size. Return `true`.
3. **remove(val)**: If `val` doesn't exist in the map, return `false`. Otherwise, delete it from the map and decrement size. Return `true`.
4. **getRandom()**: Generate a random index from `0` to `size - 1`. Convert the map's keys to a list and return the element at that index.

::tabs-start

```python
class RandomizedSet:

    def __init__(self):
        self.numMap = {}
        self.size = 0

    def insert(self, val: int) -> bool:
        if val in self.numMap:
            return False
        self.numMap[val] = 1
        self.size += 1
        return True

    def remove(self, val: int) -> bool:
        if val not in self.numMap:
            return False
        del self.numMap[val]
        self.size -= 1
        return True

    def getRandom(self) -> int:
        idx = random.randint(0, self.size - 1)
        return list(self.numMap.keys())[idx]
```

```java
public class RandomizedSet {
    private HashMap<Integer, Integer> numMap;
    private int size;

    public RandomizedSet() {
        numMap = new HashMap<>();
        size = 0;
    }

    public boolean insert(int val) {
        if (numMap.containsKey(val)) {
            return false;
        }
        numMap.put(val, 1);
        size++;
        return true;
    }

    public boolean remove(int val) {
        if (!numMap.containsKey(val)) {
            return false;
        }
        numMap.remove(val);
        size--;
        return true;
    }

    public int getRandom() {
        int idx = new Random().nextInt(size);
        Iterator<Integer> it = numMap.keySet().iterator();
        while (idx-- > 0) {
            it.next();
        }
        return it.next();
    }
}
```

```cpp
class RandomizedSet {
private:
    unordered_map<int, int> numMap;
    int size;

public:
    RandomizedSet() : size(0) {}

    bool insert(int val) {
        if (numMap.count(val)) return false;
        numMap[val] = 1;
        size++;
        return true;
    }

    bool remove(int val) {
        if (!numMap.count(val)) return false;
        numMap.erase(val);
        size--;
        return true;
    }

    int getRandom() {
        int idx = rand() % size;
        auto it = numMap.begin();
        advance(it, idx);
        return it->first;
    }
};
```

```javascript
class RandomizedSet {
    constructor() {
        this.numMap = new Map();
        this.size = 0;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (this.numMap.has(val)) return false;
        this.numMap.set(val, 1);
        this.size++;
        return true;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (!this.numMap.has(val)) return false;
        this.numMap.delete(val);
        this.size--;
        return true;
    }

    /**
     * @return {number}
     */
    getRandom() {
        const keys = Array.from(this.numMap.keys());
        const idx = Math.floor(Math.random() * this.size);
        return keys[idx];
    }
}
```

```csharp
public class RandomizedSet {
    private Dictionary<int, int> numMap;
    private int size;
    private Random rand;

    public RandomizedSet() {
        numMap = new Dictionary<int, int>();
        size = 0;
        rand = new Random();
    }

    public bool Insert(int val) {
        if (numMap.ContainsKey(val)) {
            return false;
        }
        numMap[val] = 1;
        size++;
        return true;
    }

    public bool Remove(int val) {
        if (!numMap.ContainsKey(val)) {
            return false;
        }
        numMap.Remove(val);
        size--;
        return true;
    }

    public int GetRandom() {
        int idx = rand.Next(0, size);
        var keys = numMap.Keys.ToList();
        return keys[idx];
    }
}
```

```go
type RandomizedSet struct {
    numMap map[int]int
    size   int
}

func Constructor() RandomizedSet {
    return RandomizedSet{
        numMap: make(map[int]int),
        size:   0,
    }
}

func (this *RandomizedSet) Insert(val int) bool {
    if _, exists := this.numMap[val]; exists {
        return false
    }
    this.numMap[val] = 1
    this.size++
    return true
}

func (this *RandomizedSet) Remove(val int) bool {
    if _, exists := this.numMap[val]; !exists {
        return false
    }
    delete(this.numMap, val)
    this.size--
    return true
}

func (this *RandomizedSet) GetRandom() int {
    idx := rand.Intn(this.size)
    for key := range this.numMap {
        if idx == 0 {
            return key
        }
        idx--
    }
    return 0
}
```

```kotlin
class RandomizedSet() {
    private val numMap = HashMap<Int, Int>()
    private var size = 0

    fun insert(`val`: Int): Boolean {
        if (numMap.containsKey(`val`)) {
            return false
        }
        numMap[`val`] = 1
        size++
        return true
    }

    fun remove(`val`: Int): Boolean {
        if (!numMap.containsKey(`val`)) {
            return false
        }
        numMap.remove(`val`)
        size--
        return true
    }

    fun getRandom(): Int {
        val idx = (0 until size).random()
        return numMap.keys.elementAt(idx)
    }
}
```

```swift
class RandomizedSet {
    private var numMap: [Int: Int]
    private var size: Int

    init() {
        numMap = [:]
        size = 0
    }

    func insert(_ val: Int) -> Bool {
        if numMap[val] != nil {
            return false
        }
        numMap[val] = 1
        size += 1
        return true
    }

    func remove(_ val: Int) -> Bool {
        if numMap[val] == nil {
            return false
        }
        numMap.removeValue(forKey: val)
        size -= 1
        return true
    }

    func getRandom() -> Int {
        let idx = Int.random(in: 0..<size)
        return Array(numMap.keys)[idx]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for $getRandom()$, $O(1)$ for other function calls.
- Space complexity: $O(n)$

---

## 2. Hash Map + List

### Intuition

To achieve O(1) for all operations including `getRandom()`, we combine a hash map with a dynamic array. The array stores the actual values and allows random access, while the hash map stores each value's index in the array for fast lookups.
The tricky part is deletion: removing from the middle of an array is O(n). We solve this by swapping the element to delete with the last element, then removing from the end in O(1) time.
This swap-and-pop technique is a common pattern for O(1) deletion from unordered collections.

### Algorithm

1. Initialize a hash map `numMap` (value to index) and a list `nums`.
2. **insert(val)**: If `val` exists in the map, return `false`. Otherwise, add `val` to the end of the list and store its index in the map. Return `true`.
3. **remove(val)**: If `val` doesn't exist, return `false`. Get the index of `val`, swap it with the last element in the list, update the swapped element's index in the map, remove the last element from the list, and delete `val` from the map. Return `true`.
4. **getRandom()**: Return a random element from the list using a random index.

::tabs-start

```python
class RandomizedSet:

    def __init__(self):
        self.numMap = {}
        self.nums = []

    def insert(self, val: int) -> bool:
        if val in self.numMap:
            return False
        self.numMap[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.numMap:
            return False
        idx = self.numMap[val]
        last = self.nums[-1]
        self.nums[idx] = last
        self.numMap[last] = idx
        self.nums.pop()
        del self.numMap[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

```java
public class RandomizedSet {
    private Map<Integer, Integer> numMap;
    private List<Integer> nums;
    private Random rand;

    public RandomizedSet() {
        numMap = new HashMap<>();
        nums = new ArrayList<>();
        rand = new Random();
    }

    public boolean insert(int val) {
        if (numMap.containsKey(val)) return false;
        numMap.put(val, nums.size());
        nums.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!numMap.containsKey(val)) return false;
        int idx = numMap.get(val);
        int last = nums.get(nums.size() - 1);
        nums.set(idx, last);
        numMap.put(last, idx);
        nums.remove(nums.size() - 1);
        numMap.remove(val);
        return true;
    }

    public int getRandom() {
        return nums.get(rand.nextInt(nums.size()));
    }
}
```

```cpp
class RandomizedSet {
private:
    unordered_map<int, int> numMap;
    vector<int> nums;

public:
    RandomizedSet() {}

    bool insert(int val) {
        if (numMap.count(val)) return false;
        numMap[val] = nums.size();
        nums.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (!numMap.count(val)) return false;
        int idx = numMap[val];
        int last = nums.back();
        nums[idx] = last;
        numMap[last] = idx;
        nums.pop_back();
        numMap.erase(val);
        return true;
    }

    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

```javascript
class RandomizedSet {
    constructor() {
        this.numMap = new Map();
        this.nums = [];
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (this.numMap.has(val)) return false;
        this.numMap.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (!this.numMap.has(val)) return false;
        const idx = this.numMap.get(val);
        const last = this.nums[this.nums.length - 1];
        this.nums[idx] = last;
        this.numMap.set(last, idx);
        this.nums.pop();
        this.numMap.delete(val);
        return true;
    }

    /**
     * @return {number}
     */
    getRandom() {
        return this.nums[Math.floor(Math.random() * this.nums.length)];
    }
}
```

```csharp
public class RandomizedSet {
    private Dictionary<int, int> numMap;
    private List<int> nums;
    private Random rand;

    public RandomizedSet() {
        numMap = new Dictionary<int, int>();
        nums = new List<int>();
        rand = new Random();
    }

    public bool Insert(int val) {
        if (numMap.ContainsKey(val)) {
            return false;
        }
        numMap[val] = nums.Count;
        nums.Add(val);
        return true;
    }

    public bool Remove(int val) {
        if (!numMap.ContainsKey(val)) {
            return false;
        }
        int idx = numMap[val];
        int last = nums[nums.Count - 1];
        nums[idx] = last;
        numMap[last] = idx;
        nums.RemoveAt(nums.Count - 1);
        numMap.Remove(val);
        return true;
    }

    public int GetRandom() {
        int index = rand.Next(nums.Count);
        return nums[index];
    }
}
```

```go
type RandomizedSet struct {
    numMap map[int]int
    nums   []int
}

func Constructor() RandomizedSet {
    return RandomizedSet{
        numMap: make(map[int]int),
        nums:   []int{},
    }
}

func (this *RandomizedSet) Insert(val int) bool {
    if _, exists := this.numMap[val]; exists {
        return false
    }
    this.numMap[val] = len(this.nums)
    this.nums = append(this.nums, val)
    return true
}

func (this *RandomizedSet) Remove(val int) bool {
    if _, exists := this.numMap[val]; !exists {
        return false
    }
    idx := this.numMap[val]
    last := this.nums[len(this.nums)-1]
    this.nums[idx] = last
    this.numMap[last] = idx
    this.nums = this.nums[:len(this.nums)-1]
    delete(this.numMap, val)
    return true
}

func (this *RandomizedSet) GetRandom() int {
    return this.nums[rand.Intn(len(this.nums))]
}
```

```kotlin
class RandomizedSet() {
    private val numMap = HashMap<Int, Int>()
    private val nums = ArrayList<Int>()

    fun insert(`val`: Int): Boolean {
        if (numMap.containsKey(`val`)) {
            return false
        }
        numMap[`val`] = nums.size
        nums.add(`val`)
        return true
    }

    fun remove(`val`: Int): Boolean {
        if (!numMap.containsKey(`val`)) {
            return false
        }
        val idx = numMap[`val`]!!
        val last = nums[nums.size - 1]
        nums[idx] = last
        numMap[last] = idx
        nums.removeAt(nums.size - 1)
        numMap.remove(`val`)
        return true
    }

    fun getRandom(): Int {
        return nums[(0 until nums.size).random()]
    }
}
```

```swift
class RandomizedSet {
    private var numMap: [Int: Int]
    private var nums: [Int]

    init() {
        numMap = [:]
        nums = []
    }

    func insert(_ val: Int) -> Bool {
        if numMap[val] != nil {
            return false
        }
        numMap[val] = nums.count
        nums.append(val)
        return true
    }

    func remove(_ val: Int) -> Bool {
        guard let idx = numMap[val] else {
            return false
        }
        let last = nums[nums.count - 1]
        nums[idx] = last
        numMap[last] = idx
        nums.removeLast()
        numMap.removeValue(forKey: val)
        return true
    }

    func getRandom() -> Int {
        return nums[Int.random(in: 0..<nums.count)]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(n)$
