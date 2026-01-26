## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Mapping values to indices for O(1) lookups
- **Monotonic Stack** - Maintaining a stack in decreasing order to find next greater elements efficiently
- **Array Traversal** - Iterating through arrays from different directions

---

## 1. Brute Force

### Intuition

For each element in `nums1`, we need to find it in `nums2` and then look for the first larger element to its right. The simplest approach scans `nums2` from right to left: track the largest element seen so far that is greater than our target. When we hit the target element, we have our answer.

This works but is inefficient since we repeat the scan for every element in `nums1`.

### Algorithm

1. For each number in `nums1`:
   - Scan `nums2` from right to left.
   - Track the most recent element that is greater than the current number.
   - When we find the current number in `nums2`, stop and record the tracked greater element (or `-1` if none found).
2. Return the results.

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

```csharp
public class Solution {
    public int[] NextGreaterElement(int[] nums1, int[] nums2) {
        int n = nums2.Length;
        int[] res = new int[nums1.Length];

        for (int i = 0; i < nums1.Length; i++) {
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

```go
func nextGreaterElement(nums1 []int, nums2 []int) []int {
    n := len(nums2)
    res := make([]int, len(nums1))

    for i, num := range nums1 {
        nextGreater := -1
        for j := n - 1; j >= 0; j-- {
            if nums2[j] > num {
                nextGreater = nums2[j]
            } else if nums2[j] == num {
                break
            }
        }
        res[i] = nextGreater
    }

    return res
}
```

```kotlin
class Solution {
    fun nextGreaterElement(nums1: IntArray, nums2: IntArray): IntArray {
        val n = nums2.size
        val res = IntArray(nums1.size)

        for (i in nums1.indices) {
            var nextGreater = -1
            for (j in n - 1 downTo 0) {
                if (nums2[j] > nums1[i]) {
                    nextGreater = nums2[j]
                } else if (nums2[j] == nums1[i]) {
                    break
                }
            }
            res[i] = nextGreater
        }

        return res
    }
}
```

```swift
class Solution {
    func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        let n = nums2.count
        var res = [Int]()

