## 1. Brute Force

::tabs-start

```python
class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        n = len(arr)
        ans = [0] * n
        for i in range(n):
            rightMax = -1
            for j in range(i + 1, n):
                rightMax = max(rightMax, arr[j])
            ans[i] = rightMax
        return ans
```

```java
public class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            int rightMax = -1;
            for (int j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n);
        for (int i = 0; i < n; ++i) {
            int rightMax = -1;
            for (int j = i + 1; j < n; ++j) {
                rightMax = max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    replaceElements(arr) {
        let n = arr.length;
        let ans = new Array(n);
        for (let i = 0; i < n; i++) {
            let rightMax = -1;
            for (let j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Suffix Max

::tabs-start

```python
class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        n = len(arr)
        ans = [0] * n
        rightMax = -1
        for i in range(n - 1, -1, -1):
            ans[i] = rightMax
            rightMax = max(arr[i], rightMax)
        return ans 
```

```java
public class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        int rightMax = -1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] = rightMax;
            rightMax = Math.max(rightMax, arr[i]);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n);
        int rightMax = -1;
        for (int i = n - 1; i >= 0; --i) {
            ans[i] = rightMax;
            rightMax = max(rightMax, arr[i]);
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    replaceElements(arr) {
        let n = arr.length;
        let ans = new Array(n);
        let rightMax = -1;
        for (let i = n - 1; i >= 0; i--) {
            ans[i] = rightMax;
            rightMax = Math.max(rightMax, arr[i]);
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$