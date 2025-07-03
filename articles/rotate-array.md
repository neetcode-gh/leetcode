## 1. Brute Force

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n
        while k:
            tmp = nums[n - 1]
            for i in range(n - 1, 0, -1):
                nums[i] = nums[i - 1]
            nums[0] = tmp
            k -= 1
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;
        while (k > 0) {
            const tmp = nums[n - 1];
            for (let i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$ extra space.

---

## 2. Extra Space

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        tmp = [0] * n
        for i in range(n):
            tmp[(i + k) % n] = nums[i]

        nums[:] = tmp
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] tmp = new int[n];
        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> tmp(n);
        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        const tmp = new Array(n);
        for (let i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (let i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        int[] tmp = new int[n];

        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }

        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ extra space.

---

## 3. Cyclic Traversal

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n
        count = start = 0

        while count < n:
            current = start
            prev = nums[start]
            while True:
                next_idx = (current + k) % n
                nums[next_idx], prev = prev, nums[next_idx]
                current = next_idx
                count += 1

                if start == current:
                    break
            start += 1
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];
            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];
            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;
        let count = 0;

        for (let start = 0; count < n; start++) {
            let current = start;
            let prev = nums[start];
            do {
                const nextIdx = (current + k) % n;
                const temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start !== current);
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];

            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Using Reverse

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n

        def reverse(l: int, r: int) -> None:
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l, r = l + 1, r - 1

        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;

        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
            l++;
            r--;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;

        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

private:
    void reverse(vector<int>& nums, int l, int r) {
        while (l < r) {
            swap(nums[l], nums[r]);
            l++;
            r--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;

        const reverse = (l, r) => {
            while (l < r) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
                r--;
            }
        };

        reverse(0, n - 1);
        reverse(0, k - 1);
        reverse(k, n - 1);
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        Reverse(nums, 0, n - 1);
        Reverse(nums, 0, k - 1);
        Reverse(nums, k, n - 1);
    }

    private void Reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. One Liner

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        nums[:] = nums[-k % len(nums):] + nums[:-k % len(nums)]
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] rotated = Arrays.copyOfRange(nums, n - k % n, n);
        System.arraycopy(nums, 0, nums, k % n, n - k % n);
        System.arraycopy(rotated, 0, nums, 0, rotated.length);
    }
}
```

```cpp

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        std::rotate(nums.begin(), nums.end() - (k % nums.size()), nums.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        nums.splice(0, 0, ...nums.splice(nums.length - (k % nums.length)));
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        int[] rotated = new int[n];
        Array.Copy(nums, n - k, rotated, 0, k);
        Array.Copy(nums, 0, rotated, k, n - k);
        Array.Copy(rotated, nums, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
