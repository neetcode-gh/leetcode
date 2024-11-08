## 1. Brute Force

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n

        for i in range(n):
            prod = 1
            for j in range(n):
                if i == j:
                    continue    
                prod *= nums[j]
            
            res[i] = prod
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}  
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
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
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);

        for (let i = 0; i < n; i++) {
            let prod = 1;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    res := make([]int, n)

    for i := 0; i < n; i++ {
        prod := 1
        for j := 0; j < n; j++ {
            if i == j {
                continue
            }
            prod *= nums[j]
        }
        res[i] = prod
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)

        for (i in 0 until n) {
            var prod = 1
            for (j in 0 until n) {
                if (i == j) continue
                prod *= nums[j]
            }
            res[i] = prod
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Division

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        prod, zero_cnt = 1, 0
        for num in nums:
            if num:
                prod *= num
            else:
                zero_cnt +=  1
        if zero_cnt > 1: return [0] * len(nums)

        res = [0] * len(nums)
        for i, c in enumerate(nums):
            if zero_cnt: res[i] = 0 if c else prod
            else: res[i] = prod // c
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int prod = 1, zeroCount = 0;
        for (int num : nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }
        
        if (zeroCount > 1) {
            return new int[nums.length]; 
        }

        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}  
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int prod = 1, zeroCount = 0;
        for (int num : nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return vector<int>(nums.size(), 0); 
        }

        vector<int> res(nums.size());
        for (size_t i = 0; i < nums.size(); i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
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
    productExceptSelf(nums) {
        let prod = 1;
        let zeroCount = 0;
        for (let num of nums) {
            if (num !== 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return Array(nums.length).fill(0); 
        }

        const res = new Array(nums.length);
        for (let i = 0; i < nums.length; i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] === 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int prod = 1, zeroCount = 0;
        foreach (int num in nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return new int[nums.Length]; 
        }

        int[] res = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    prod := 1
    zeroCount := 0

    for _, num := range nums {
        if num != 0 {
            prod *= num
        } else {
            zeroCount++
        }
    }
    
    res := make([]int, len(nums))
    if zeroCount > 1 {
        return res
    }

    for i, num := range nums {
        if zeroCount > 0 {
            if num == 0 {
                res[i] = prod
            } else {
                res[i] = 0
            }
        } else {
            res[i] = prod / num
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        var prod = 1
        var zeroCount = 0

        for (num in nums) {
            if (num != 0) {
                prod *= num
            } else {
                zeroCount++
            }
        }
        
        val res = IntArray(nums.size)
        if (zeroCount > 1) return res

        for (i in nums.indices) {
            res[i] = if (zeroCount > 0) {
                if (nums[i] == 0) prod else 0
            } else {
                prod / nums[i]
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Prefix & Suffix 

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        pref = [0] * n
        suff = [0] * n

        pref[0] = suff[n - 1] = 1
        for i in range(1, n):
            pref[i] = nums[i - 1] * pref[i - 1]
        for i in range(n - 2, -1, -1):
            suff[i] = nums[i + 1] * suff[i + 1]
        for i in range(n):
            res[i] = pref[i] * suff[i] 
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int[] pref = new int[n];
        int[] suff = new int[n];

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}  
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        vector<int> pref(n);
        vector<int> suff(n);

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
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
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);
        const pref = new Array(n);
        const suff = new Array(n);

        pref[0] = 1;
        suff[n - 1] = 1;
        for (let i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (let i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (let i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        int[] pref = new int[n];
        int[] suff = new int[n];

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    pref := make([]int, n)
    suff := make([]int, n)

    pref[0], suff[n-1] = 1, 1
    for i := 1; i < n; i++ {
        pref[i] = nums[i-1] * pref[i-1]
    }
    for i := n - 2; i >= 0; i-- {
        suff[i] = nums[i+1] * suff[i+1]
    }
    for i := 0; i < n; i++ {
        res[i] = pref[i] * suff[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        val pref = IntArray(n)
        val suff = IntArray(n)

        pref[0] = 1
        suff[n - 1] = 1
        for (i in 1 until n) {
            pref[i] = nums[i - 1] * pref[i - 1]
        }
        for (i in n - 2 downTo 0) {
            suff[i] = nums[i + 1] * suff[i + 1]
        }
        for (i in 0 until n) {
            res[i] = pref[i] * suff[i]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Prefix & Suffix (Optimal) 

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        res = [1] * (len(nums))

        prefix = 1
        for i in range(len(nums)):
            res[i] = prefix
            prefix *= nums[i]
        postfix = 1
        for i in range(len(nums) - 1, -1, -1):
            res[i] *= postfix
            postfix *= nums[i]
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}  
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);

        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
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
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n).fill(1);

        for (let i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        let postfix = 1;
        for (let i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        Array.Fill(res, 1);

        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    res := make([]int, len(nums))
    for i := range res {
        res[i] = 1
    }

    prefix := 1
    for i := 0; i < len(nums); i++ {
        res[i] = prefix
        prefix *= nums[i]
    }

    postfix := 1
    for i := len(nums) - 1; i >= 0; i-- {
        res[i] *= postfix
        postfix *= nums[i]
    }

    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val res = IntArray(nums.size) { 1 }

        var prefix = 1
        for (i in nums.indices) {
            res[i] = prefix
            prefix *= nums[i]
        }

        var postfix = 1
        for (i in nums.size - 1 downTo 0) {
            res[i] *= postfix
            postfix *= nums[i]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$