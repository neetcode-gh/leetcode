## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Bit Manipulation (XOR)** - The optimal solution relies on XOR properties: a ^ a = 0 and a ^ 0 = a
- **Hash Set** - Used in O(n) space solutions to track which numbers have been seen
- **Sorting** - Alternative approach that groups duplicates together for easy identification

---

## 1. Brute Force

### Intuition

We are given an array where **every element appears twice except one**, and we need to find that unique element.

The brute force idea is straightforward:
- for each element in the array
- check whether it appears **anywhere else**
- if it does not match with any other element, then it must be the single number

This approach is simple and easy to understand, especially for beginners, because it directly follows the problem statement without using extra data structures or clever tricks.

### Algorithm

1. Loop through each index `i` in the array:
2. Assume the current element `nums[i]` is unique (`flag = true`).
3. Loop through the array again with index `j`:
   - If `i != j` and `nums[i] == nums[j]`:
     - the element is not unique
     - set `flag = false` and stop checking
4. After the inner loop:
   - If `flag` is still `true`, return `nums[i]`
5. Since the problem guarantees exactly one unique element, the function will always return an answer.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        for i in range(len(nums)):
            flag = True
            for j in range(len(nums)):
                if i != j and nums[i] == nums[j]:
                    flag = False
                    break
            if flag:
                return nums[i]
