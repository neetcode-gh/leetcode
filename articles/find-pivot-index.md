## 1. Brute Force

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            leftSum = rightSum = 0
            for l in range(i):
                leftSum += nums[l]
            for r in range(i + 1, n):
                rightSum += nums[r]
            if leftSum == rightSum:
                return i
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            int leftSum = 0, rightSum = 0;
            for (int l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (int r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum == rightSum) {
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
    int pivotIndex(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int leftSum = 0, rightSum = 0;
            for (int l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (int r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum == rightSum) {
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
    pivotIndex(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            let leftSum = 0, rightSum = 0;
            for (let l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (let r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum === rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Prefix Sum

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        n = len(nums)
        prefixSum = [0] * (n + 1)
        for i in range(n):
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        
        for i in range(n):
            leftSum = prefixSum[i]
            rightSum = prefixSum[n] - prefixSum[i + 1]
            if leftSum == rightSum:
                return i
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int n = nums.length;        
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = prefixSum[i];
            int rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum == rightSum) {
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
    int pivotIndex(vector<int>& nums) {
        int n = nums.size();        
        vector<int> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = prefixSum[i];
            int rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum == rightSum) {
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
    pivotIndex(nums) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (let i = 0; i < n; i++) {
            const leftSum = prefixSum[i];
            const rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum === rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Prefix Sum (Optimal)

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total = sum(nums)
        leftSum = 0
        for i in range(len(nums)):
            rightSum = total - nums[i] - leftSum
            if leftSum == rightSum:
                return i
            leftSum += nums[i]
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }

        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }

        int leftSum = 0;
        for (int i = 0; i < nums.size(); i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
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
    pivotIndex(nums) {
        let total = 0;
        for (let num of nums) {
            total += num;
        }

        let leftSum = 0;
        for (let i = 0; i < nums.length; i++) {
            let rightSum = total - leftSum - nums[i];
            if (leftSum === rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$