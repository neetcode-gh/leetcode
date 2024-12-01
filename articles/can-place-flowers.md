## 1. Iteration - I

::tabs-start

```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        f = [0] + flowerbed + [0]
        
        for i in range(1, len(f) - 1):
            if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:
                f[i] = 1
                n -= 1
        
        return n <= 0
```

```java
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int[] f = new int[flowerbed.length + 2];        
        for (int i = 0; i < flowerbed.length; i++) {
            f[i + 1] = flowerbed[i];
        }
        
        for (int i = 1; i < f.length - 1; i++) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        vector<int> f(flowerbed.size() + 2, 0);
        for (int i = 0; i < flowerbed.size(); i++) {
            f[i + 1] = flowerbed[i];
        }
        
        for (int i = 1; i < f.size() - 1; i++) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} flowerbed
     * @param {number} n
     * @return {boolean}
     */
    canPlaceFlowers(flowerbed, n) {
        const f = [0, ...flowerbed, 0];
        
        for (let i = 1; i < f.length - 1; i++) {
            if (f[i - 1] === 0 && f[i] === 0 && f[i + 1] === 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Iteration - II

::tabs-start

```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        empty = 0 if flowerbed[0] else 1
        
        for f in flowerbed:
            if f:
                n -= int((empty - 1) / 2)
                empty = 0
            else:
                empty += 1
        
        n -= empty // 2
        return n <= 0
```

```java
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;
        
        for (int f : flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty++;
            }
        }
        
        n -= empty / 2;
        return n <= 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;
        
        for (int f : flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty++;
            }
        }
        
        n -= empty / 2;
        return n <= 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} flowerbed
     * @param {number} n
     * @return {boolean}
     */
    canPlaceFlowers(flowerbed, n) {
        let empty = flowerbed[0] === 0 ? 1 : 0;
        
        for (let f of flowerbed) {
            if (f === 1) {
                n -= Math.floor(Math.max(0, empty - 1) / 2);
                empty = 0;
            } else {
                empty++;
            }
        }
        
        n -= Math.floor(empty / 2);
        return n <= 0;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$