```

```java
public class Solution {
    public int singleNumber(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            boolean flag = true;
            for (int j = 0; j < nums.length; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            bool flag = true;
            for (int j = 0; j < nums.size(); j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return nums[i];
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
    singleNumber(nums) {
        for (let i = 0; i < nums.length; i++) {
            let flag = true;
            for (let j = 0; j < nums.length; j++) {
                if (i !== j && nums[i] === nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SingleNumber(int[] nums) {
        for (int i = 0; i < nums.Length; i++) {
            bool flag = true;
            for (int j = 0; j < nums.Length; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```go
func singleNumber(nums []int) int {
    for i := 0; i < len(nums); i++ {
        flag := true
        for j := 0; j < len(nums); j++ {
            if i != j && nums[i] == nums[j] {
                flag = false
                break
            }
        }
        if flag {
            return nums[i]
        }
    }
    return 0
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): Int {
        for (i in 0..nums.size - 1) {
            var flag = true
            for (j in 0..nums.size - 1) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false
                    break
                }
            }
            if (flag) return nums[i]
        }
        return 0
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        for i in 0..<nums.count {
            var flag = true
            for j in 0..<nums.count {
                if i != j && nums[i] == nums[j] {
                    flag = false
                    break
                }
            }
            if flag {
                return nums[i]
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Set

### Intuition

We are given an array where **every number appears exactly twice except one**, and we need to find that single number.

A convenient way to solve this is by using a **hash set** to track numbers as we iterate:
- when we see a number **for the first time**, we add it to the set
- when we see the **same number again**, we remove it from the set

Because:
- duplicates are added once and removed once
- only the number that appears **exactly once** will remain in the set

At the end, the set will contain **only one element**, which is the answer.

### Algorithm

1. Initialize an empty set `seen`.
2. Traverse each number `num` in the array:
   - If `num` is already in `seen`:
     - remove it from the set
   - Otherwise:
     - add it to the set
3. After processing all numbers:
   - the set contains exactly one element
4. Return the only element from the set.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        seen = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return list(seen)[0]
```

```java
public class Solution {
    public int singleNumber(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                seen.remove(num);
            } else {
                seen.add(num);
            }
        }
        return seen.iterator().next();
    }
}
```

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) {
                seen.erase(num);
            } else {
                seen.insert(num);
            }
        }
        return *seen.begin();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
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
        return Array.from(seen)[0];
    }
}
```

```csharp
public class Solution {
    public int SingleNumber(int[] nums) {
        var seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                seen.Remove(num);
            } else {
                seen.Add(num);
            }
        }
        foreach (int num in seen) {
            return num;
        }
        return -1;
    }
}
```

```go
func singleNumber(nums []int) int {
	seen := make(map[int]bool)
	for _, num := range nums {
		if seen[num] {
			delete(seen, num)
		} else {
			seen[num] = true
		}
	}
	for num := range seen {
		return num
	}
	return -1
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): Int {
        val seen = HashSet<Int>()
        for (num in nums) {
            if (num in seen) {
                seen.remove(num)
            } else {
                seen.add(num)
            }
        }
        return seen.first()
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        var seen = Set<Int>()

        for num in nums {
            if seen.contains(num) {
                seen.remove(num)
            } else {
                seen.insert(num)
            }
        }

        return seen.first!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sorting

### Intuition

We are given an array where **every element appears exactly twice except one**, and we need to find that unique element.

Sorting helps simplify the problem:
- after sorting, **duplicate numbers appear next to each other**
- the single number will be the **only element that does not have an identical neighbor**

So we can scan the array in steps of two:
- if `nums[i] == nums[i + 1]`, they form a valid pair → skip both
- if they are not equal, then `nums[i]` must be the unique element

This approach avoids extra space and relies on the structure created by sorting.

### Algorithm

1. Sort the array `nums`.
2. Initialize an index `i = 0`.
3. While `i < len(nums) - 1`:
   - If `nums[i] == nums[i + 1]`:
     - move to the next pair by setting `i += 2`
   - Else:
     - return `nums[i]` (this is the single number)
4. If the loop ends, the unique element must be the **last element**:
   - return `nums[i]`

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        nums.sort()
        i = 0
        while i < len(nums) - 1:
            if nums[i] == nums[i + 1]:
                i += 2
            else:
                return nums[i]
        return nums[i]
```

```java
public class Solution {
    public int singleNumber(int[] nums) {
        Arrays.sort(nums);
        int i = 0;
        while (i < nums.length - 1) {
            if (nums[i] == nums[i + 1]) {
                i += 2;
            } else {
                return nums[i];
            }
        }
        return nums[i];
    }
}
```

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        sort(begin(nums), end(nums));
        int i = 0;
        while (i < nums.size() - 1) {
            if (nums[i] == nums[i + 1]) {
                i += 2;
            } else {
                return nums[i];
            }
        }
        return nums[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNumber(nums) {
        nums.sort((a, b) => a - b);
        let i = 0;
        while (i < nums.length - 1) {
            if (nums[i] === nums[i + 1]) {
                i += 2;
            } else {
                return nums[i];
            }
        }
        return nums[i];
    }
}
```

```csharp
public class Solution {
    public int SingleNumber(int[] nums) {
        Array.Sort(nums);
        int i = 0;
        while (i < nums.Length - 1) {
            if (nums[i] == nums[i + 1]) {
                i += 2;
            } else {
                return nums[i];
            }
        }
        return nums[i];
    }
}
```

```go
func singleNumber(nums []int) int {
	sort.Ints(nums)
	i := 0
	for i < len(nums)-1 {
		if nums[i] == nums[i+1] {
			i += 2
		} else {
			return nums[i]
		}
	}
	return nums[i]
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): Int {
        nums.sort()
        var i = 0
        while (i < nums.size - 1) {
            if (nums[i] == nums[i + 1]) {
                i += 2
            } else {
                return nums[i]
            }
        }
        return nums[i]
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        var nums = nums.sorted()
        var i = 0

        while i < nums.count - 1 {
            if nums[i] == nums[i + 1] {
                i += 2
            } else {
                return nums[i]
            }
        }

        return nums[i]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Bit Manipulation

### Intuition

We are given an array where **every number appears exactly twice except one**, and we need to find that unique number.

This problem is a perfect fit for **bit manipulation**, specifically the XOR (`^`) operation.

Key properties of XOR:
- `a ^ a = 0` (a number XORed with itself cancels out)
- `a ^ 0 = a` (XOR with `0` keeps the number unchanged)
- XOR is **commutative and associative**, so order does not matter

Because of these properties:
- all numbers that appear twice will cancel each other out
- the number that appears once will remain

### Algorithm

1. Initialize `res = 0`.
2. Iterate through each number in the array:
   - update `res = res ^ num`
3. After processing all numbers:
   - `res` contains the single number
4. Return `res`.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res = num ^ res
        return res
```

```java
public class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int num : nums) {
            res ^= num;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int num : nums) {
            res ^= num;
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
    singleNumber(nums) {
        let res = 0;
        for (const num of nums) {
            res ^= num;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SingleNumber(int[] nums) {
        int res = 0;
        foreach (int num in nums) {
            res ^= num;
        }
        return res;
    }
}
```

```go
func singleNumber(nums []int) int {
	res := 0
	for _, num := range nums {
		res ^= num
	}
	return res
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): Int {
        var res = 0
        for (num in nums) {
            res = res xor num
        }
        return res
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        var res = 0
        for num in nums {
            res ^= num
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Not Knowing XOR Properties

The optimal solution relies on understanding that `a ^ a = 0` and `a ^ 0 = a`. Candidates unfamiliar with bitwise operations often resort to hash sets or sorting, missing the elegant $O(1)$ space solution. Memorizing these XOR properties is essential for bit manipulation problems.

### Using Extra Space Unnecessarily

A common mistake is implementing a hash map or set to track occurrences when the problem explicitly asks for $O(1)$ extra space. While these approaches work functionally, they fail to meet the space constraint and miss the intended learning objective of the problem.
