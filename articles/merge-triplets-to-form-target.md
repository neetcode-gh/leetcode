## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Arrays** - Iterating through and comparing elements in 2D arrays
- **Greedy Algorithms** - Making locally optimal choices to build a global solution
- **Sets / Hash Sets** - Tracking unique values to verify coverage of required conditions

---

## 1. Greedy

### Intuition

We are given several triplets and a target triplet.
We can merge triplets by taking the **maximum value at each index**, and we want to know if it is possible to obtain the target exactly.

A key observation is:
- any triplet that has a value **greater than the target at any index** can never be used, because merging only increases values
- so such triplets should be ignored

For the remaining valid triplets:
- if a triplet matches the target at a certain index, it can help us reach that target value at that position

If we can find triplets that collectively cover **all three indices** of the target, then merging them will produce the target.

### Algorithm

1. Initialize an empty set `good` to track which target indices can be matched.
2. Iterate through each triplet `t`:
   - If any value in `t` is greater than the corresponding value in `target`, skip this triplet
3. For the remaining triplets:
   - Check each index `i`
   - If `t[i] == target[i]`, add index `i` to the set `good`
4. After processing all triplets:
   - If all three indices `{0, 1, 2}` are present in `good`, return `true`
   - Otherwise, return `false`

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

```swift
class Solution {
    func mergeTriplets(_ triplets: [[Int]], _ target: [Int]) -> Bool {
        var good = Set<Int>()

        for t in triplets {
            if t[0] > target[0] || t[1] > target[1] || t[2] > target[2] {
                continue
            }
            for (i, v) in t.enumerated() {
                if v == target[i] {
                    good.insert(i)
                }
            }
        }

        return good.count == 3
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Greedy (Optimal)

### Intuition

We are given several triplets and a target triplet.
When we merge triplets, we take the **maximum value at each index**, so values can only **increase**, never decrease.

This leads to an important rule:
- Any triplet that has a value **greater than the target at any index** cannot be used to form the target.

Instead of collecting indices in a set, we can think more directly:
- To reach `target[0]`, we need **at least one triplet** where:
  - the first value equals `target[0]`
  - the other two values do not exceed the target
- Similarly for `target[1]` and `target[2]`

If we can independently satisfy all three positions using valid triplets, then merging those triplets will exactly form the target.

### Algorithm

1. Initialize three boolean flags:
   - `x` → can we match `target[0]`?
   - `y` → can we match `target[1]`?
   - `z` → can we match `target[2]`?
2. Iterate through each triplet `t`:
3. Update the flags:
   - Set `x = true` if:
     - `t[0] == target[0]`
     - `t[1] <= target[1]`
     - `t[2] <= target[2]`
   - Set `y = true` if:
     - `t[1] == target[1]`
     - `t[0] <= target[0]`
     - `t[2] <= target[2]`
   - Set `z = true` if:
     - `t[2] == target[2]`
     - `t[0] <= target[0]`
     - `t[1] <= target[1]`
4. If at any point all three flags `x`, `y`, and `z` become `true`:
   - return `true` immediately
5. If the loop finishes and not all flags are `true`:
   - return `false`

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
        let x = false,
            y = false,
            z = false;
        for (let t of triplets) {
            x |= t[0] === target[0] && t[1] <= target[1] && t[2] <= target[2];
            y |= t[0] <= target[0] && t[1] === target[1] && t[2] <= target[2];
            z |= t[0] <= target[0] && t[1] <= target[1] && t[2] === target[2];
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

```swift
class Solution {
    func mergeTriplets(_ triplets: [[Int]], _ target: [Int]) -> Bool {
        var x = false, y = false, z = false

        for t in triplets {
            if t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2] {
                if t[0] == target[0] { x = true }
                if t[1] == target[1] { y = true }
                if t[2] == target[2] { z = true }
            }

            if x && y && z {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Including Triplets With Values Exceeding the Target

A triplet where any element exceeds the corresponding target value can never be used because merging only takes the maximum at each position, so values can only increase. Failing to filter out these invalid triplets leads to incorrect results.

### Checking Only for Exact Target Matches Without Filtering

Some solutions check if a triplet matches the target at a position but forget to verify that the other positions do not exceed the target. A triplet like `[5, 2, 3]` matching `target[0] = 5` is useless if `target[1] = 1` because the 2 exceeds it.

### Thinking You Need to Find a Single Triplet Equaling the Target

The problem allows merging multiple triplets. You do not need one triplet that exactly equals the target. You need to find triplets that collectively can contribute each target value independently while never exceeding any target position.
