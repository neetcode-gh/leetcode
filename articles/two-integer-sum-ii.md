## 1. Brute Force

### Intuition

Brute force ignores the ordering and simply checks every possible pair.
For each index `i`, we look at every index `j > i` and check whether their sum equals the target.  
This approach is easy to understand but inefficient because it tries all combinations without using the sorted property.

### Algorithm

1. Loop through the array using index `i` from `0` to `n - 1`.
2. For each `i`, loop through index `j` from `i + 1` to `n - 1`.
3. If `numbers[i] + numbers[j]` equals the target:
   - Return `[i + 1, j + 1]` (1-indexed as required by the problem).
4. If no such pair is found, return an empty list.


::tabs-start

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        for i in range(len(numbers)):
            for j in range(i + 1, len(numbers)):
                if numbers[i] + numbers[j] == target:
                    return [i + 1, j + 1]
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    return new int[] { i + 1, j + 1 };
                }
            }
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers[i] + numbers[j] == target) {
                    return { i + 1, j + 1 };
                }
            }
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] === target) {
                    return [i + 1, j + 1];
                }
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        for (int i = 0; i < numbers.Length; i++) {
            for (int j = i + 1; j < numbers.Length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    return new int[] { i + 1, j + 1 };
                }
            }
        }
        return new int[0];
    }
}
```

```go
func twoSum(numbers []int, target int) []int {
    for i := 0; i < len(numbers); i++ {
        for j := i + 1; j < len(numbers); j++ {
            if numbers[i]+numbers[j] == target {
                return []int{i + 1, j + 1}
            }
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        for (i in numbers.indices) {
            for (j in i + 1 until numbers.size) {
                if (numbers[i] + numbers[j] == target) {
                    return intArrayOf(i + 1, j + 1)
                }
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
        for i in 0..<numbers.count {
            for j in (i + 1)..<numbers.count {
                if numbers[i] + numbers[j] == target {
                    return [i + 1, j + 1]
                }
            }
        }
        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

Because the array is already sorted, we don’t need to check every pair.  
For each number at index `i`, we know exactly what value we need to find:  
`target - numbers[i]`.  
Since the array is sorted, we can efficiently search for this value using **binary search** instead of scanning linearly.  
This reduces the inner search from **O(n)** to **O(log n)**, making the solution much faster.

### Algorithm

1. Loop through each index `i` from `0` to `n - 1`.
2. For each number `numbers[i]`, compute the needed complement:
   - `tmp = target - numbers[i]`
3. Perform binary search on the subarray from `i + 1` to the end:
   - If `numbers[mid] == tmp`, return `[i + 1, mid + 1]`
   - If `numbers[mid] < tmp`, search the right half
   - Otherwise, search the left half
4. If no pair is found after checking all indices, return an empty list.

::tabs-start

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        for i in range(len(numbers)):
            l, r = i + 1, len(numbers) - 1
            tmp = target - numbers[i]
            while l <= r:
                mid = l + (r - l)//2
                if numbers[mid] == tmp:
                    return [i + 1, mid + 1]
                elif numbers[mid] < tmp:
                    l = mid + 1
                else:
                    r = mid - 1
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        for (int i = 0; i < numbers.length; i++) {
            int l = i + 1, r = numbers.length - 1;
            int tmp = target - numbers[i];
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (numbers[mid] == tmp) {
                    return new int[] { i + 1, mid + 1 };
                } else if (numbers[mid] < tmp) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        for (int i = 0; i < numbers.size(); i++) {
            int l = i + 1, r = numbers.size() - 1;
            int tmp = target - numbers[i];
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (numbers[mid] == tmp) {
                    return { i + 1, mid + 1 };
                } else if (numbers[mid] < tmp) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            let l = i + 1,
                r = numbers.length - 1;
            let tmp = target - numbers[i];
            while (l <= r) {
                let mid = l + Math.floor((r - l) / 2);
                if (numbers[mid] === tmp) {
                    return [i + 1, mid + 1];
                } else if (numbers[mid] < tmp) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        for (int i = 0; i < numbers.Length; i++) {
            int l = i + 1, r = numbers.Length - 1;
            int tmp = target - numbers[i];
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (numbers[mid] == tmp) {
                    return new int[] { i + 1, mid + 1 };
                } else if (numbers[mid] < tmp) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return new int[0];
    }
}
```

```go
func twoSum(numbers []int, target int) []int {
    for i := 0; i < len(numbers); i++ {
        l, r := i+1, len(numbers)-1
        tmp := target - numbers[i]
        for l <= r {
            mid := l + (r-l)/2
            if numbers[mid] == tmp {
                return []int{i + 1, mid + 1}
            } else if numbers[mid] < tmp {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        for (i in numbers.indices) {
            var l = i + 1
            var r = numbers.size - 1
            val tmp = target - numbers[i]
            while (l <= r) {
                val mid = l + (r - l) / 2
                when {
                    numbers[mid] == tmp -> return intArrayOf(i + 1, mid + 1)
                    numbers[mid] < tmp -> l = mid + 1
                    else -> r = mid - 1
                }
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
        for i in 0..<numbers.count {
            var l = i + 1, r = numbers.count - 1
            let tmp = target - numbers[i]

            while l <= r {
                let mid = l + (r - l) / 2
                if numbers[mid] == tmp {
                    return [i + 1, mid + 1]
                } else if numbers[mid] < tmp {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            }
        }
        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

---

## 3. Hash Map

### Intuition

Even though the array is sorted, we can still use a hash map to solve the problem efficiently.  
As we scan through the list, we compute the needed complement for each number.  
If that complement has already been seen earlier (stored in the hash map), then we have found the required pair.  
Otherwise, we store the current number with its **(1-indexed)** position.

### Algorithm

1. Create an empty hash map `mp` that maps numbers to their 1-indexed positions.
2. Loop through the array with index `i` from `0` to `n - 1`:
   - Compute the complement: `tmp = target - numbers[i]`
   - If `tmp` exists in `mp`, return `[mp[tmp], i + 1]`
   - Otherwise, store the current number in the map:
     - `mp[numbers[i]] = i + 1`
3. If no pair is found, return an empty list.

::tabs-start

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        mp = defaultdict(int)
        for i in range(len(numbers)):
            tmp = target - numbers[i]
            if mp[tmp]:
                return [mp[tmp], i + 1]
            mp[numbers[i]] = i + 1
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        Map<Integer, Integer> mp = new HashMap<>();
        for (int i = 0; i < numbers.length; i++) {
            int tmp = target - numbers[i];
            if (mp.containsKey(tmp)) {
                return new int[] { mp.get(tmp), i + 1 };
            }
            mp.put(numbers[i], i + 1);
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < numbers.size(); i++) {
            int tmp = target - numbers[i];
            if (mp.count(tmp)) {
                return { mp[tmp], i + 1 };
            }
            mp[numbers[i]] = i + 1;
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        const mp = new Map();
        for (let i = 0; i < numbers.length; i++) {
            const tmp = target - numbers[i];
            if (mp.has(tmp)) {
                return [mp.get(tmp), i + 1];
            }
            mp.set(numbers[i], i + 1);
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        Dictionary<int, int> mp = new Dictionary<int, int>();
        for (int i = 0; i < numbers.Length; i++) {
            int tmp = target - numbers[i];
            if (mp.ContainsKey(tmp)) {
                return new int[] { mp[tmp], i + 1 };
            }
            mp[numbers[i]] = i + 1;
        }
        return new int[0];
    }
}
```

```go
func twoSum(numbers []int, target int) []int {
    mp := make(map[int]int)
    for i := 0; i < len(numbers); i++ {
        tmp := target - numbers[i]
        if val, exists := mp[tmp]; exists {
            return []int{val, i + 1}
        }
        mp[numbers[i]] = i + 1
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        val mp = HashMap<Int, Int>()
        for (i in numbers.indices) {
            val tmp = target - numbers[i]
            if (mp.containsKey(tmp)) {
                return intArrayOf(mp[tmp]!!, i + 1)
            }
            mp[numbers[i]] = i + 1
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
        var mp = [Int: Int]()

        for i in 0..<numbers.count {
            let tmp = target - numbers[i]
            if let index = mp[tmp] {
                return [index, i + 1]
            }
            mp[numbers[i]] = i + 1
        }

        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Two Pointers

### Intuition

Because the array is sorted, we can use two pointers to adjust the sum efficiently.  
If the current sum is too big, moving the right pointer left makes the sum smaller.  
If the sum is too small, moving the left pointer right makes the sum larger.  
This lets us quickly close in on the target without checking every pair.

### Algorithm

1. Initialize two pointers:
   - `l = 0` (start)
   - `r = len(numbers) - 1` (end)
2. While `l < r`:
   - Compute `curSum = numbers[l] + numbers[r]`.
   - If `curSum > target`, move `r` left to reduce the sum.
   - If `curSum < target`, move `l` right to increase the sum.
   - If `curSum == target`, return `[l + 1, r + 1]`.
3. If no pair matches the target, return an empty list.

::tabs-start

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1

        while l < r:
            curSum = numbers[l] + numbers[r]

            if curSum > target:
                r -= 1
            elif curSum < target:
                l += 1
            else:
                return [l + 1, r + 1]
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;

        while (l < r) {
            int curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return new int[] { l + 1, r + 1 };
            }
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int l = 0, r = numbers.size() - 1;

        while (l < r) {
            int curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return { l + 1, r + 1 };
            }
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0,
            r = numbers.length - 1;

        while (l < r) {
            const curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return [l + 1, r + 1];
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        int l = 0, r = numbers.Length - 1;

        while (l < r) {
            int curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return new int[] { l + 1, r + 1 };
            }
        }
        return new int[0];
    }
}
```

```go
func twoSum(numbers []int, target int) []int {
    l, r := 0, len(numbers) - 1

    for l < r {
        curSum := numbers[l] + numbers[r]
        if curSum > target {
            r--
        } else if curSum < target {
            l++
        } else {
            return []int{l + 1, r + 1}
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        var l = 0
        var r = numbers.size - 1

        while (l < r) {
            val curSum = numbers[l] + numbers[r]
            when {
                curSum > target -> r--
                curSum < target -> l++
                else -> return intArrayOf(l + 1, r + 1)
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
        var l = 0, r = numbers.count - 1

        while l < r {
            let curSum = numbers[l] + numbers[r]

            if curSum > target {
                r -= 1
            } else if curSum < target {
                l += 1
            } else {
                return [l + 1, r + 1]
            }
        }
        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