        for num in nums1 {
            var nextGreater = -1
            for j in stride(from: n - 1, through: 0, by: -1) {
                if nums2[j] > num {
                    nextGreater = nums2[j]
                } else if nums2[j] == num {
                    break
                }
            }
            res.append(nextGreater)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.

---

## 2. Hash Map

### Intuition

Instead of scanning from the end each time, we can iterate through `nums2` from left to right. For each element that appears in `nums1`, we look ahead to find the next greater element. A hash map stores the index of each `nums1` element, so we can quickly check if a number from `nums2` is one we care about.

This is still O(m * n) in the worst case, but we skip elements not in `nums1`.

### Algorithm

1. Build a hash map that maps each element in `nums1` to its index.
2. Initialize result array with all `-1` values.
3. Iterate through `nums2`. For each element that exists in the hash map:
   - Scan forward to find the first greater element.
   - Store the result at the corresponding index.
4. Return the result array.

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

```csharp
public class Solution {
    public int[] NextGreaterElement(int[] nums1, int[] nums2) {
        Dictionary<int, int> nums1Idx = new Dictionary<int, int>();
        for (int i = 0; i < nums1.Length; i++) {
            nums1Idx[nums1[i]] = i;
        }

        int[] res = new int[nums1.Length];
        Array.Fill(res, -1);

        for (int i = 0; i < nums2.Length; i++) {
            if (!nums1Idx.ContainsKey(nums2[i])) {
                continue;
            }

            for (int j = i + 1; j < nums2.Length; j++) {
                if (nums2[j] > nums2[i]) {
                    int idx = nums1Idx[nums2[i]];
                    res[idx] = nums2[j];
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func nextGreaterElement(nums1 []int, nums2 []int) []int {
    nums1Idx := make(map[int]int)
    for i, num := range nums1 {
        nums1Idx[num] = i
    }

    res := make([]int, len(nums1))
    for i := range res {
        res[i] = -1
    }

    for i := 0; i < len(nums2); i++ {
        if _, ok := nums1Idx[nums2[i]]; !ok {
            continue
        }
        for j := i + 1; j < len(nums2); j++ {
            if nums2[j] > nums2[i] {
                idx := nums1Idx[nums2[i]]
                res[idx] = nums2[j]
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun nextGreaterElement(nums1: IntArray, nums2: IntArray): IntArray {
        val nums1Idx = HashMap<Int, Int>()
        for (i in nums1.indices) {
            nums1Idx[nums1[i]] = i
        }

        val res = IntArray(nums1.size) { -1 }

        for (i in nums2.indices) {
            if (nums2[i] !in nums1Idx) {
                continue
            }
            for (j in i + 1 until nums2.size) {
                if (nums2[j] > nums2[i]) {
                    val idx = nums1Idx[nums2[i]]!!
                    res[idx] = nums2[j]
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var nums1Idx = [Int: Int]()
        for (i, num) in nums1.enumerated() {
            nums1Idx[num] = i
        }

        var res = Array(repeating: -1, count: nums1.count)

        for i in 0..<nums2.count {
            guard let _ = nums1Idx[nums2[i]] else {
                continue
            }
            for j in (i + 1)..<nums2.count {
                if nums2[j] > nums2[i] {
                    let idx = nums1Idx[nums2[i]]!
                    res[idx] = nums2[j]
                    break
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.

---

## 3. Stack

### Intuition

A monotonic stack solves this problem in linear time. We iterate through `nums2` and maintain a stack of elements that have not yet found their next greater element. When we encounter a larger element, it becomes the "next greater" for all smaller elements on the stack.

The stack maintains decreasing order from bottom to top. When a new element is larger than the stack top, we pop elements and record the current element as their next greater. We only push elements that are in `nums1` since those are the only ones we need answers for.

### Algorithm

1. Build a hash map that maps each element in `nums1` to its index.
2. Initialize result array with all `-1` values.
3. Iterate through `nums2` with a stack:
   - While the stack is not empty and the current element is greater than the stack top:
     - Pop the top, find its index in `nums1`, and set `result[index]` to current element.
   - If current element is in `nums1`, push it onto the stack.
4. Return the result array.

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

```csharp
public class Solution {
    public int[] NextGreaterElement(int[] nums1, int[] nums2) {
        Dictionary<int, int> nums1Idx = new Dictionary<int, int>();
        for (int i = 0; i < nums1.Length; i++) {
            nums1Idx[nums1[i]] = i;
        }

        int[] res = new int[nums1.Length];
        for (int i = 0; i < res.Length; i++) {
            res[i] = -1;
        }

        Stack<int> stack = new Stack<int>();
        foreach (int num in nums2) {
            while (stack.Count > 0 && num > stack.Peek()) {
                int val = stack.Pop();
                if (nums1Idx.ContainsKey(val)) {
                    int idx = nums1Idx[val];
                    res[idx] = num;
                }
            }
            if (nums1Idx.ContainsKey(num)) {
                stack.Push(num);
            }
        }

        return res;
    }
}
```

```go
func nextGreaterElement(nums1 []int, nums2 []int) []int {
    nums1Idx := make(map[int]int)
    for i, num := range nums1 {
        nums1Idx[num] = i
    }

    res := make([]int, len(nums1))
    for i := range res {
        res[i] = -1
    }

    stack := []int{}
    for _, num := range nums2 {
        for len(stack) > 0 && num > stack[len(stack)-1] {
            val := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            idx := nums1Idx[val]
            res[idx] = num
        }
        if _, ok := nums1Idx[num]; ok {
            stack = append(stack, num)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun nextGreaterElement(nums1: IntArray, nums2: IntArray): IntArray {
        val nums1Idx = HashMap<Int, Int>()
        for (i in nums1.indices) {
            nums1Idx[nums1[i]] = i
        }

        val res = IntArray(nums1.size) { -1 }
        val stack = ArrayDeque<Int>()

        for (num in nums2) {
            while (stack.isNotEmpty() && num > stack.last()) {
                val value = stack.removeLast()
                val idx = nums1Idx[value]!!
                res[idx] = num
            }
            if (num in nums1Idx) {
                stack.addLast(num)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var nums1Idx = [Int: Int]()
        for (i, num) in nums1.enumerated() {
            nums1Idx[num] = i
        }

        var res = Array(repeating: -1, count: nums1.count)
        var stack = [Int]()

        for num in nums2 {
            while !stack.isEmpty && num > stack.last! {
                let val = stack.removeLast()
                let idx = nums1Idx[val]!
                res[idx] = num
            }
            if nums1Idx[num] != nil {
                stack.append(num)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ is the size of the array $nums1$ and $n$ is the size of the array $nums2$.

---

## Common Pitfalls

### Searching in Wrong Array

The next greater element must be found in `nums2`, to the right of where the element appears in `nums2`. Some solutions mistakenly look for the next greater element within `nums1` or search to the left instead of right in `nums2`.

### Pushing All Elements onto Stack

The stack optimization only needs to track elements from `nums1` that are waiting for their next greater element. Pushing every element from `nums2` onto the stack works but uses unnecessary space. Only push elements that exist in the `nums1` lookup map.
