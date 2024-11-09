## 1. Greedy

::tabs-start

```python
class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        good = set()

        for t in triplets:
            if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
                continue
            for i, v in enumerate(t):
                if v == target[i]:
                    good.add(i)
        return len(good) == 3
```

```java
public class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        Set<Integer> good = new HashSet<>();

        for (int[] t : triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            for (int i = 0; i < t.length; i++) {
                if (t[i] == target[i]) {
                    good.add(i);
                }
            }
        }
        return good.size() == 3;
    }
}
```

```cpp
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        unordered_set<int> good;

        for (const auto& t : triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            for (int i = 0; i < t.size(); i++) {
                if (t[i] == target[i]) {
                    good.insert(i);
                }
            }
        }
        return good.size() == 3;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triplets
     * @param {number[]} target
     * @return {boolean}
     */
    mergeTriplets(triplets, target) {
        const good = new Set();

        for (const t of triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            for (let i = 0; i < t.length; i++) {
                if (t[i] === target[i]) {
                    good.add(i);
                }
            }
        }
        return good.size === 3;
    }
}
```

```csharp
public class Solution {
    public bool MergeTriplets(int[][] triplets, int[] target) {
        HashSet<int> good = new HashSet<int>();

        foreach (var t in triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            for (int i = 0; i < t.Length; i++) {
                if (t[i] == target[i]) {
                    good.Add(i);
                }
            }
        }
        return good.Count == 3;
    }
}
```

```go
func mergeTriplets(triplets [][]int, target []int) bool {
    good := make(map[int]bool)

    for _, t := range triplets {
        if t[0] > target[0] || t[1] > target[1] || t[2] > target[2] {
            continue
        }
        for i, v := range t {
            if v == target[i] {
                good[i] = true
            }
        }
    }
    return len(good) == 3
}
```

```kotlin
class Solution {
    fun mergeTriplets(triplets: Array<IntArray>, target: IntArray): Boolean {
        val good = HashSet<Int>()

        for (t in triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue
            for ((i, v) in t.withIndex()) {
                if (v == target[i]) {
                    good.add(i)
                }
            }
        }
        return good.size == 3
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Greedy (Optimal)

::tabs-start

```python
class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        x = y = z = False
        for t in triplets:
            x |= (t[0] == target[0] and t[1] <= target[1] and t[2] <= target[2])
            y |= (t[0] <= target[0] and t[1] == target[1] and t[2] <= target[2])
            z |= (t[0] <= target[0] and t[1] <= target[1] and t[2] == target[2])
            if x and y and z:
                return True
        return False
```

```java
public class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        boolean x = false, y = false, z = false;
        for (int[] t : triplets) {
            x |= (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2]);
            y |= (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2]);
            z |= (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2]);
            if (x && y && z) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        bool x = false, y = false, z = false;
        for (const auto& t : triplets) {
            x |= (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2]);
            y |= (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2]);
            z |= (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2]);
            if (x && y && z) return true;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triplets
     * @param {number[]} target
     * @return {boolean}
     */
    mergeTriplets(triplets, target) {
        let x = false, y = false, z = false;
        for (let t of triplets) {
            x |= (t[0] === target[0] && t[1] <= target[1] && t[2] <= target[2]);
            y |= (t[0] <= target[0] && t[1] === target[1] && t[2] <= target[2]);
            z |= (t[0] <= target[0] && t[1] <= target[1] && t[2] === target[2]);
            if (x && y && z) return true;
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool MergeTriplets(int[][] triplets, int[] target) {
        bool x = false, y = false, z = false;
        foreach (var t in triplets) {
            x |= (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2]);
            y |= (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2]);
            z |= (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2]);
            if (x && y && z) return true;
        }
        return false;
    }
}
```

```go
func mergeTriplets(triplets [][]int, target []int) bool {
    x, y, z := false, false, false

    for _, t := range triplets {
        x = x || (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2])
        y = y || (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2])
        z = z || (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2])
        
        if x && y && z {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun mergeTriplets(triplets: Array<IntArray>, target: IntArray): Boolean {
        var x = false
        var y = false
        var z = false

        for (t in triplets) {
            x = x || (t[0] == target[0] && t[1] <= target[1] && t[2] <= target[2])
            y = y || (t[0] <= target[0] && t[1] == target[1] && t[2] <= target[2])
            z = z || (t[0] <= target[0] && t[1] <= target[1] && t[2] == target[2])

            if (x && y && z) return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$