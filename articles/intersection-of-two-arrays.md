## 1. Brute Force

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        res = set()
        for i in nums1:
            for j in nums2:
                if i == j:
                    res.add(i)
                    break
        return list(res)
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> res = new HashSet<>();
        for (int i : nums1) {
            for (int j : nums2) {
                if (i == j) {
                    res.add(i);
                    break;
                }
            }
        }
        int[] result = new int[res.size()];
        int idx = 0;
        for (int num : res) {
            result[idx++] = num;
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> res;
        for (int i : nums1) {
            for (int j : nums2) {
                if (i == j) {
                    res.insert(i);
                    break;
                }
            }
        }
        return vector<int>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const res = new Set();
        for (const i of nums1) {
            for (const j of nums2) {
                if (i === j) {
                    res.add(i);
                    break;
                }
            }
        }
        return Array.from(res);
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> res = new HashSet<int>();
        foreach (int i in nums1) {
            foreach (int j in nums2) {
                if (i == j) {
                    res.Add(i);
                    break;
                }
            }
        }
        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 2. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        nums2.sort()

        n, m = len(nums1), len(nums2)
        res, i, j = [], 0, 0

        while i < n and j < m:
            while j < m and nums2[j] < nums1[i]:
                j += 1
            if j < m:
                if nums1[i] == nums2[j]:
                    res.append(nums1[i])
                i += 1
                while i < n and nums1[i] == nums1[i - 1]:
                    i += 1

        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);

        List<Integer> res = new ArrayList<>();
        int i = 0, j = 0;

        while (i < nums1.length && j < nums2.length) {
            while (j < nums2.length && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < nums2.length) {
                if (nums1[i] == nums2[j]) {
                    res.add(nums1[i]);
                }
                i++;
                while (i < nums1.length && nums1[i] == nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());

        int n = nums1.size(), m = nums2.size();
        vector<int> res;
        int i = 0, j = 0;

        while (i < n && j < m) {
            while (j < m && nums2[j] < nums1[i]) {
                ++j;
            }
            if (j < m) {
                if (nums1[i] == nums2[j]) {
                    res.push_back(nums1[i]);
                }
                ++i;
                while (i < n && nums1[i] == nums1[i - 1]) {
                    ++i;
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
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        const res = [];
        let i = 0,
            j = 0;

        while (i < nums1.length && j < nums2.length) {
            while (j < nums2.length && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < nums2.length) {
                if (nums1[i] === nums2[j]) {
                    res.push(nums1[i]);
                }
                i++;
                while (i < nums1.length && nums1[i] === nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        Array.Sort(nums1);
        Array.Sort(nums2);

        int n = nums1.Length, m = nums2.Length;
        List<int> res = new List<int>();
        int i = 0, j = 0;

        while (i < n && j < m) {
            while (j < m && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < m) {
                if (nums1[i] == nums2[j]) {
                    res.Add(nums1[i]);
                }
                i++;
                while (i < n && nums1[i] == nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        set2 = set(nums2)

        res = []
        for num in set1:
            if num in set2:
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int num : nums1) {
            set1.add(num);
        }

        Set<Integer> set2 = new HashSet<>();
        for (int num : nums2) {
            set2.add(num);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : set1) {
            if (set2.contains(num)) {
                res.add(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1(nums1.begin(), nums1.end());
        unordered_set<int> set2(nums2.begin(), nums2.end());

        vector<int> res;
        for (int num : set1) {
            if (set2.find(num) != set2.end()) {
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const set1 = new Set(nums1);
        const set2 = new Set(nums2);

        const res = [];
        for (const num of set1) {
            if (set2.has(num)) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);
        List<int> res = new List<int>();

        foreach (int num in set1) {
            if (set2.Contains(num)) {
                res.Add(num);
            }
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 4. Hash Map

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen = defaultdict(int)
        for num in nums1:
            seen[num] = 1

        res = []
        for num in nums2:
            if seen[num] == 1:
                seen[num] = 0
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int num : nums1) {
            seen.put(num, 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : nums2) {
            if (seen.getOrDefault(num, 0) == 1) {
                seen.put(num, 0);
                res.add(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> seen;
        for (int num : nums1) {
            seen[num] = 1;
        }

        vector<int> res;
        for (int num : nums2) {
            if (seen[num] == 1) {
                seen[num] = 0;
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const seen = {};
        for (const num of nums1) {
            seen[num] = 1;
        }

        const res = [];
        for (const num of nums2) {
            if (seen[num] === 1) {
                seen[num] = 0;
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        Dictionary<int, int> seen = new Dictionary<int, int>();
        foreach (int num in nums1) {
            seen[num] = 1;
        }

        List<int> res = new List<int>();
        foreach (int num in nums2) {
            if (seen.ContainsKey(num) && seen[num] == 1) {
                seen[num] = 0;
                res.Add(num);
            }
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 5. Hash Set (Optimal)

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen = set(nums1)

        res = []
        for num in nums2:
            if num in seen:
                res.append(num)
                seen.remove(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums1) {
            seen.add(num);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : nums2) {
            if (seen.contains(num)) {
                res.add(num);
                seen.remove(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> seen(nums1.begin(), nums1.end());
        vector<int> res;

        for (int num : nums2) {
            if (seen.count(num)) {
                res.push_back(num);
                seen.erase(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const seen = new Set(nums1);
        const res = [];

        for (const num of nums2) {
            if (seen.has(num)) {
                res.push(num);
                seen.delete(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> seen = new HashSet<int>(nums1);
        List<int> res = new List<int>();

        foreach (int num in nums2) {
            if (seen.Contains(num)) {
                res.Add(num);
                seen.Remove(num);
            }
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 6. Built-In Functions

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
            return list(set(nums1) & set(nums2))
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (Integer n : nums1) {
            set1.add(n);
        }

        Set<Integer> set2 = new HashSet<>();
        for (Integer n : nums2) {
            set2.add(n);
        }

        set1.retainAll(set2);
        int[] res= new int[set1.size()];
        int idx = 0;
        for (int s : set1) {
            res[idx++] = s;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        set<int> set1(nums1.begin(), nums1.end()), set2(nums2.begin(), nums2.end());
        vector<int> res;
        set_intersection(set1.begin(), set1.end(), set2.begin(), set2.end(), back_inserter(res));
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const set2 = new Set(nums2);
        return [...new Set(nums1)].filter((num) => set2.has(num));
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);
        set1.IntersectWith(set2);
        return set1.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$ in average case, $O(n * m)$ in worst case.
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.
