## 1. Sorting

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        nums.sort()
        for i in range(n):
            if nums[i] != i:
                return i
        return n
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return n;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        let n = nums.length;
        nums.sort((a, b) => a - b);
        for (let i = 0; i < n; i++) {
            if (nums[i] !== i) {
                return i;
            }
        }
        return n;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        Array.Sort(nums);
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return n;
    }
}
```

```go
func missingNumber(nums []int) int {
    n := len(nums)
    sort.Ints(nums)
    for i := 0; i < n; i++ {
        if nums[i] != i {
            return i
        }
    }
    return n
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val n = nums.size
        nums.sort()
        for (i in 0 until n) {
            if (nums[i] != i) {
                return i
            }
        }
        return n
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        num_set = set(nums)
        n = len(nums)
        for i in range(n + 1):
            if i not in num_set:
                return i
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        int n = nums.length;
        for (int i = 0; i <= n; i++) {
            if (!numSet.contains(i)) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i <= n; i++) {
            if (num_set.find(i) == num_set.end()) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        const numSet = new Set(nums);
        const n = nums.length;
        for (let i = 0; i <= n; i++) {
            if (!numSet.has(i)) {
                return i;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        HashSet<int> numSet = new HashSet<int>(nums);
        int n = nums.Length;
        for (int i = 0; i <= n; i++) {
            if (!numSet.Contains(i)) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func missingNumber(nums []int) int {
    numSet := make(map[int]struct{})
    for _, num := range nums {
        numSet[num] = struct{}{}
    }
    n := len(nums)
    for i := 0; i <= n; i++ {
        if _, exists := numSet[i]; !exists {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val numSet = nums.toSet()
        val n = nums.size
        for (i in 0..n) {
            if (i !in numSet) {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Bitwise XOR

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        xorr = n  
        for i in range(n):
            xorr ^= i ^ nums[i]
        return xorr
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int xorr = n;  
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int xorr = n;  
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        let n = nums.length;
        let xorr = n;  
        for (let i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        int xorr = n;  
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```go
func missingNumber(nums []int) int {
    n := len(nums)
    xorr := n
    for i := 0; i < n; i++ {
        xorr ^= i ^ nums[i]
    }
    return xorr
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val n = nums.size
        var xorr = n
        for (i in 0 until n) {
            xorr = xorr xor i xor nums[i]
        }
        return xorr
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 4. Math

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = len(nums)

        for i in range(len(nums)):
            res += i - nums[i]
        return res
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;

        for (int i = 0; i < nums.length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = nums.size();

        for (int i = 0; i < nums.size(); i++) {
            res += i - nums[i];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        let res = nums.length;

        for (let i = 0; i < nums.length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int res = nums.Length;

        for (int i = 0; i < nums.Length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```go
func missingNumber(nums []int) int {
    res := len(nums)
    for i := 0; i < len(nums); i++ {
        res += i - nums[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        var res = nums.size
        for (i in nums.indices) {
            res += i - nums[i]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$