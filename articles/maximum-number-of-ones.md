## 1. Greedy

### Intuition

The key observation is that the matrix can be viewed as a tiling of `sideLength x sideLength` squares. Each position within this square pattern repeats throughout the entire matrix. If we place a `1` at position `(r, c)` within the pattern, it appears at all positions that map to `(r, c)` when tiled across the matrix.

To maximize the total number of ones, we should place our `maxOnes` ones at the positions within the pattern that appear most frequently in the full matrix. Positions near the top-left corner of the pattern tile more times because the matrix dimensions may not divide evenly by `sideLength`.

For each position `(r, c)` in the pattern, we calculate how many times it appears in the full matrix. Then we greedily pick the `maxOnes` positions with the highest counts.

### Algorithm

1. For each position `(r, c)` in the `sideLength x sideLength` pattern:
   - Calculate how many times this position appears horizontally: `(1 + (width - c - 1) / sideLength)`.
   - Calculate how many times it appears vertically: `(1 + (height - r - 1) / sideLength)`.
   - Multiply these to get the total count for this position.
2. Collect all counts into a list.
3. Sort the counts in descending order.
4. Sum the top `maxOnes` counts to get the maximum number of ones possible.

::tabs-start

```python
class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        count = []
        
        for r in range(sideLength):
            for c in range(sideLength):
                num = (1 + (width - c - 1) // sideLength) * (1 + (height - r - 1) // sideLength)
                count.append(num)
                
        count.sort(reverse=True)
        return sum(count[:maxOnes])
```

```java
class Solution {
    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        List<Integer> count = new ArrayList<>();
        
        for (int r = 0; r < sideLength; ++r) {
            for (int c = 0; c < sideLength; ++c) {
                count.add((1 + (width - 1 - c) / sideLength) * (1 + (height - 1 - r) / sideLength));   
            }
        }
        
        count.sort(Comparator.reverseOrder());
        int answer = 0;
        for (int i = 0; i < maxOnes; ++i) {
            answer += count.get(i);
        }
        
        return answer;
    }
}
```

```cpp
class Solution {
public:
    int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        vector<int> count;
        
        for (int r = 0; r < sideLength; ++r) {
            for (int c = 0; c < sideLength; ++c) {
                count.push_back((1 + (width - 1 - c) / sideLength) * 
                                (1 + (height - 1 - r) / sideLength));
            }
        }
        
        sort(count.begin(), count.end(), greater<int>());
        
        int answer = 0;
        for (int i = 0; i < maxOnes; ++i) {
            answer += count[i];
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} sideLength
     * @param {number} maxOnes
     * @return {number}
     */
    maximumNumberOfOnes(width, height, sideLength, maxOnes) {
        const count = [];

        for (let r = 0; r < sideLength; ++r) {
            for (let c = 0; c < sideLength; ++c) {
                count.push((1 + Math.floor((width - 1 - c) / sideLength)) *
                           (1 + Math.floor((height - 1 - r) / sideLength)));
            }
        }

        count.sort((a, b) => b - a);

        let answer = 0;
        for (let i = 0; i < maxOnes; ++i) {
            answer += count[i];
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    public int MaximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        List<int> count = new List<int>();

        for (int r = 0; r < sideLength; ++r) {
            for (int c = 0; c < sideLength; ++c) {
                count.Add((1 + (width - 1 - c) / sideLength) *
                          (1 + (height - 1 - r) / sideLength));
            }
        }

        count.Sort((a, b) => b.CompareTo(a));

        int answer = 0;
        for (int i = 0; i < maxOnes; ++i) {
            answer += count[i];
        }

        return answer;
    }
}
```

```go
func maximumNumberOfOnes(width int, height int, sideLength int, maxOnes int) int {
    count := []int{}

    for r := 0; r < sideLength; r++ {
        for c := 0; c < sideLength; c++ {
            count = append(count, (1+(width-1-c)/sideLength)*(1+(height-1-r)/sideLength))
        }
    }

    sort.Sort(sort.Reverse(sort.IntSlice(count)))

    answer := 0
    for i := 0; i < maxOnes; i++ {
        answer += count[i]
    }

    return answer
}
```

