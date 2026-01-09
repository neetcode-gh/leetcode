## 1. Brute Force

::tabs-start

```python
class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        tmp = []
        for num in nums:
            if num == val:
                continue
            tmp.append(num)
        for i in range(len(tmp)):
            nums[i] = tmp[i]
        return len(tmp)
```

```java
public class Solution {
    public int removeElement(int[] nums, int val) {
        List<Integer> tmp = new ArrayList<>();
        for (int num : nums) {
            if (num != val) {
                tmp.add(num);
            }
        }
        for (int i = 0; i < tmp.size(); i++) {
            nums[i] = tmp.get(i);
        }
        return tmp.size();
    }
}
```

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        vector<int> tmp;
        for (int num : nums) {
            if (num != val) {
                tmp.push_back(num);
            }
        }
        for (int i = 0; i < tmp.size(); i++) {
            nums[i] = tmp[i];
        }
        return tmp.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        const tmp = [];
        for (const num of nums) {
            if (num !== val) {
                tmp.push(num);
            }
        }
        for (let i = 0; i < tmp.length; i++) {
            nums[i] = tmp[i];
        }
        return tmp.length;
    }
}
```

```csharp
public class Solution {
    public int RemoveElement(int[] nums, int val) {
        List<int> tmp = new List<int>();
        foreach (int num in nums) {
            if (num != val) {
                tmp.Add(num);
            }
        }

        for (int i = 0; i < tmp.Count; i++) {
            nums[i] = tmp[i];
        }

        return tmp.Count;
    }
}
```

```go
func removeElement(nums []int, val int) int {
    tmp := []int{}
    for _, num := range nums {
        if num != val {
            tmp = append(tmp, num)
        }
    }
    for i := 0; i < len(tmp); i++ {
        nums[i] = tmp[i]
    }
    return len(tmp)
}
```

```kotlin
class Solution {
    fun removeElement(nums: IntArray, `val`: Int): Int {
        val tmp = mutableListOf<Int>()
        for (num in nums) {
            if (num != `val`) {
                tmp.add(num)
            }
        }
        for (i in tmp.indices) {
            nums[i] = tmp[i]
        }
        return tmp.size
    }
}
```

```swift
class Solution {
    func removeElement(_ nums: inout [Int], _ val: Int) -> Int {
        var tmp = [Int]()
        for num in nums {
            if num != val {
                tmp.append(num)
            }
        }
        for i in 0..<tmp.count {
            nums[i] = tmp[i]
        }
        return tmp.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers - I

::tabs-start

```python
class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k
```

```java
public class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}
```

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        let k = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}
```

```csharp
public class Solution {
    public int RemoveElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}
```

```go
func removeElement(nums []int, val int) int {
    k := 0
    for i := 0; i < len(nums); i++ {
        if nums[i] != val {
            nums[k] = nums[i]
            k++
        }
    }
    return k
}
```

```kotlin
class Solution {
    fun removeElement(nums: IntArray, `val`: Int): Int {
        var k = 0
        for (i in nums.indices) {
            if (nums[i] != `val`) {
                nums[k++] = nums[i]
            }
        }
        return k
    }
}
```

```swift
class Solution {
    func removeElement(_ nums: inout [Int], _ val: Int) -> Int {
        var k = 0
        for i in 0..<nums.count {
            if nums[i] != val {
                nums[k] = nums[i]
                k += 1
            }
        }
        return k
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers - II

::tabs-start

```python
class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        i = 0
        n = len(nums)
        while i < n:
            if nums[i] == val:
                n -= 1
                nums[i] = nums[n]
            else:
                i += 1
        return n
```

```java
public class Solution {
    public int removeElement(int[] nums, int val) {
        int i = 0, n = nums.length;
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int i = 0, n = nums.size();
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
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
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        let i = 0,
            n = nums.length;
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```csharp
public class Solution {
    public int RemoveElement(int[] nums, int val) {
        int i = 0, n = nums.Length;
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```go
func removeElement(nums []int, val int) int {
    i, n := 0, len(nums)
    for i < n {
        if nums[i] == val {
            n--
            nums[i] = nums[n]
        } else {
            i++
        }
    }
    return n
}
```

```kotlin
class Solution {
    fun removeElement(nums: IntArray, `val`: Int): Int {
        var i = 0
        var n = nums.size
        while (i < n) {
            if (nums[i] == `val`) {
                n--
                nums[i] = nums[n]
            } else {
                i++
            }
        }
        return n
    }
}
```

```swift
class Solution {
    func removeElement(_ nums: inout [Int], _ val: Int) -> Int {
        var i = 0
        var n = nums.count
        while i < n {
            if nums[i] == val {
                n -= 1
                nums[i] = nums[n]
            } else {
                i += 1
            }
        }
        return n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
