## 1. Brute Force

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            seen = set()
            for j in range(i, n):
                seen.add(nums[j])
                if len(seen) > k:
                    break

                if len(seen) == k:
                    res += 1

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            Set<Integer> seen = new HashSet<>();
            for (int j = i; j < n; j++) {
                seen.add(nums[j]);
                if (seen.size() > k) {
                    break;
                }
                if (seen.size() == k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            unordered_set<int> seen;
            for (int j = i; j < n; j++) {
                seen.insert(nums[j]);
                if (seen.size() > k) {
                    break;
                }
                if (seen.size() == k) {
                    res++;
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysWithKDistinct(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let seen = new Set();
            for (let j = i; j < n; j++) {
                seen.add(nums[j]);
                if (seen.size > k) {
                    break;
                }
                if (seen.size === k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        int n = nums.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            HashSet<int> seen = new HashSet<int>();
            for (int j = i; j < n; j++) {
                seen.Add(nums[j]);
                if (seen.Count > k) {
                    break;
                }
                if (seen.Count == k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:

        def atMostK(k):
            count = defaultdict(int)
            res = l = 0

            for r in range(len(nums)):
                count[nums[r]] += 1
                if count[nums[r]] == 1:
                    k -= 1

                while k < 0:
                    count[nums[l]] -= 1
                    if count[nums[l]] == 0:
                        k += 1
                    l += 1

                res += (r - l + 1)

            return res

        return atMostK(k) - atMostK(k - 1)
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }

    private int atMostK(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int res = 0, l = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            if (count.get(nums[r]) == 1) {
                k--;
            }

            while (k < 0) {
                count.put(nums[l], count.get(nums[l]) - 1);
                if (count.get(nums[l]) == 0) {
                    k++;
                }
                l++;
            }

            res += (r - l + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }

private:
    int atMostK(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int res = 0, l = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            while (k < 0) {
                count[nums[l]]--;
                if (count[nums[l]] == 0) {
                    k++;
                }
                l++;
            }

            res += (r - l + 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysWithKDistinct(nums, k) {
        const atMostK = (k) => {
            const count = new Map();
            let res = 0,
                l = 0;

            for (let r = 0; r < nums.length; r++) {
                count.set(nums[r], (count.get(nums[r]) || 0) + 1);
                if (count.get(nums[r]) === 1) {
                    k--;
                }

                while (k < 0) {
                    count.set(nums[l], count.get(nums[l]) - 1);
                    if (count.get(nums[l]) === 0) {
                        k++;
                    }
                    l++;
                }

                res += r - l + 1;
            }

            return res;
        };

        return atMostK(k) - atMostK(k - 1);
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        return AtMostK(nums, k) - AtMostK(nums, k - 1);
    }

    private int AtMostK(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int res = 0, l = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) {
                count[nums[r]] = 0;
            }
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            while (k < 0) {
                count[nums[l]]--;
                if (count[nums[l]] == 0) {
                    count.Remove(nums[l]);
                    k++;
                }
                l++;
            }

            res += (r - l + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window (One Pass) - I

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        count = defaultdict(int)
        res = 0
        l_far = 0
        l_near = 0

        for r in range(len(nums)):
            count[nums[r]] += 1

            while len(count) > k:
                count[nums[l_near]] -= 1
                if count[nums[l_near]] == 0:
                    count.pop(nums[l_near])
                l_near += 1
                l_far = l_near

            while count[nums[l_near]] > 1:
                count[nums[l_near]] -= 1
                l_near += 1

            if len(count) == k:
                res += l_near - l_far + 1

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);

            while (count.size() > k) {
                count.put(nums[l_near], count.get(nums[l_near]) - 1);
                if (count.get(nums[l_near]) == 0) {
                    count.remove(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count.get(nums[l_near]) > 1) {
                count.put(nums[l_near], count.get(nums[l_near]) - 1);
                l_near++;
            }

            if (count.size() == k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;

            while (count.size() > k) {
                count[nums[l_near]]--;
                if (count[nums[l_near]] == 0) {
                    count.erase(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count[nums[l_near]] > 1) {
                count[nums[l_near]]--;
                l_near++;
            }

            if (count.size() == k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysWithKDistinct(nums, k) {
        const count = new Map();
        let res = 0,
            l_far = 0,
            l_near = 0;

        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);

            while (count.size > k) {
                count.set(nums[l_near], count.get(nums[l_near]) - 1);
                if (count.get(nums[l_near]) === 0) {
                    count.delete(nums[l_near]);
                }
                l_near++;
            }

            while (count.get(nums[l_near]) > 1) {
                count.set(nums[l_near], count.get(nums[l_near]) - 1);
                l_near++;
            }

            if (count.size === k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) {
                count[nums[r]] = 0;
            }
            count[nums[r]]++;

            while (count.Count > k) {
                count[nums[l_near]]--;
                if (count[nums[l_near]] == 0) {
                    count.Remove(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count[nums[l_near]] > 1) {
                count[nums[l_near]]--;
                l_near++;
            }

            if (count.Count == k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window (One Pass) - II

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        n = len(nums)
        count = [0] * (n + 1)
        res = l = cnt = 0

        for r in range(n):
            count[nums[r]] += 1
            if count[nums[r]] == 1:
                k -= 1

            if k < 0:
                count[nums[l]] -= 1
                l += 1
                k += 1
                cnt = 0

            if k == 0:
                while count[nums[l]] > 1:
                    count[nums[l]] -= 1
                    l += 1
                    cnt += 1

                res += (cnt + 1)

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        int n = nums.length;
        int[] count = new int[n + 1];
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += (cnt + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> count(n + 1, 0);
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += (cnt + 1);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysWithKDistinct(nums, k) {
        const n = nums.length;
        const count = new Array(n + 1).fill(0);
        let res = 0,
            l = 0,
            cnt = 0;

        for (let r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] === 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k === 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += cnt + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        int n = nums.Length;
        int[] count = new int[n + 1];
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }
                res += (cnt + 1);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