```kotlin
class Solution {
    fun maximumNumberOfOnes(width: Int, height: Int, sideLength: Int, maxOnes: Int): Int {
        val count = mutableListOf<Int>()

        for (r in 0 until sideLength) {
            for (c in 0 until sideLength) {
                count.add((1 + (width - 1 - c) / sideLength) *
                          (1 + (height - 1 - r) / sideLength))
            }
        }

        count.sortDescending()

        var answer = 0
        for (i in 0 until maxOnes) {
            answer += count[i]
        }

        return answer
    }
}
```

```swift
class Solution {
    func maximumNumberOfOnes(_ width: Int, _ height: Int, _ sideLength: Int, _ maxOnes: Int) -> Int {
        var count = [Int]()

        for r in 0..<sideLength {
            for c in 0..<sideLength {
                count.append((1 + (width - 1 - c) / sideLength) *
                             (1 + (height - 1 - r) / sideLength))
            }
        }

        count.sort(by: >)

        var answer = 0
        for i in 0..<maxOnes {
            answer += count[i]
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(sideLength^2 \cdot \log sideLength^2)$

- Space complexity: $O(sideLength^2)$

---

## 2. Optimally Fill the Remainder Grids

### Intuition

Instead of computing and sorting all positions, we can directly calculate the answer by analyzing the structure of the tiled matrix. The matrix divides into regions based on how the `sideLength` pattern tiles:
- Full tiles that appear `(height / sideLength) * (width / sideLength)` times.
- Partial tiles along the right edge, bottom edge, and bottom-right corner.

Positions in the corner remainder region (bottom-right) appear the most frequently because they get counted in the main grid plus both edge strips plus the corner. We should fill these first, then the positions in the edge strips, prioritizing the edge with more repetitions.

### Algorithm

1. Start by placing `maxOnes` ones in the fully repeated grid sections, contributing `maxOnes * (height / sideLength) * (width / sideLength)` ones.
2. Fill positions in the corner remainder region first (size = `(height % sideLength) * (width % sideLength)`). Each such position contributes to all three remainder regions plus the main grid.
3. Based on which dimension has more full tiles, fill the appropriate edge strip next.
4. Fill the remaining edge strip with any leftover positions.
5. Return the total count.

::tabs-start

```python
class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        answer = maxOnes * ((height // sideLength) * (width // sideLength))
        remain = maxOnes

        cnt1 = min((height % sideLength) * (width % sideLength), remain)
        answer += ((height // sideLength) + (width // sideLength) + 1) * cnt1
        remain -= cnt1

        if height // sideLength > width // sideLength:
            cnt2 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height // sideLength) * cnt2
            remain -= cnt2
            cnt3 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width // sideLength) * cnt3
            remain -= cnt3
        else:
            cnt2 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width // sideLength) * cnt2
            remain -= cnt2
            cnt3 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height // sideLength) * cnt3
            remain -= cnt3

        return answer
```

```java
class Solution {
    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        int answer = maxOnes * ((height / sideLength) * (width / sideLength));
        int remain = maxOnes;
        
        int cnt1 = Math.min((height % sideLength) * (width % sideLength), remain);
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1;
        remain -= cnt1;
        
        if (height / sideLength > width / sideLength) {
            int cnt2 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            int cnt2 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt3;
            remain -= cnt3;
        }
        
        return answer;
    }
}
```

```cpp
class Solution {
public:
    int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        int answer = maxOnes * ((height / sideLength) * (width / sideLength));
        int remain = maxOnes;
        
        int cnt1 = min((height % sideLength) * (width % sideLength), remain);
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1;
        remain -= cnt1;
        
        if (height / sideLength > width / sideLength) {
            int cnt2 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            int cnt2 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt3;
            remain -= cnt3;
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} sideLength
     * @param {number} maxOnes
     * @return {number}
     */
    maximumNumberOfOnes(width, height, sideLength, maxOnes) {
        let answer = maxOnes * (Math.floor(height / sideLength) * Math.floor(width / sideLength));
        let remain = maxOnes;

        let cnt1 = Math.min((height % sideLength) * (width % sideLength), remain);
        answer += (Math.floor(height / sideLength) + Math.floor(width / sideLength) + 1) * cnt1;
        remain -= cnt1;

        if (Math.floor(height / sideLength) > Math.floor(width / sideLength)) {
            let cnt2 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(height / sideLength) * cnt2;
            remain -= cnt2;

            let cnt3 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            let cnt2 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(width / sideLength) * cnt2;
            remain -= cnt2;

            let cnt3 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(height / sideLength) * cnt3;
            remain -= cnt3;
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    public int MaximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        int answer = maxOnes * ((height / sideLength) * (width / sideLength));
        int remain = maxOnes;

        int cnt1 = Math.Min((height % sideLength) * (width % sideLength), remain);
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1;
        remain -= cnt1;

        if (height / sideLength > width / sideLength) {
            int cnt2 = Math.Min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt2;
            remain -= cnt2;

            int cnt3 = Math.Min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            int cnt2 = Math.Min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt2;
            remain -= cnt2;

            int cnt3 = Math.Min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt3;
            remain -= cnt3;
        }

        return answer;
    }
}
```

```go
func maximumNumberOfOnes(width int, height int, sideLength int, maxOnes int) int {
    answer := maxOnes * ((height / sideLength) * (width / sideLength))
    remain := maxOnes

    cnt1 := min((height%sideLength)*(width%sideLength), remain)
    answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1
    remain -= cnt1

    if height/sideLength > width/sideLength {
        cnt2 := min(((width%sideLength)*sideLength)-((height%sideLength)*(width%sideLength)), remain)
        answer += (height / sideLength) * cnt2
        remain -= cnt2

        cnt3 := min(((height%sideLength)*sideLength)-((height%sideLength)*(width%sideLength)), remain)
        answer += (width / sideLength) * cnt3
        remain -= cnt3
    } else {
        cnt2 := min(((height%sideLength)*sideLength)-((height%sideLength)*(width%sideLength)), remain)
        answer += (width / sideLength) * cnt2
        remain -= cnt2

        cnt3 := min(((width%sideLength)*sideLength)-((height%sideLength)*(width%sideLength)), remain)
        answer += (height / sideLength) * cnt3
        remain -= cnt3
    }

    return answer
}
```

```kotlin
class Solution {
    fun maximumNumberOfOnes(width: Int, height: Int, sideLength: Int, maxOnes: Int): Int {
        var answer = maxOnes * ((height / sideLength) * (width / sideLength))
        var remain = maxOnes

        val cnt1 = minOf((height % sideLength) * (width % sideLength), remain)
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1
        remain -= cnt1

        if (height / sideLength > width / sideLength) {
            val cnt2 = minOf(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height / sideLength) * cnt2
            remain -= cnt2

            val cnt3 = minOf(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width / sideLength) * cnt3
            remain -= cnt3
        } else {
            val cnt2 = minOf(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width / sideLength) * cnt2
            remain -= cnt2

            val cnt3 = minOf(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height / sideLength) * cnt3
            remain -= cnt3
        }

        return answer
    }
}
```

```swift
class Solution {
    func maximumNumberOfOnes(_ width: Int, _ height: Int, _ sideLength: Int, _ maxOnes: Int) -> Int {
        var answer = maxOnes * ((height / sideLength) * (width / sideLength))
        var remain = maxOnes

        let cnt1 = min((height % sideLength) * (width % sideLength), remain)
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1
        remain -= cnt1

        if height / sideLength > width / sideLength {
            let cnt2 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height / sideLength) * cnt2
            remain -= cnt2

            let cnt3 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width / sideLength) * cnt3
            remain -= cnt3
        } else {
            let cnt2 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width / sideLength) * cnt2
            remain -= cnt2

            let cnt3 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height / sideLength) * cnt3
            remain -= cnt3
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$

- Space complexity: $O(1)$

---

## Common Pitfalls

### Misunderstanding the Tiling Pattern

The constraint applies to every `sideLength x sideLength` submatrix, not just non-overlapping tiles. This means adjacent submatrices overlap, creating a repeating pattern where each position `(r, c)` in the pattern maps to the same relative position `(r % sideLength, c % sideLength)` across the entire matrix.

### Incorrect Frequency Calculation

When calculating how many times a position in the pattern appears in the full matrix, you must account for partial tiles at the edges. The formula `(1 + (width - c - 1) / sideLength)` handles this, but off-by-one errors are common. Using `(width - c) / sideLength` or similar incorrect formulas will give wrong counts.

### Swapping Width and Height

The problem distinguishes between width (columns) and height (rows). Confusing these dimensions when calculating horizontal and vertical repetitions leads to incorrect frequency counts, especially when the matrix is not square.

### Greedy Selection Order

After computing frequencies, you must select the `maxOnes` positions with the highest frequencies. Forgetting to sort in descending order or selecting positions with lower frequencies will not maximize the total number of ones in the matrix.