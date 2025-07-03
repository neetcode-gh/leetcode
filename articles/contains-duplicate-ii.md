## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, k))$
- Space complexity: $O(1)$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.

---

## 2. Hash Map

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.

---

## 3. Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(min(n, k))$

> Where $n$ is the size of the array $nums$ and $k$ is the maximum distance between two equal numbers.
