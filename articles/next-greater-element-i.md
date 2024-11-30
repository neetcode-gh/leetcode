## 1. Brute Force

::tabs-start

```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        n = len(nums2)
        res = []
        for num in nums1:
            nextGreater = -1
            for i in range(n - 1, -1, -1):
                if nums2[i] > num:
                    nextGreater = nums2[i]
                elif nums2[i] == num:
                    break
            res.append(nextGreater)
        return res
```

```java
public class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int n = nums2.length;
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            int nextGreater = -1;
            for (int j = n - 1; j >= 0; j--) {
                if (nums2[j] > nums1[i]) {
                    nextGreater = nums2[j];
                } else if (nums2[j] == nums1[i]) {
                    break;
                }
            }
            res[i] = nextGreater;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        int n = nums2.size();
        vector<int> res;
        for (int num : nums1) {
            int nextGreater = -1;
            for (int i = n - 1; i >= 0; i--) {
                if (nums2[i] > num) {
                    nextGreater = nums2[i];
                } else if (nums2[i] == num) {
                    break;
                }
            }
            res.push_back(nextGreater);
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
    nextGreaterElement(nums1, nums2) {
        const n = nums2.length;
        const res = [];
        for (const num of nums1) {
            let nextGreater = -1;
            for (let i = n - 1; i >= 0; i--) {
                if (nums2[i] > num) {
                    nextGreater = nums2[i];
                } else if (nums2[i] === num) {
                    break;
                }
            }
            res.push(nextGreater);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1Idx = {num : i for i, num in enumerate(nums1)}
        res = [-1] * len(nums1)

        for i in range(len(nums2)):
            if nums2[i] not in nums1Idx:
                continue
            for j in range(i + 1, len(nums2)):
                if nums2[j] > nums2[i]:
                    idx = nums1Idx[nums2[i]]
                    res[idx] = nums2[j]
                    break
        return res
```

```java
public class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        HashMap<Integer, Integer> nums1Idx = new HashMap<>();
        for (int i = 0; i < nums1.length; i++) {
            nums1Idx.put(nums1[i], i);
        }
        
        int[] res = new int[nums1.length];
        Arrays.fill(res, -1);

        for (int i = 0; i < nums2.length; i++) {
            if (!nums1Idx.containsKey(nums2[i])) {
                continue;
            }
            for (int j = i + 1; j < nums2.length; j++) {
                if (nums2[j] > nums2[i]) {
                    int idx = nums1Idx.get(nums2[i]);
                    res[idx] = nums2[j];
                    break;
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
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nums1Idx;
        for (int i = 0; i < nums1.size(); i++) {
            nums1Idx[nums1[i]] = i;
        }

        vector<int> res(nums1.size(), -1);

        for (int i = 0; i < nums2.size(); i++) {
            if (nums1Idx.find(nums2[i]) == nums1Idx.end()) {
                continue;
            }
            for (int j = i + 1; j < nums2.size(); j++) {
                if (nums2[j] > nums2[i]) {
                    int idx = nums1Idx[nums2[i]];
                    res[idx] = nums2[j];
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
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    nextGreaterElement(nums1, nums2) {
        const nums1Idx = new Map();
        nums1.forEach((num, i) => nums1Idx.set(num, i));
        
        const res = new Array(nums1.length).fill(-1);

        for (let i = 0; i < nums2.length; i++) {
            if (!nums1Idx.has(nums2[i])) {
                continue;
            }
            for (let j = i + 1; j < nums2.length; j++) {
                if (nums2[j] > nums2[i]) {
                    const idx = nums1Idx.get(nums2[i]);
                    res[idx] = nums2[j];
                    break;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.

---

## 3. Stack

::tabs-start

```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1Idx = {num : i for i, num in enumerate(nums1)}
        res = [-1] * len(nums1)

        stack = []
        for i in range(len(nums2)):
            cur = nums2[i]
            while stack and cur > stack[-1]:
                val = stack.pop()
                idx = nums1Idx[val]
                res[idx] = cur
            if cur in nums1Idx:
                stack.append(cur)
        return res
```

```java
public class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        HashMap<Integer, Integer> nums1Idx = new HashMap<>();
        for (int i = 0; i < nums1.length; i++) {
            nums1Idx.put(nums1[i], i);
        }

        int[] res = new int[nums1.length];
        for (int i = 0; i < res.length; i++) {
            res[i] = -1;
        }

        Stack<Integer> stack = new Stack<>();
        for (int num : nums2) {
            while (!stack.isEmpty() && num > stack.peek()) {
                int val = stack.pop();
                int idx = nums1Idx.get(val);
                res[idx] = num;
            }
            if (nums1Idx.containsKey(num)) {
                stack.push(num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nums1Idx;
        for (int i = 0; i < nums1.size(); i++) {
            nums1Idx[nums1[i]] = i;
        }

        vector<int> res(nums1.size(), -1);
        stack<int> stack;
        
        for (int num : nums2) {
            while (!stack.empty() && num > stack.top()) {
                int val = stack.top();
                stack.pop();
                int idx = nums1Idx[val];
                res[idx] = num;
            }
            if (nums1Idx.find(num) != nums1Idx.end()) {
                stack.push(num);
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
    nextGreaterElement(nums1, nums2) {
        const nums1Idx = new Map();
        nums1.forEach((num, i) => nums1Idx.set(num, i));
        
        const res = new Array(nums1.length).fill(-1);
        const stack = [];

        for (let num of nums2) {
            while (stack.length && num > stack[stack.length - 1]) {
                const val = stack.pop();
                const idx = nums1Idx.get(val);
                res[idx] = num;
            }
            if (nums1Idx.has(num)) {
                stack.push(num);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(m)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.