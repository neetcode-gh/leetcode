## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = nums[0]

        for i in range(len(nums)):
            cur = nums[i]
            res = max(res, cur)
            for j in range(i + 1, len(nums)):
                cur *= nums[j]
                res = max(res, cur)
                
        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];

        for (int i = 0; i < nums.length; i++) {
            int cur = nums[i];
            res = Math.max(res, cur);
            for (int j = i + 1; j < nums.length; j++) {
                cur *= nums[j];
                res = Math.max(res, cur);
            }
        }
        
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];

        for (int i = 0; i < nums.size(); i++) {
            int cur = nums[i];
            res = max(res, cur);
            for (int j = i + 1; j < nums.size(); j++) {
                cur *= nums[j];
                res = max(res, cur);
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
     * @return {number}
     */
    maxProduct(nums) {
        let res = nums[0];

        for (let i = 0; i < nums.length; i++) {
            let cur = nums[i];
            res = Math.max(res, cur);
            for (let j = i + 1; j < nums.length; j++) {
                cur *= nums[j];
                res = Math.max(res, cur);
            }
        }
        
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int res = nums[0];

        for (int i = 0; i < nums.Length; i++) {
            int cur = nums[i];
            res = Math.Max(res, cur);
            for (int j = i + 1; j < nums.Length; j++) {
                cur *= nums[j];
                res = Math.Max(res, cur);
            }
        }
        
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := nums[0]
    for i := 0; i < len(nums); i++ {
        cur := nums[i]
        res = max(res, cur)
        for j := i + 1; j < len(nums); j++ {
            cur *= nums[j]
            res = max(res, cur)
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = nums[0]
        for (i in nums.indices) {
            var cur = nums[i]
            res = maxOf(res, cur)
            for (j in i + 1 until nums.size) {
                cur *= nums[j]
                res = maxOf(res, cur)
            }
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

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        A = []
        cur = []
        res = float('-inf')

        for num in nums:
            res = max(res, num)
            if num == 0:
                if cur:
                    A.append(cur)
                cur = []
            else:
                cur.append(num)

        if cur:
            A.append(cur)

        for sub in A:
            negs = sum(1 for i in sub if i < 0)
            prod = 1
            need = negs if negs % 2 == 0 else negs - 1
            negs = 0
            j = 0

            for i in range(len(sub)):
                prod *= sub[i]
                if sub[i] < 0:
                    negs += 1
                    while negs > need:
                        prod //= sub[j]
                        if sub[j] < 0:
                            negs -= 1
                        j += 1
                if j <= i:
                    res = max(res, prod)

        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        List<List<Integer>> A = new ArrayList<>();
        List<Integer> cur = new ArrayList<>();
        int res = Integer.MIN_VALUE;

        for (int num : nums) {
            res = Math.max(res, num);
            if (num == 0) {
                if (!cur.isEmpty()) A.add(cur);
                cur = new ArrayList<>();
            } else cur.add(num);
        }
        if (!cur.isEmpty()) A.add(cur);

        for (List<Integer> sub : A) {
            int negs = 0;
            for (int i : sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.size(); i++) {
                prod *= sub.get(i);
                if (sub.get(i) < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub.get(j);
                        if (sub.get(j) < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.max(res, prod);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        vector<vector<int>> A;
        vector<int> cur;
        int res = INT_MIN;
        for (auto& num : nums) {
            res = max(res, num);
            if (num == 0) {
                if (!cur.empty()) A.push_back(cur);
                cur.clear();
            } else cur.push_back(num);
        }
        if (!cur.empty()) {
            A.push_back(cur);
        }

        for (auto& sub : A) {
            int negs = 0;
            for (auto& i : sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.size(); i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = max(res, prod);
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
     * @return {number}
     */
    maxProduct(nums) {
        let A = [];
        let cur = [];
        let res = -Infinity;

        nums.forEach(num => {
            res = Math.max(res, num);
            if (num === 0) {
                if (cur.length) A.push(cur);
                cur = [];
            } else {
                cur.push(num);
            }
        });
        if (cur.length) A.push(cur);

        A.forEach(sub => {
            let negs = 0;
            sub.forEach(i => {
                if (i < 0) negs++;
            });

            let prod = 1;
            let need = (negs % 2 === 0) ? negs : (negs - 1);
            negs = 0;
            for (let i = 0, j = 0; i < sub.length; i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.max(res, prod);
            }
        });

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        List<List<int>> A = new List<List<int>>();
        List<int> cur = new List<int>();
        int res = int.MinValue;

        foreach (int num in nums) {
            res = Math.Max(res, num);
            if (num == 0) {
                if (cur.Count > 0) {
                    A.Add(new List<int>(cur));
                }
                cur.Clear();
            } else cur.Add(num);
        }
        if (cur.Count > 0) A.Add(new List<int>(cur));

        foreach (var sub in A) {
            int negs = 0;
            foreach (var i in sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.Count; i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.Max(res, prod);
            }
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := math.MinInt32
    for _, num := range nums {
        res = max(res, num)
    }

    var A [][]int
    var cur []int
    for _, num := range nums {
        if num == 0 {
            if len(cur) > 0 {
                A = append(A, cur)
            }
            cur = nil
        } else {
            cur = append(cur, num)
        }
    }
    if len(cur) > 0 {
        A = append(A, cur)
    }

    for _, sub := range A {
        negs := 0
        for _, i := range sub {
            if i < 0 {
                negs++
            }
        }
        prod := 1
        need := negs
        if negs%2 != 0 {
            need = negs - 1
        }
        negs = 0
        j := 0
        for i := range sub {
            prod *= sub[i]
            if sub[i] < 0 {
                negs++
                for negs > need {
                    prod /= sub[j]
                    if sub[j] < 0 {
                        negs--
                    }
                    j++
                }
            }
            if j <= i {
                res = max(res, prod)
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = Int.MIN_VALUE
        for (num in nums) {
            res = maxOf(res, num)
        }

        val A = mutableListOf<MutableList<Int>>()
        var cur = mutableListOf<Int>()
        for (num in nums) {
            if (num == 0) {
                if (cur.isNotEmpty()) {
                    A.add(cur.toMutableList())
                }
                cur.clear()
            } else {
                cur.add(num)
            }
        }
        if (cur.isNotEmpty()) {
            A.add(cur.toMutableList())
        }

        for (sub in A) {
            var negs = 0
            for (i in sub) {
                if (i < 0) {
                    negs++
                }
            }
            var prod = 1
            var need = if (negs % 2 == 0) negs else negs - 1
            negs = 0
            var j = 0
            for (i in sub.indices) {
                prod *= sub[i]
                if (sub[i] < 0) {
                    negs++
                    while (negs > need) {
                        prod /= sub[j]
                        if (sub[j] < 0) {
                            negs--
                        }
                        j++
                    }
                }
                if (j <= i) {
                    res = maxOf(res, prod)
                }
            }
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

## 3. Kadane's Algorithm

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = nums[0]
        curMin, curMax = 1, 1

        for num in nums:
            tmp = curMax * num
            curMax = max(num * curMax, num * curMin, num)
            curMin = min(tmp, num * curMin, num)
            res = max(res, curMax)
        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int num : nums) {
            int tmp = curMax * num;
            curMax = Math.max(Math.max(num * curMax, num * curMin), num);
            curMin = Math.min(Math.min(tmp, num * curMin), num);
            res = Math.max(res, curMax);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int num : nums) {
            int tmp = curMax * num;
            curMax = max(max(num * curMax, num * curMin), num);
            curMin = min(min(tmp, num * curMin), num);
            res = max(res, curMax);
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
    maxProduct(nums) {
        let res = nums[0];
        let curMin = 1;
        let curMax = 1;

        for (const num of nums) {
            const tmp = curMax * num;
            curMax = Math.max(Math.max(num * curMax, num * curMin), num);
            curMin = Math.min(Math.min(tmp, num * curMin), num);
            res = Math.max(res, curMax);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        foreach (int num in nums) {
            int tmp = curMax * num;
            curMax = Math.Max(Math.Max(num * curMax, num * curMin), num);
            curMin = Math.Min(Math.Min(tmp, num * curMin), num);
            res = Math.Max(res, curMax);
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := nums[0]
    curMin, curMax := 1, 1
    for _, num := range nums {
        tmp := curMax * num
        curMax = max(num*curMax, max(num*curMin, num))
        curMin = min(tmp, min(num*curMin, num))
        res = max(res, curMax)
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = nums[0]
        var curMin = 1
        var curMax = 1
        for (num in nums) {
            val tmp = curMax * num
            curMax = maxOf(num * curMax, maxOf(num * curMin, num))
            curMin = minOf(tmp, minOf(num * curMin, num))
            res = maxOf(res, curMax)
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

## 4. Prefix & Suffix

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        n, res = len(nums), nums[0]
        prefix = suffix = 0

        for i in range(n):
            prefix = nums[i] * (prefix or 1)
            suffix = nums[n - 1 - i] * (suffix or 1)
            res = max(res, max(prefix, suffix))
        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length;
        int res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = Math.max(res, Math.max(prefix, suffix));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = max(res, max(prefix, suffix));
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
    maxProduct(nums) {
        let n = nums.length, res = nums[0];
        let prefix = 0, suffix = 0;

        for (let i = 0; i < n; i++) {
            prefix = nums[i] * (prefix === 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix === 0 ? 1 : suffix);
            res = Math.max(res, Math.max(prefix, suffix));
        }
        return res === -0 ? 0 : res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int n = nums.Length;
        int res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = Math.Max(res, Math.Max(prefix, suffix));
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    n := len(nums)
    res := nums[0]
    prefix, suffix := 0, 0

    for i := 0; i < n; i++ {
        if prefix == 0 {
            prefix = 1
        }
        if suffix == 0 {
            suffix = 1
        }
        
        prefix *= nums[i]
        suffix *= nums[n-1-i]
        res = max(res, max(prefix, suffix))
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        val n = nums.size
        var res = nums[0]
        var prefix = 0
        var suffix = 0

        for (i in 0 until n) {
            if (prefix == 0) prefix = 1
            if (suffix == 0) suffix = 1

            prefix *= nums[i]
            suffix *= nums[n - 1 - i]
            res = maxOf(res, prefix, suffix)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$