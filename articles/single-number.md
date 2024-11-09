## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Hash Set

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Sorting

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Bit Manipulation

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$