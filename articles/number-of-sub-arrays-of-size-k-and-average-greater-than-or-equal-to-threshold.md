## 1. Brute Force

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        res = 0
        l = 0

        for r in range(k - 1, len(arr)):
            sum_ = 0
            for i in range(l, r + 1):
                sum_ += arr[i]

            if sum_ / k >= threshold:
                res += 1
            l += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0, l = 0;

        for (int r = k - 1; r < arr.length; r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int res = 0, l = 0;

        for (int r = k - 1; r < arr.size(); r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        let res = 0,
            l = 0;

        for (let r = k - 1; r < arr.length; r++) {
            let sum = 0;
            for (let i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int l = 0;

        for (int r = k - 1; r < arr.Length; r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }

            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 2. Prefix Sum

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        prefix_sum = [0] * (len(arr) + 1)
        for i in range(len(arr)):
            prefix_sum[i + 1] += prefix_sum[i] + arr[i]

        res = l = 0
        for r in range(k - 1, len(arr)):
            sum_ = prefix_sum[r + 1] - prefix_sum[l]
            if sum_ / k >= threshold:
                res += 1
            l += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int[] prefixSum = new int[arr.length + 1];
        for (int i = 0; i < arr.length; i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.length; r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        vector<int> prefixSum(arr.size() + 1);
        for (int i = 0; i < arr.size(); i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.size(); r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        const prefixSum = new Int32Array(arr.length + 1);
        for (let i = 0; i < arr.length; i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        let res = 0,
            l = 0;
        for (let r = k - 1; r < arr.length; r++) {
            const sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int[] prefixSum = new int[arr.Length + 1];
        for (int i = 0; i < arr.Length; i++) {
            prefixSum[i + 1] = prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.Length; r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 3. Sliding Window - I

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        res = 0
        curSum = sum(arr[:k - 1])

        for L in range(len(arr) - k + 1):
            curSum += arr[L + k - 1]
            if (curSum / k) >= threshold:
                res += 1
            curSum -= arr[L]
        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.length - k; L++) {
            curSum += arr[L + k - 1];
            if ((curSum / k) >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int res = 0, curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.size() - k; L++) {
            curSum += arr[L + k - 1];
            if ((curSum / k) >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        let res = 0;
        let curSum = 0;

        for (let i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (let L = 0; L <= arr.length - k; L++) {
            curSum += arr[L + k - 1];
            if (curSum / k >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.Length - k; L++) {
            curSum += arr[L + k - 1];
            if (curSum / k >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 4. Sliding Window - II

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        threshold *= k
        res = curSum = 0
        for R in range(len(arr)):
            curSum += arr[R]
            if R >= k - 1:
                res += curSum >= threshold
                curSum -= arr[R - k + 1]
        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int R = 0; R < arr.length; R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int R = 0; R < arr.size(); R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        threshold *= k;
        let res = 0,
            curSum = 0;

        for (let R = 0; R < arr.length; R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int r = 0; r < arr.Length; r++) {
            curSum += arr[r];
            if (r >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[r - k + 1];
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.
