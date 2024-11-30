## 1. Iteration (Two Pass)

::tabs-start

```python
class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        ans = []
        for i in range(2):
            for num in nums:
                ans.append(num)
        return ans
```

```java
public class Solution {
    public int[] getConcatenation(int[] nums) {
        int[] ans=new int[2 * nums.length];
        int idx = 0;
        for (int i = 0; i < 2; i++) {
            for (int num : nums) {
                ans[idx++] = num;
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        vector<int> ans;
        for (int i = 0; i < 2; ++i) {
            for (int num : nums) {
                ans.push_back(num);
            }
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getConcatenation(nums) {
        let ans = [];
        for (let i = 0; i < 2; i++) {
            for (let num of nums) {
                ans.push(num);
            }
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Iteration (One Pass)

::tabs-start

```python
class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * (2 * n)
        for i, num in enumerate(nums):
            ans[i] = ans[i + n] = num
        return ans
```

```java
public class Solution {
    public int[] getConcatenation(int[] nums) {
        int n = nums.length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; i++) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(2 * n);
        for (int i = 0; i < n; ++i) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getConcatenation(nums) {
        let n = nums.length;
        let ans = new Array(2 * n);
        for (let i = 0; i < n; i++) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$