## 1. Brute Force

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        arr = [1] * n

        for i in range(n - 1):
            if ratings[i] == ratings[i + 1]:
                continue
            if ratings[i + 1] > ratings[i]:
                arr[i + 1] = arr[i] + 1
            elif arr[i] == arr[i + 1]:
                arr[i + 1] = arr[i]
                arr[i] += 1
                for j in range(i - 1, -1, -1):
                    if ratings[j] > ratings[j + 1]:
                        if arr[j + 1] < arr[j]:
                            break
                        arr[j] += 1

        return sum(arr)
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = 1;
        }

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> arr(n, 1);

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        return accumulate(arr.begin(), arr.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        const arr = new Array(n).fill(1);

        for (let i = 0; i < n - 1; i++) {
            if (ratings[i] === ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] === arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (let j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        return arr.reduce((sum, num) => sum + num, 0);
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int[] arr = new int[n];
        Array.Fill(arr, 1);

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) break;
                        arr[j]++;
                    } else {
                        break;
                    }
                }
            }
        }

        int total = 0;
        foreach (int a in arr) {
            total += a;
        }
        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Greedy (Two Pass)

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        arr = [1] * n

        for i in range(1, n):
            if ratings[i - 1] < ratings[i]:
                arr[i] = arr[i - 1] + 1

        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                arr[i] = max(arr[i], arr[i + 1] + 1)

        return sum(arr)
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] arr = new int[n];
        Arrays.fill(arr, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.max(arr[i], arr[i + 1] + 1);
            }
        }

        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> arr(n, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = max(arr[i], arr[i + 1] + 1);
            }
        }

        return accumulate(arr.begin(), arr.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        const arr = new Array(n).fill(1);

        for (let i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (let i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.max(arr[i], arr[i + 1] + 1);
            }
        }

        return arr.reduce((sum, num) => sum + num, 0);
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int[] arr = new int[n];
        Array.Fill(arr, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.Max(arr[i], arr[i + 1] + 1);
            }
        }

        int total = 0;
        foreach (int a in arr) {
            total += a;
        }
        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy (One Pass)

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        res = n

        i = 1
        while i < n:
            if ratings[i] == ratings[i - 1]:
                i += 1
                continue

            inc = 0
            while i < n and ratings[i] > ratings[i - 1]:
                inc += 1
                res += inc
                i += 1

            dec = 0
            while i < n and ratings[i] < ratings[i - 1]:
                dec += 1
                res += dec
                i += 1

            res -= min(inc, dec)

        return res
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int res = n;

        int i = 1;
        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.min(inc, dec);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        int res = n;

        int i = 1;
        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= min(inc, dec);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        let res = n;

        let i = 1;
        while (i < n) {
            if (ratings[i] === ratings[i - 1]) {
                i++;
                continue;
            }

            let inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            let dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.min(inc, dec);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int res = n;
        int i = 1;

        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.Min(inc, dec);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
