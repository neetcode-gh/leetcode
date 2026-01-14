## 1. Linear Search

### Intuition

The minimum possible ship capacity must be at least as large as the heaviest package (otherwise that package could never be shipped). Starting from this minimum value, we can try each capacity one by one, simulating the shipping process to see if all packages can be delivered within the given number of days. The first capacity that works is our answer.

### Algorithm

1. Initialize the result to the maximum weight in the array (the minimum possible capacity).
2. For the current capacity, simulate shipping by iterating through packages:
   - Keep a running total of the current ship's load.
   - When adding a package would exceed capacity, start a new ship.
3. If the number of ships used is within the allowed days, return the current capacity.
4. Otherwise, increment the capacity by 1 and repeat.

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

```go
func shipWithinDays(weights []int, days int) int {
    res := 0
    for _, w := range weights {
        if w > res {
            res = w
        }
    }

    for {
        ships := 1
        cap := res
        for _, w := range weights {
            if cap-w < 0 {
                ships++
                cap = res
            }
            cap -= w
        }
        if ships <= days {
            return res
        }
        res++
    }
}
```

```kotlin
class Solution {
    fun shipWithinDays(weights: IntArray, days: Int): Int {
        var res = weights.max()

        while (true) {
            var ships = 1
            var cap = res
            for (w in weights) {
                if (cap - w < 0) {
                    ships++
                    cap = res
                }
                cap -= w
            }
            if (ships <= days) {
                return res
            }
            res++
        }
    }
}
```

```swift
class Solution {
    func shipWithinDays(_ weights: [Int], _ days: Int) -> Int {
        var res = weights.max()!

        while true {
            var ships = 1
            var cap = res
            for w in weights {
                if cap - w < 0 {
                    ships += 1
                    cap = res
                }
                cap -= w
            }
            if ships <= days {
                return res
            }
            res += 1
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

### Intuition

Instead of checking every capacity linearly, we can use binary search because the problem has a monotonic property: if a capacity works, any larger capacity will also work. The search space ranges from the maximum package weight (minimum valid capacity) to the sum of all weights (shipping everything in one day). For each mid-point capacity, we check if it allows shipping within the day limit and adjust our search accordingly.

### Algorithm

1. Set the binary search range: `left` = max(weights), `right` = sum(weights).
2. While `left` <= `right`:
   - Calculate `mid` = (`left` + `right`) / 2.
   - Simulate shipping with capacity `mid` by greedily filling each day's ship.
   - If we can ship within the allowed days, update the result and search the left half (`r` = `mid` - 1).
   - Otherwise, search the right half (`l` = `mid` + 1).
3. Return the minimum valid capacity found.

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

```go
func shipWithinDays(weights []int, days int) int {
    l, r := 0, 0
    for _, w := range weights {
        if w > l {
            l = w
        }
        r += w
    }
    res := r

    canShip := func(cap int) bool {
        ships, currCap := 1, cap
        for _, w := range weights {
            if currCap-w < 0 {
                ships++
                if ships > days {
                    return false
                }
                currCap = cap
            }
            currCap -= w
        }
        return true
    }

    for l <= r {
        cap := (l + r) / 2
        if canShip(cap) {
            if cap < res {
                res = cap
            }
            r = cap - 1
        } else {
            l = cap + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun shipWithinDays(weights: IntArray, days: Int): Int {
        var l = weights.max()
        var r = weights.sum()
        var res = r

        fun canShip(cap: Int): Boolean {
            var ships = 1
            var currCap = cap
            for (w in weights) {
                if (currCap - w < 0) {
                    ships++
                    if (ships > days) return false
                    currCap = cap
                }
                currCap -= w
            }
            return true
        }

        while (l <= r) {
            val cap = (l + r) / 2
            if (canShip(cap)) {
                res = minOf(res, cap)
                r = cap - 1
            } else {
                l = cap + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func shipWithinDays(_ weights: [Int], _ days: Int) -> Int {
        var l = weights.max()!
        var r = weights.reduce(0, +)
        var res = r

        func canShip(_ cap: Int) -> Bool {
            var ships = 1
            var currCap = cap
            for w in weights {
                if currCap - w < 0 {
                    ships += 1
                    if ships > days { return false }
                    currCap = cap
                }
                currCap -= w
            }
            return true
        }

        while l <= r {
            let cap = (l + r) / 2
            if canShip(cap) {
                res = min(res, cap)
                r = cap - 1
            } else {
                l = cap + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Wrong Binary Search Bounds
The minimum capacity must be at least `max(weights)` (to ship the heaviest package), and the maximum is `sum(weights)` (ship everything in one day). Starting from 0 or 1 leads to invalid states where some packages cannot be shipped.

```python
# Wrong: minimum capacity too low
l, r = 1, sum(weights)  # Should be: l = max(weights)
```

### Miscounting Days in Simulation
A common mistake is not counting the first day or incrementing the day counter at the wrong time. The ship starts with capacity available on day 1, and a new day begins when the current package cannot fit.

### Using Incorrect Binary Search Condition
This is a "find minimum satisfying condition" problem. When the capacity works, you should search left (`r = mid - 1`) to find smaller valid capacities. Searching right instead returns a suboptimal answer.
