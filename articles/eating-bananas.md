## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $n$ is the length of the input array $piles$ and $m$ is the maximum number of bananas in a pile.

---

## 2. Binary Search

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * \log m)$
* Space complexity: $O(1)$

> Where $n$ is the length of the input array $piles$ and $m$ is the maximum number of bananas in a pile.