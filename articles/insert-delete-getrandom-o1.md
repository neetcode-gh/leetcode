## 1. Hash Map

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for $getRandom()$, $O(1)$ for other function calls.
- Space complexity: $O(n)$

---

## 2. Hash Map + List

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(n)$
