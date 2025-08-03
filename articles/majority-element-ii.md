## 1. Brute Force

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        res = set()
        for num in nums:
            count = sum(1 for i in nums if i == num)
            if count > len(nums) // 3:
                res.add(num)
        return list(res)
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Set<Integer> res = new HashSet<>();
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) count++;
            }
            if (count > nums.length / 3) {
                res.add(num);
            }
        }
        return new ArrayList<>(res);
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_set<int> res;
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) count++;
            }
            if (count > nums.size() / 3) {
                res.insert(num);
            }
        }
        return vector<int>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    majorityElement(nums) {
        const res = new Set();
        for (const num of nums) {
            let count = 0;
            for (const i of nums) {
                if (i === num) count++;
            }
            if (count > Math.floor(nums.length / 3)) {
                res.add(num);
            }
        }
        return Array.from(res);
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        HashSet<int> res = new HashSet<int>();
        int n = nums.Length;

        foreach (int num in nums) {
            int count = nums.Count(x => x == num);
            if (count > n / 3) {
                res.Add(num);
            }
        }

        return res.ToList();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ since output array size will be at most $2$.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        nums.sort()
        res, n = [], len(nums)

        i = 0
        while i < n:
            j = i + 1
            while j < n and nums[i] == nums[j]:
                j += 1
            if (j - i) > n // 3:
                res.append(nums[i])
            i = j

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();
        int n = nums.length;

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[i] == nums[j]) {
                j++;
            }
            if (j - i > n / 3) {
                res.add(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int n = nums.size();

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[i] == nums[j]) {
                j++;
            }
            if (j - i > n / 3) {
                res.push_back(nums[i]);
            }
            i = j;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    majorityElement(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        let i = 0;
        while (i < n) {
            let j = i + 1;
            while (j < n && nums[i] === nums[j]) {
                j++;
            }
            if (j - i > Math.floor(n / 3)) {
                res.push(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Array.Sort(nums);
        List<int> res = new List<int>();
        int n = nums.Length;

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[j] == nums[i]) {
                j++;
            }
            if (j - i > n / 3) {
                res.Add(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Frequency Count

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        count = Counter(nums)
        res = []

        for key in count:
            if count[key] > len(nums) // 3:
                res.append(key)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            if (count.get(key) > nums.length / 3) {
                res.add(key);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        vector<int> res;
        for (auto& pair : count) {
            if (pair.second > nums.size() / 3) {
                res.push_back(pair.first);
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
     * @return {number[]}
     */
    majorityElement(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (const [key, value] of count.entries()) {
            if (value > Math.floor(nums.length / 3)) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        List<int> res = new List<int>();
        int n = nums.Length;

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        foreach (var kvp in count) {
            if (kvp.Value > n / 3) {
                res.Add(kvp.Key);
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

## 4. Boyer-Moore Voting Algorithm

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        n = len(nums)
        num1 = num2 = -1
        cnt1 = cnt2 = 0

        for num in nums:
            if num == num1:
                cnt1 += 1
            elif num == num2:
                cnt2 += 1
            elif cnt1 == 0:
                cnt1 = 1
                num1 = num
            elif cnt2 == 0:
                cnt2 = 1
                num2 = num
            else:
                cnt1 -= 1
                cnt2 -= 1

        cnt1 = cnt2 = 0
        for num in nums:
            if num == num1:
                cnt1 += 1
            elif num == num2:
                cnt2 += 1

        res = []
        if cnt1 > n // 3:
            res.append(num1)
        if cnt2 > n // 3:
            res.append(num2)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        int num1 = -1, num2 = -1, cnt1 = 0, cnt2 = 0;

        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                cnt1 = 1;
                num1 = num;
            } else if (cnt2 == 0) {
                cnt2 = 1;
                num2 = num;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            }
        }

        List<Integer> res = new ArrayList<>();
        if (cnt1 > n / 3) res.add(num1);
        if (cnt2 > n / 3) res.add(num2);

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int n = nums.size();
        int num1 = -1, num2 = -1, cnt1 = 0, cnt2 = 0;

        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                num1 = num;
                cnt1 = 1;
            } else if (cnt2 == 0) {
                num2 = num;
                cnt2 = 1;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (int num : nums) {
            if (num == num1) cnt1++;
            else if (num == num2) cnt2++;
        }

        vector<int> res;
        if (cnt1 > n / 3) res.push_back(num1);
        if (cnt2 > n / 3) res.push_back(num2);

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    majorityElement(nums) {
        const n = nums.length;
        let num1 = -1,
            num2 = -1,
            cnt1 = 0,
            cnt2 = 0;

        for (const num of nums) {
            if (num === num1) {
                cnt1++;
            } else if (num === num2) {
                cnt2++;
            } else if (cnt1 === 0) {
                cnt1 = 1;
                num1 = num;
            } else if (cnt2 === 0) {
                cnt2 = 1;
                num2 = num;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (const num of nums) {
            if (num === num1) cnt1++;
            else if (num === num2) cnt2++;
        }

        const res = [];
        if (cnt1 > Math.floor(n / 3)) res.push(num1);
        if (cnt2 > Math.floor(n / 3)) res.push(num2);

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        int n = nums.Length;
        int num1 = -1, num2 = -1;
        int cnt1 = 0, cnt2 = 0;

        foreach (int num in nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                num1 = num;
                cnt1 = 1;
            } else if (cnt2 == 0) {
                num2 = num;
                cnt2 = 1;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        foreach (int num in nums) {
            if (num == num1) cnt1++;
            else if (num == num2) cnt2++;
        }

        List<int> res = new List<int>();
        if (cnt1 > n / 3) res.Add(num1);
        if (cnt2 > n / 3) res.Add(num2);

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since output array size will be at most $2$.

---

## 5. Boyer-Moore Voting Algorithm (Hash Map)

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        count = defaultdict(int)

        for num in nums:
            count[num] += 1

            if len(count) <= 2:
                continue

            new_count = defaultdict(int)
            for num, c in count.items():
                if c > 1:
                    new_count[num] = c - 1
            count = new_count

        res = []
        for num in count:
            if nums.count(num) > len(nums) // 3:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);

            if (count.size() > 2) {
                Map<Integer, Integer> newCount = new HashMap<>();
                for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
                    if (entry.getValue() > 1) {
                        newCount.put(entry.getKey(), entry.getValue() - 1);
                    }
                }
                count = newCount;
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            int frequency = 0;
            for (int num : nums) {
                if (num == key) frequency++;
            }
            if (frequency > nums.length / 3) {
                res.add(key);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> count;

        for (int num : nums) {
            count[num]++;

            if (count.size() > 2) {
                unordered_map<int, int> newCount;
                for (auto& entry : count) {
                    if (entry.second > 1) {
                        newCount[entry.first] = entry.second - 1;
                    }
                }
                count = newCount;
            }
        }

        vector<int> res;
        for (auto& entry : count) {
            int frequency = 0;
            for (int num : nums) {
                if (num == entry.first) frequency++;
            }
            if (frequency > nums.size() / 3) {
                res.push_back(entry.first);
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
     * @return {number[]}
     */
    majorityElement(nums) {
        let count = new Map();

        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);

            if (count.size > 2) {
                const newCount = new Map();
                for (const [key, value] of count.entries()) {
                    if (value > 1) {
                        newCount.set(key, value - 1);
                    }
                }
                count = newCount;
            }
        }

        const res = [];
        for (const [key] of count.entries()) {
            const frequency = nums.filter((num) => num === key).length;
            if (frequency > Math.floor(nums.length / 3)) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }

            if (count.Count <= 2) {
                continue;
            }

            Dictionary<int, int> newCount = new Dictionary<int, int>();
            foreach (var kvp in count) {
                if (kvp.Value > 1) {
                    newCount[kvp.Key] = kvp.Value - 1;
                }
            }
            count = newCount;
        }

        List<int> res = new List<int>();
        foreach (int candidate in count.Keys) {
            int freq = 0;
            foreach (int num in nums) {
                if (num == candidate) {
                    freq++;
                }
            }
            if (freq > nums.Length / 3) {
                res.Add(candidate);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since output array size will be at most $2$.
