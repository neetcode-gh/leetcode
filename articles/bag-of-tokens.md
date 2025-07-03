## 1. Greedy + Two Pointers

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
