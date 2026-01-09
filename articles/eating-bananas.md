## 1. Brute Force

### Intuition

We try every possible eating speed starting from `1`.
For each speed, we simulate how many hours it would take to finish all piles.
The first speed that finishes within `h` hours is the answer.

### Algorithm

1. Start with `speed = 1`.
2. For each speed:
   - Compute the total hours needed by summing `ceil(pile / speed)` for every pile.
3. If the total hours is less than or equal to `h`, return the current speed.
4. Otherwise, increase the speed and repeat.

::tabs-start

```python
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        speed = 1
        while True:
            totalTime = 0
            for pile in piles:
                totalTime += math.ceil(pile / speed)

            if totalTime <= h:
                return speed
            speed += 1
        return speed
```

```java
public class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int speed = 1;
        while (true) {
            long totalTime = 0;
            for (int pile : piles) {
                totalTime += (int) Math.ceil((double) pile / speed);
            }

            if (totalTime <= h) {
                return speed;
            }
            speed++;
        }
    }
}
```

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int speed = 1;
        while (true) {
            long long totalTime = 0;
            for (int pile : piles) {
                totalTime += (pile + speed - 1) / speed;
            }

            if (totalTime <= h) {
                return speed;
            }
            speed++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        let speed = 1;
        while (true) {
            let totalTime = 0;
            for (let pile of piles) {
                totalTime += Math.ceil(pile / speed);
            }

            if (totalTime <= h) {
                return speed;
            }
            speed++;
        }
    }
}
```

```csharp
public class Solution {
    public int MinEatingSpeed(int[] piles, int h) {
        int speed = 1;
        while (true) {
            long totalTime = 0;
            foreach (int pile in piles) {
                totalTime += (int) Math.Ceiling((double) pile / speed);
            }

            if (totalTime <= h) {
                return speed;
            }
            speed++;
        }
    }
}
```

```go
func minEatingSpeed(piles []int, h int) int {
   speed := 1
   for {
       totalTime := 0
       for _, pile := range piles {
           totalTime += int(math.Ceil(float64(pile) / float64(speed)))
       }

       if totalTime <= h {
           return speed
       }
       speed += 1
   }
   return speed
}
```

```kotlin
class Solution {
    fun minEatingSpeed(piles: IntArray, h: Int): Int {
        var speed = 1
        while (true) {
            var totalTime = 0L
            for (pile in piles) {
                totalTime += Math.ceil(pile.toDouble() / speed).toLong()
            }

            if (totalTime <= h) {
                return speed
            }
            speed += 1
        }
        return speed
    }
}
```

```swift
class Solution {
    func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {
        var speed = 1

        while true {
            var totalTime = 0
            for pile in piles {
                totalTime += Int(ceil(Double(pile) / Double(speed)))
            }

            if totalTime <= h {
                return speed
            }
            speed += 1
        }
        return speed
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the input array $piles$ and $m$ is the maximum number of bananas in a pile.

---

## 2. Binary Search

### Intuition

Instead of checking every speed one by one, we notice that the total time needed **decreases** as the eating speed increases.
This means the answer lies in a **sorted search space** from `1` to `max(piles)`.

Because the search space is ordered, we can use **binary search** to efficiently find the smallest speed that allows finishing the piles within `h` hours.

### Algorithm

1. Set the search range:
   - `left = 1` (minimum possible speed)
   - `right = max(piles)` (maximum needed speed)
2. While `left <= right`:
   - Let `mid` be the current speed to test.
   - Compute the total hours needed using this speed.
3. If the total hours is within the allowed time `h`:
   - This speed works, so record it.
   - Try to find a smaller working speed by searching the left half.
4. Otherwise:
   - Speed is too slow, so search in the right half.
5. After the search ends, return the smallest valid speed found.

::tabs-start

```python
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        l, r = 1, max(piles)
        res = r

        while l <= r:
            k = (l + r) // 2

            totalTime = 0
            for p in piles:
                totalTime += math.ceil(float(p) / k)
            if totalTime <= h:
                res = k
                r = k - 1
            else:
                l = k + 1
        return res
```

```java
public class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int l = 1;
        int r = Arrays.stream(piles).max().getAsInt();
        int res = r;

        while (l <= r) {
            int k = (l + r) / 2;

            long totalTime = 0;
            for (int p : piles) {
                totalTime += Math.ceil((double) p / k);
            }
            if (totalTime <= h) {
                res = k;
                r = k - 1;
            } else {
                l = k + 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1;
        int r = *max_element(piles.begin(), piles.end());
        int res = r;

        while (l <= r) {
            int k = (l + r) / 2;

            long long totalTime = 0;
            for (int p : piles) {
                totalTime += ceil(static_cast<double>(p) / k);
            }
            if (totalTime <= h) {
                res = k;
                r = k - 1;
            } else {
                l = k + 1;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        let l = 1;
        let r = Math.max(...piles);
        let res = r;

        while (l <= r) {
            const k = Math.floor((l + r) / 2);

            let totalTime = 0;
            for (const p of piles) {
                totalTime += Math.ceil(p / k);
            }
            if (totalTime <= h) {
                res = k;
                r = k - 1;
            } else {
                l = k + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinEatingSpeed(int[] piles, int h) {
        int l = 1;
        int r = piles.Max();
        int res = r;

        while (l <= r) {
            int k = (l + r) / 2;

            long totalTime = 0;
            foreach (int p in piles) {
                totalTime += (int)Math.Ceiling((double)p / k);
            }
            if (totalTime <= h) {
                res = k;
                r = k - 1;
            } else {
                l = k + 1;
            }
        }
        return res;
    }
}
```

```go
func minEatingSpeed(piles []int, h int) int {
   l, r := 1, 0
   for _, p := range piles {
       if p > r {
           r = p
       }
   }
   res := r

   for l <= r {
       k := (l + r) / 2
       totalTime := 0

       for _, p := range piles {
           totalTime += int(math.Ceil(float64(p) / float64(k)))
       }

       if totalTime <= h {
           res = k
           r = k - 1
       } else {
           l = k + 1
       }
   }
   return res
}
```

```kotlin
class Solution {
    fun minEatingSpeed(piles: IntArray, h: Int): Int {
        var l = 1
        var r = piles.max()!!
        var res = r

        while (l <= r) {
            val k = (l + r) / 2
            var totalTime = 0L

            for (p in piles) {
                totalTime += Math.ceil(p.toDouble() / k).toLong()
            }

            if (totalTime <= h) {
                res = k
                r = k - 1
            } else {
                l = k + 1
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {
        var l = 1, r = piles.max()!
        var res = r

        while l <= r {
            let k = (l + r) / 2

            var totalTime = 0
            for p in piles {
                totalTime += Int(ceil(Double(p) / Double(k)))
            }

            if totalTime <= h {
                res = k
                r = k - 1
            } else {
                l = k + 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \log m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the input array $piles$ and $m$ is the maximum number of bananas in a pile.
