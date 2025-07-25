## 1. Sorting (Custom Comparator)

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        arr.sort(key=lambda num: (abs(num - x), num))
        return sorted(arr[:k])
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        List<Integer> list = new ArrayList<>();
        for (int num : arr) {
            list.add(num);
        }

        list.sort((a, b) -> {
            int diff = Math.abs(a - x) - Math.abs(b - x);
            return diff == 0 ? Integer.compare(a, b) : diff;
        });

        List<Integer> result = list.subList(0, k);
        Collections.sort(result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        sort(arr.begin(), arr.end(), [x](int a, int b) {
            int diff = abs(a - x) - abs(b - x);
            return diff == 0 ? a < b : diff < 0;
        });
        vector<int> result(arr.begin(), arr.begin() + k);
        sort(result.begin(), result.end());
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        arr.sort((a, b) => {
            const diff = Math.abs(a - x) - Math.abs(b - x);
            return diff === 0 ? a - b : diff;
        });
        const result = arr.slice(0, k);
        return result.sort((a, b) => a - b);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + k \log k)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(k)$ space for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 2. Linear Scan + Two Pointers

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        n = len(arr)
        idx = 0
        for i in range(1, n):
            if abs(x - arr[idx]) > abs(x - arr[i]):
                idx = i

        res = [arr[idx]]
        l, r = idx - 1, idx + 1

        while len(res) < k:
            if l >= 0 and r < n:
                if abs(x - arr[l]) <= abs(x - arr[r]):
                    res.append(arr[l])
                    l -= 1
                else:
                    res.append(arr[r])
                    r += 1
            elif l >= 0:
                res.append(arr[l])
                l -= 1
            elif r < n:
                res.append(arr[r])
                r += 1

        return sorted(res)
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int n = arr.length;
        int idx = 0;
        for (int i = 1; i < n; i++) {
            if (Math.abs(x - arr[idx]) > Math.abs(x - arr[i])) {
                idx = i;
            }
        }

        List<Integer> res = new ArrayList<>();
        res.add(arr[idx]);
        int l = idx - 1, r = idx + 1;

        while (res.size() < k) {
            if (l >= 0 && r < n) {
                if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                    res.add(arr[l--]);
                } else {
                    res.add(arr[r++]);
                }
            } else if (l >= 0) {
                res.add(arr[l--]);
            } else if (r < n) {
                res.add(arr[r++]);
            }
        }

        Collections.sort(res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int n = arr.size();
        int idx = 0;
        for (int i = 1; i < n; i++) {
            if (abs(x - arr[idx]) > abs(x - arr[i])) {
                idx = i;
            }
        }

        vector<int> res = {arr[idx]};
        int l = idx - 1, r = idx + 1;

        while (res.size() < k) {
            if (l >= 0 && r < n) {
                if (abs(x - arr[l]) <= abs(x - arr[r])) {
                    res.push_back(arr[l--]);
                } else {
                    res.push_back(arr[r++]);
                }
            } else if (l >= 0) {
                res.push_back(arr[l--]);
            } else if (r < n) {
                res.push_back(arr[r++]);
            }
        }

        sort(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        const n = arr.length;
        let idx = 0;
        for (let i = 1; i < n; i++) {
            if (Math.abs(x - arr[idx]) > Math.abs(x - arr[i])) {
                idx = i;
            }
        }

        const res = [arr[idx]];
        let l = idx - 1,
            r = idx + 1;

        while (res.length < k) {
            if (l >= 0 && r < n) {
                if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                    res.push(arr[l--]);
                } else {
                    res.push(arr[r++]);
                }
            } else if (l >= 0) {
                res.push(arr[l--]);
            } else if (r < n) {
                res.push(arr[r++]);
            }
        }

        return res.sort((a, b) => a - b);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k \log k)$
- Space complexity:
    - $O(1)$ or $O(k)$ space depending on the sorting algorithm.
    - $O(k)$ space for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - 1
        while r - l >= k:
            if abs(x - arr[l]) <= abs(x - arr[r]):
                r -= 1
            else:
                l += 1

        return arr[l: r + 1]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - 1;
        while (r - l >= k) {
            if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int i = l; i <= r; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - 1;
        while (r - l >= k) {
            if (abs(x - arr[l]) <= abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        return vector<int>(arr.begin() + l, arr.begin() + r + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - 1;
        while (r - l >= k) {
            if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        return arr.slice(l, r + 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n - k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 4. Binary Search + Two Pointers

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - 1
        while l < r:
            mid = (l + r) // 2
            if arr[mid] < x:
                l = mid + 1
            else:
                r = mid

        l, r = l - 1, l
        while r - l - 1 < k:
            if l < 0:
                r += 1
            elif r >= len(arr):
                l -= 1
            elif abs(arr[l] - x) <= abs(arr[r] - x):
                l -= 1
            else:
                r += 1

        return arr[l + 1:r]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.length) {
                l--;
            } else if (Math.abs(arr[l] - x) <= Math.abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = l + 1; i < r; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.size()) {
                l--;
            } else if (abs(arr[l] - x) <= abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        return vector<int>(arr.begin() + l + 1, arr.begin() + r);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - 1;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.length) {
                l--;
            } else if (Math.abs(arr[l] - x) <= Math.abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        return arr.slice(l + 1, r);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n + k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 5. Binary Search

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - k
        while l < r:
            m = (l + r) // 2
            if x - arr[m] > arr[m + k] - x:
                l = m + 1
            else:
                r = m
        return arr[l:l + k]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - k;
        while (l < r) {
            int m = (l + r) / 2;
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int i = l; i < l + k; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - k;
        while (l < r) {
            int m = (l + r) / 2;
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return vector<int>(arr.begin() + l, arr.begin() + l + k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - k;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return arr.slice(l, l + k);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (n - k) + k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.
