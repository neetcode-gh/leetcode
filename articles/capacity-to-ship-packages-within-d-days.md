## 1. Linear Search

::tabs-start

```python
class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        res = max(weights)
        while True:
            ships = 1
            cap = res
            for w in weights:
                if cap - w < 0:
                    ships += 1
                    cap = res
                cap -= w

            if ships <= days:
                return res

            res += 1
```

```java
public class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int res = 0;
        for (int weight : weights) {
            res = Math.max(res, weight);
        }
        while (true) {
            int ships = 1;
            int cap = res;
            for (int weight : weights) {
                if (cap - weight < 0) {
                    ships++;
                    cap = res;
                }
                cap -= weight;
            }
            if (ships <= days) {
                return res;
            }
            res++;
        }
    }
}
```

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int res = *max_element(weights.begin(), weights.end());
        while (true) {
            int ships = 1, cap = res;
            for (int w : weights) {
                if (cap - w < 0) {
                    ships++;
                    cap = res;
                }
                cap -= w;
            }
            if (ships <= days) {
                return res;
            }
            res++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weights
     * @param {number} days
     * @return {number}
     */
    shipWithinDays(weights, days) {
        let res = Math.max(...weights);
        while (true) {
            let ships = 1,
                cap = res;
            for (let w of weights) {
                if (cap - w < 0) {
                    ships++;
                    cap = res;
                }
                cap -= w;
            }
            if (ships <= days) {
                return res;
            }
            res++;
        }
    }
}
```

```csharp
public class Solution {
    public int ShipWithinDays(int[] weights, int days) {
        int res = weights.Max();
        while (true) {
            int ships = 1;
            int cap = res;
            foreach (int w in weights) {
                if (cap - w < 0) {
                    ships++;
                    cap = res;
                }
                cap -= w;
            }
            if (ships <= days) {
                return res;
            }
            res++;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        l, r = max(weights), sum(weights)
        res = r

        def canShip(cap):
            ships, currCap = 1, cap
            for w in weights:
                if currCap - w < 0:
                    ships += 1
                    if ships > days:
                        return False
                    currCap = cap

                currCap -= w
            return True

        while l <= r:
            cap = (l + r) // 2
            if canShip(cap):
                res = min(res, cap)
                r = cap - 1
            else:
                l = cap + 1

        return res
```

```java
public class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int l = 0, r = 0;
        for (int w : weights) {
            l = Math.max(l, w);
            r += w;
        }
        int res = r;

        while (l <= r) {
            int cap = (l + r) / 2;
            if (canShip(weights, days, cap)) {
                res = Math.min(res, cap);
                r = cap - 1;
            } else {
                l = cap + 1;
            }
        }
        return res;
    }

    private boolean canShip(int[] weights, int days, int cap) {
        int ships = 1, currCap = cap;
        for (int w : weights) {
            if (currCap - w < 0) {
                ships++;
                if (ships > days) {
                    return false;
                }
                currCap = cap;
            }
            currCap -= w;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int l = *max_element(weights.begin(), weights.end());
        int r = accumulate(weights.begin(), weights.end(), 0);
        int res = r;

        while (l <= r) {
            int cap = (l + r) / 2;
            if (canShip(weights, days, cap)) {
                res = min(res, cap);
                r = cap - 1;
            } else {
                l = cap + 1;
            }
        }
        return res;
    }

private:
    bool canShip(const vector<int>& weights, int days, int cap) {
        int ships = 1, currCap = cap;
        for (int w : weights) {
            if (currCap - w < 0) {
                ships++;
                if (ships > days) {
                    return false;
                }
                currCap = cap;
            }
            currCap -= w;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weights
     * @param {number} days
     * @return {number}
     */
    shipWithinDays(weights, days) {
        let l = Math.max(...weights);
        let r = weights.reduce((a, b) => a + b, 0);
        let res = r;

        const canShip = (cap) => {
            let ships = 1,
                currCap = cap;
            for (const w of weights) {
                if (currCap - w < 0) {
                    ships++;
                    if (ships > days) {
                        return false;
                    }
                    currCap = cap;
                }
                currCap -= w;
            }
            return true;
        };

        while (l <= r) {
            const cap = Math.floor((l + r) / 2);
            if (canShip(cap)) {
                res = Math.min(res, cap);
                r = cap - 1;
            } else {
                l = cap + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int ShipWithinDays(int[] weights, int days) {
        int l = weights.Max();
        int r = weights.Sum();
        int res = r;

        bool CanShip(int cap) {
            int ships = 1;
            int currCap = cap;

            foreach (int w in weights) {
                if (currCap - w < 0) {
                    ships++;
                    if (ships > days) return false;
                    currCap = cap;
                }
                currCap -= w;
            }

            return true;
        }

        while (l <= r) {
            int cap = (l + r) / 2;
            if (CanShip(cap)) {
                res = Math.Min(res, cap);
                r = cap - 1;
            } else {
                l = cap + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$
