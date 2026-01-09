## 1. Greedy + Two Pointers

### Intuition

To maximize our score, we should be strategic about which tokens we play face-up (losing power, gaining score) versus face-down (gaining power, losing score). The key insight is that when gaining score, we want to spend as little power as possible, and when gaining power, we want to gain as much as possible. Sorting the tokens lets us always play the smallest token face-up and the largest token face-down.

### Algorithm

1. Sort the tokens in ascending order.
2. Use two pointers: `l` starts at the beginning, `r` at the end.
3. While `l <= r`:
   - If we have enough power to play `tokens[l]` face-up, do it (gain 1 score, lose that power). Update the maximum score seen.
   - Else if we have at least 1 score, play `tokens[r]` face-down (lose 1 score, gain that power).
   - Otherwise, we can't make any more moves, so break.
4. Return the maximum score achieved.

::tabs-start

```python
class Solution:
    def bagOfTokensScore(self, tokens: List[int], power: int) -> int:
        res = score = 0
        tokens.sort()
        l, r = 0, len(tokens) - 1
        while l <= r:
            if power >= tokens[l]:
                power -= tokens[l]
                l += 1
                score += 1
                res = max(res, score)
            elif score > 0:
                power += tokens[r]
                r -= 1
                score -= 1
            else:
                break
        return res
```

```java
public class Solution {
    public int bagOfTokensScore(int[] tokens, int power) {
        Arrays.sort(tokens);
        int res = 0, score = 0, l = 0, r = tokens.length - 1;

        while (l <= r) {
            if (power >= tokens[l]) {
                power -= tokens[l++];
                score++;
                res = Math.max(res, score);
            } else if (score > 0) {
                power += tokens[r--];
                score--;
            } else {
                break;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bagOfTokensScore(vector<int>& tokens, int power) {
        sort(tokens.begin(), tokens.end());
        int res = 0, score = 0, l = 0, r = tokens.size() - 1;

        while (l <= r) {
            if (power >= tokens[l]) {
                power -= tokens[l++];
                score++;
                res = max(res, score);
            } else if (score > 0) {
                power += tokens[r--];
                score--;
            } else {
                break;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} tokens
     * @param {number} power
     * @return {number}
     */
    bagOfTokensScore(tokens, power) {
        tokens.sort((a, b) => a - b);
        let res = 0,
            score = 0,
            l = 0,
            r = tokens.length - 1;

        while (l <= r) {
            if (power >= tokens[l]) {
                power -= tokens[l++];
                score++;
                res = Math.max(res, score);
            } else if (score > 0) {
                power += tokens[r--];
                score--;
            } else {
                break;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int BagOfTokensScore(int[] tokens, int power) {
        Array.Sort(tokens);
        int res = 0, score = 0, l = 0, r = tokens.Length - 1;

        while (l <= r) {
            if (power >= tokens[l]) {
                power -= tokens[l++];
                score++;
                res = Math.Max(res, score);
            } else if (score > 0) {
                power += tokens[r--];
                score--;
            } else {
                break;
            }
        }

        return res;
    }
}
```

```go
func bagOfTokensScore(tokens []int, power int) int {
    sort.Ints(tokens)
    res, score, l, r := 0, 0, 0, len(tokens)-1

    for l <= r {
        if power >= tokens[l] {
            power -= tokens[l]
            l++
            score++
            if score > res {
                res = score
            }
        } else if score > 0 {
            power += tokens[r]
            r--
            score--
        } else {
            break
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun bagOfTokensScore(tokens: IntArray, power: Int): Int {
        tokens.sort()
        var res = 0
        var score = 0
        var l = 0
        var r = tokens.size - 1
        var p = power

        while (l <= r) {
            if (p >= tokens[l]) {
                p -= tokens[l++]
                score++
                res = maxOf(res, score)
            } else if (score > 0) {
                p += tokens[r--]
                score--
            } else {
                break
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func bagOfTokensScore(_ tokens: [Int], _ power: Int) -> Int {
        let tokens = tokens.sorted()
        var res = 0, score = 0, l = 0, r = tokens.count - 1
        var power = power

        while l <= r {
            if power >= tokens[l] {
                power -= tokens[l]
                l += 1
                score += 1
                res = max(res, score)
            } else if score > 0 {
                power += tokens[r]
                r -= 1
                score -= 1
            } else {
                break
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
