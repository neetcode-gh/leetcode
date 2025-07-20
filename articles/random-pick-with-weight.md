## 1. Prefix Sum + Linear Search

::tabs-start

```python
class Solution:

    def __init__(self, w: List[int]):
        self.w = w
        self.total = sum(w)

    def pickIndex(self) -> int:
        target = self.total * random.random()
        curSum = 0
        for i in range(len(self.w)):
            curSum += self.w[i]
            if curSum > target:
                return i


# Your Solution object will be instantiated and called as such:
# obj = Solution(w)
# param_1 = obj.pickIndex()
```

```java
public class Solution {
    int[] w;
    int total;

    public Solution(int[] w) {
        this.w = w;
        for (int weight : w) {
            total += weight;
        }
    }

    public int pickIndex() {
        double target = total * Math.random();
        int curSum = 0;
        for (int i = 0; i < w.length; i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
```

```cpp
class Solution {
public:
    vector<int> w;
    int total = 0;

    Solution(vector<int>& w) {
        this->w = w;
        for (int weight : w) {
            total += weight;
        }
    }

    int pickIndex() {
        double target = total * ((double) rand() / RAND_MAX);
        int curSum = 0;
        for (int i = 0; i < w.size(); i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
};


/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(w);
 * int param_1 = obj->pickIndex();
 */
```

```javascript
class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.w = w;
        this.total = w.reduce((a, b) => a + b, 0);
    }

    /**
     * @return {number}
     */
    pickIndex() {
        let target = this.total * Math.random();
        let curSum = 0;
        for (let i = 0; i < this.w.length; i++) {
            curSum += this.w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}


/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
```

```csharp
public class Solution {
    private int[] w;
    private int total;

    public Solution(int[] w) {
        this.w = w;
        foreach (int weight in w) {
            total += weight;
        }
    }

    public int PickIndex() {
        double target = total * new Random().NextDouble();
        int curSum = 0;
        for (int i = 0; i < w.Length; i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.PickIndex();
 */
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for initializing and $O(n)$ for each $pickIndex()$ function call.
* Space complexity: $O(n)$

---

## 2. Prefix Sum + Binary Search

::tabs-start

```python
class Solution:

    def __init__(self, w: List[int]):
        self.prefix = [0]
        for wgt in w:
            self.prefix.append(self.prefix[-1] + wgt)

    def pickIndex(self) -> int:
        target = self.prefix[-1] * random.random()
        l, r = 1, len(self.prefix)
        while l < r:
            mid = (l + r) >> 1
            if self.prefix[mid] <= target:
                l = mid + 1
            else:
                r = mid
        return l - 1


# Your Solution object will be instantiated and called as such:
# obj = Solution(w)
# param_1 = obj.pickIndex()
```

```java
public class Solution {
    private int[] prefix;

    public Solution(int[] w) {
        prefix = new int[w.length + 1];
        for (int i = 0; i < w.length; i++) {
            prefix[i + 1] = prefix[i] + w[i];
        }
    }

    public int pickIndex() {
        double target = prefix[prefix.length - 1] * Math.random();
        int l = 1, r = prefix.length;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
```

```cpp
class Solution {
public:
    vector<int> prefix;

    Solution(vector<int>& w) {
        prefix.push_back(0);
        for (int wgt : w) {
            prefix.push_back(prefix.back() + wgt);
        }
    }

    int pickIndex() {
        double target = prefix.back() * ((double) rand() / RAND_MAX);
        int l = 1, r = prefix.size();
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
};


/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(w);
 * int param_1 = obj->pickIndex();
 */
```

```javascript
class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.prefix = [0];
        for (let i = 0; i < w.length; i++) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + w[i]);
        }
    }

    /**
     * @return {number}
     */
    pickIndex() {
        const total = this.prefix[this.prefix.length - 1];
        const target = total * Math.random();
        let l = 1, r = this.prefix.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (this.prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}


/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
```

```csharp
public class Solution {
    private List<int> prefix;

    public Solution(int[] w) {
        prefix = new List<int> { 0 };
        foreach (int wgt in w) {
            prefix.Add(prefix[^1] + wgt);
        }
    }

    public int PickIndex() {
        double target = prefix[^1] * new Random().NextDouble();
        int l = 1, r = prefix.Count;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.PickIndex();
 */
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for initializing and $O(\log n)$ for each $pickIndex()$ function call.
* Space complexity: $O(n)$