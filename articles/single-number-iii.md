## 1. Brute Force

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        n, res = len(nums), []

        for i in range(n):
            flag = True
            for j in range(n):
                if i != j and nums[i] == nums[j]:
                    flag = False
                    break

            if flag:
                res.append(nums[i])
                if len(res) == 2:
                    break

        return res
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int n = nums.length;
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            boolean flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.add(nums[i]);
                if (res.size() == 2) {
                    break;
                }
            }
        }

        return new int[] {res.get(0), res.get(1)};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.push_back(nums[i]);
                if (res.size() == 2) {
                    break;
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
     * @return {number[]}
     */
    singleNumber(nums) {
        const n = nums.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            let flag = true;
            for (let j = 0; j < n; j++) {
                if (i !== j && nums[i] === nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.push(nums[i]);
                if (res.length === 2) {
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int n = nums.Length;
        List<int> res = new List<int>();

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.Add(nums[i]);
                if (res.Count == 2) {
                    break;
                }
            }
        }

        return new int[] { res[0], res[1] };
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        count = {}
        for num in nums:
            count[num] = 1 + count.get(num, 0)

        return [k for k in count if count[k] == 1]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        ArrayList<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            if (count.get(key) == 1) {
                res.add(key);
            }
        }

        return new int[] {res.get(0), res.get(1)};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        vector<int> res;
        for (const auto& pair : count) {
            if (pair.second == 1) {
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
    singleNumber(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (const [key, value] of count) {
            if (value === 1) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }
        }

        List<int> res = new List<int>();
        foreach (var key in count.Keys) {
            if (count[key] == 1) {
                res.Add(key);
            }
        }

        return new int[] { res[0], res[1] };
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        seen = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return list(seen)
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                seen.remove(num);
            } else {
                seen.add(num);
            }
        }

        int[] res = new int[2];
        int index = 0;
        for (int num : seen) {
            res[index++] = num;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        unordered_set<int> seen;
        for (int& num : nums) {
            if (seen.count(num)) {
                seen.erase(num);
            } else {
                seen.insert(num);
            }
        }

        return vector<int>(seen.begin(), seen.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                seen.delete(num);
            } else {
                seen.add(num);
            }
        }

        return Array.from(seen);
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                seen.Remove(num);
            } else {
                seen.Add(num);
            }
        }

        int[] res = new int[2];
        int index = 0;
        foreach (int num in seen) {
            res[index++] = num;
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

## 4. Sorting

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        res, n = [], len(nums)
        nums.sort()

        for i in range(n):
            if ((i > 0 and nums[i] == nums[i - 1]) or
                (i + 1 < n and nums[i] == nums[i + 1])):
                continue
            res.append(nums[i])

        return res
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.add(nums[i]);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.push_back(nums[i]);
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
    singleNumber(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (
                (i > 0 && nums[i] === nums[i - 1]) ||
                (i + 1 < n && nums[i] === nums[i + 1])
            ) {
                continue;
            }
            res.push(nums[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        Array.Sort(nums);
        List<int> res = new List<int>();
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.Add(nums[i]);
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 5. Bitwise XOR (Least Significant Bit)

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for num in nums:
            xor ^= num

        diff_bit = 1
        while not (xor & diff_bit):
            diff_bit <<= 1

        a = b = 0
        for num in nums:
            if diff_bit & num:
                a ^= num
            else:
                b ^= num
        return [a, b]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }

        int diff_bit = 1;
        while ((xor & diff_bit) == 0) {
            diff_bit <<= 1;
        }

        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & diff_bit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{a, b};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int xor_all = 0;
        for (int& num : nums) {
            xor_all ^= num;
        }

        int diff_bit = 1;
        while ((xor_all & diff_bit) == 0) {
            diff_bit <<= 1;
        }

        int a = 0, b = 0;
        for (int& num : nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return {a, b};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        let xor = 0;
        for (const num of nums) {
            xor ^= num;
        }

        let diff_bit = 1;
        while ((xor & diff_bit) === 0) {
            diff_bit <<= 1;
        }

        let a = 0,
            b = 0;
        for (const num of nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return [a, b];
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int xor = 0;
        foreach (int num in nums) {
            xor ^= num;
        }

        int diffBit = 1;
        while ((xor & diffBit) == 0) {
            diffBit <<= 1;
        }

        int a = 0, b = 0;
        foreach (int num in nums) {
            if ((num & diffBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }

        return new int[] { a, b };
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 6. Bitwise XOR (Most Significant Bit)

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for num in nums:
            xor ^= num

        diff_bit = xor & (-xor)

        a = b = 0
        for num in nums:
            if diff_bit & num:
                a ^= num
            else:
                b ^= num
        return [a, b]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }

        int diff_bit = xor & (-xor);

        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & diff_bit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{a, b};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        uint xor_all = 0;
        for (int& num : nums) {
            xor_all ^= num;
        }

        int diff_bit = xor_all & (-xor_all);

        int a = 0, b = 0;
        for (int& num : nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return {a, b};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        let xor = 0;
        for (const num of nums) {
            xor ^= num;
        }

        let diff_bit = xor & -xor;

        let a = 0,
            b = 0;
        for (const num of nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return [a, b];
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int xor = 0;
        foreach (int num in nums) {
            xor ^= num;
        }

        int diffBit = xor & -xor;

        int a = 0, b = 0;
        foreach (int num in nums) {
            if ((num & diffBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }

        return new int[] { a, b };
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
