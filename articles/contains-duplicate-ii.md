## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Map / Hash Set** - Used for O(1) lookups to track element indices or check for duplicates within a window
- **Sliding Window Technique** - Maintaining a fixed-size window of elements as you iterate through the array

---

## 1. Brute Force

### Intuition
The simplest approach is to check every pair of elements. For each element, we look at all elements within distance `k` and check if any of them are equal. This guarantees finding a duplicate if one exists within the required distance.

### Algorithm
1. Iterate through each index `L` from `0` to `n-1`.
2. For each `L`, iterate through index `R` from `L+1` to `min(n-1, L+k)`.
3. If `nums[L] == nums[R]`, return `true`.
4. If no such pair is found, return `false`.

::tabs-start

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        for L in range(len(nums)):
            for R in range(L + 1, min(len(nums), L + k + 1)):
                if nums[L] == nums[R]:
                    return True
        return False
```

```java
public class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        for (int L = 0; L < nums.length; L++) {
            for (int R = L + 1; R < Math.min(nums.length, L + k + 1); R++) {
                if (nums[L] == nums[R]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        for (int L = 0; L < nums.size(); L++) {
            for (int R = L + 1; R < min((int)nums.size(), L + k + 1); R++) {
                if (nums[L] == nums[R]) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    containsNearbyDuplicate(nums, k) {
        for (let L = 0; L < nums.length; L++) {
            for (let R = L + 1; R < Math.min(nums.length, L + k + 1); R++) {
                if (nums[L] === nums[R]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool ContainsNearbyDuplicate(int[] nums, int k) {
        for (int L = 0; L < nums.Length; L++) {
            for (int R = L + 1; R < Math.Min(nums.Length, L + k + 1); R++) {
                if (nums[L] == nums[R]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func containsNearbyDuplicate(nums []int, k int) bool {
    for L := 0; L < len(nums); L++ {
        for R := L + 1; R < min(len(nums), L+k+1); R++ {
            if nums[L] == nums[R] {
                return true
            }
        }
    }
    return false
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        for (L in nums.indices) {
            for (R in L + 1 until minOf(nums.size, L + k + 1)) {
                if (nums[L] == nums[R]) {
                    return true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func containsNearbyDuplicate(_ nums: [Int], _ k: Int) -> Bool {
        for L in 0..<nums.count {
            for R in (L + 1)..<min(nums.count, L + k + 1) {
                if nums[L] == nums[R] {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, k))$
- Space complexity: $O(1)$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.

---

## 2. Hash Map

### Intuition
Instead of checking all pairs, we can store the most recent index of each value in a hash map. When we encounter a value, we check if it appeared before and if the distance to its last occurrence is within `k`. This gives us O(1) lookup time for duplicates.

### Algorithm
1. Create a hash map to store each value's most recent index.
2. Iterate through the array with index `i`.
3. If `nums[i]` exists in the map and `i - map[nums[i]] <= k`, return `true`.
4. Update `map[nums[i]] = i` (store the current index).
5. If no valid pair is found, return `false`.

::tabs-start

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        mp = {}

        for i in range(len(nums)):
            if nums[i] in mp and i - mp[nums[i]] <= k:
                return True
            mp[nums[i]] = i

        return False
```

```java
public class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i]) && i - map.get(nums[i]) <= k) {
                return true;
            }
            map.put(nums[i], i);
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> mp;

        for (int i = 0; i < nums.size(); i++) {
            if (mp.find(nums[i]) != mp.end() && i - mp[nums[i]] <= k) {
                return true;
            }
            mp[nums[i]] = i;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    containsNearbyDuplicate(nums, k) {
        const map = new Map();

        for (let i = 0; i < nums.length; i++) {
            if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
                return true;
            }
            map.set(nums[i], i);
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool ContainsNearbyDuplicate(int[] nums, int k) {
        Dictionary<int, int> mp = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++) {
            if (mp.ContainsKey(nums[i]) && i - mp[nums[i]] <= k) {
                return true;
            }
            mp[nums[i]] = i;
        }

        return false;
    }
}
```

```go
func containsNearbyDuplicate(nums []int, k int) bool {
    mp := make(map[int]int)

    for i, num := range nums {
        if j, ok := mp[num]; ok && i-j <= k {
            return true
        }
        mp[num] = i
    }

    return false
}
```

```kotlin
class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        val mp = mutableMapOf<Int, Int>()

        for (i in nums.indices) {
            if (mp.containsKey(nums[i]) && i - mp[nums[i]]!! <= k) {
                return true
            }
            mp[nums[i]] = i
        }

        return false
    }
}
```

```swift
class Solution {
    func containsNearbyDuplicate(_ nums: [Int], _ k: Int) -> Bool {
        var mp = [Int: Int]()

        for i in 0..<nums.count {
            if let j = mp[nums[i]], i - j <= k {
                return true
            }
            mp[nums[i]] = i
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.

---

## 3. Hash Set

### Intuition
We only need to check for duplicates within a sliding window of size `k`. Using a hash set, we maintain exactly the elements in the current window. If a new element already exists in the set, we found a duplicate within distance `k`. We slide the window by removing the leftmost element when the window exceeds size `k`.

### Algorithm
1. Create an empty hash set to represent the sliding window.
2. Use two pointers `L` and `R`, with `R` iterating through the array.
3. If the window size `R - L` exceeds `k`, remove `nums[L]` from the set and increment `L`.
4. If `nums[R]` is already in the set, return `true`.
5. Add `nums[R]` to the set.
6. If no duplicate is found, return `false`.

::tabs-start

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        window = set()
        L = 0

        for R in range(len(nums)):
            if R - L > k:
                window.remove(nums[L])
                L += 1
            if nums[R] in window:
                return True
            window.add(nums[R])

        return False
```

```java
public class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> window = new HashSet<>();
        int L = 0;

        for (int R = 0; R < nums.length; R++) {
            if (R - L > k) {
                window.remove(nums[L]);
                L++;
            }
            if (window.contains(nums[R])) {
                return true;
            }
            window.add(nums[R]);
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_set<int> window;
        int L = 0;

        for (int R = 0; R < nums.size(); R++) {
            if (R - L > k) {
                window.erase(nums[L]);
                L++;
            }
            if (window.find(nums[R]) != window.end()) {
                return true;
            }
            window.insert(nums[R]);
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    containsNearbyDuplicate(nums, k) {
        let window = new Set();
        let L = 0;

        for (let R = 0; R < nums.length; R++) {
            if (R - L > k) {
                window.delete(nums[L]);
                L++;
            }
            if (window.has(nums[R])) {
                return true;
            }
            window.add(nums[R]);
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool ContainsNearbyDuplicate(int[] nums, int k) {
        HashSet<int> window = new HashSet<int>();
        int L = 0;

        for (int R = 0; R < nums.Length; R++) {
            if (R - L > k) {
                window.Remove(nums[L]);
                L++;
            }
            if (window.Contains(nums[R])) {
                return true;
            }
            window.Add(nums[R]);
        }

        return false;
    }
}
```

```go
func containsNearbyDuplicate(nums []int, k int) bool {
    window := make(map[int]bool)
    L := 0

    for R := 0; R < len(nums); R++ {
        if R-L > k {
            delete(window, nums[L])
            L++
        }
        if window[nums[R]] {
            return true
        }
        window[nums[R]] = true
    }

    return false
}
```

```kotlin
class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        val window = HashSet<Int>()
        var L = 0

        for (R in nums.indices) {
            if (R - L > k) {
                window.remove(nums[L])
                L++
            }
            if (nums[R] in window) {
                return true
            }
            window.add(nums[R])
        }

        return false
    }
}
```

```swift
class Solution {
    func containsNearbyDuplicate(_ nums: [Int], _ k: Int) -> Bool {
        var window = Set<Int>()
        var L = 0

        for R in 0..<nums.count {
            if R - L > k {
                window.remove(nums[L])
                L += 1
            }
            if window.contains(nums[R]) {
                return true
            }
            window.insert(nums[R])
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(min(n, k))$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.

---

## Common Pitfalls

### Off-by-One Error in Distance Check
The condition requires the distance to be "at most k", meaning `abs(i - j) <= k`, not `< k`. Using strict inequality will miss valid pairs that are exactly `k` positions apart.
```python
# Wrong: Using strict inequality
if nums[i] in mp and i - mp[nums[i]] < k:  # Misses distance == k

# Correct: Use <= for "at most k"
if nums[i] in mp and i - mp[nums[i]] <= k:
```

### Storing All Indices Instead of Most Recent
The hash map only needs to store the most recent index for each value. Storing all indices wastes memory and complicates the logic. Since we iterate left to right, we only care about the closest previous occurrence.
