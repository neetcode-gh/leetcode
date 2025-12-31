## 1. Top-Down Dynamic Programming (Recursion + Memoization)

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        def total_ways(i):
            if i == 1:
                return k
            if i == 2:
                return k * k
            
            # Check if we have already calculated totalWays(i)
            if i in memo:
                return memo[i]
            
            # Use the recurrence relation to calculate total_ways(i)
            memo[i] = (k - 1) * (total_ways(i - 1) + total_ways(i - 2))
            return memo[i]

        memo = {}
        return total_ways(n)
```

```java
class Solution {
    private HashMap<Integer, Integer> memo = new HashMap<Integer, Integer>();
    
    private int totalWays(int i, int k) {
        if (i == 1) return k;
        if (i == 2) return k * k;
        
        // Check if we have already calculated totalWays(i)
        if (memo.containsKey(i)) {
            return memo.get(i);
        }
        
        // Use the recurrence relation to calculate totalWays(i)
        memo.put(i, (k - 1) * (totalWays(i - 1, k) + totalWays(i - 2, k)));
        return memo.get(i);
    }
    
    public int numWays(int n, int k) {
        return totalWays(n, k);
    }
}
```

```cpp
class Solution {
private:
    unordered_map<int, int> memo;
    
    int totalWays(int i, int k) {
        if (i == 1) return k;
        
        if (i == 2) return k * k;
        
        // Check if we have already calculated totalWays(i)
        if (memo.find(i) != memo.end()) {
            return memo[i];
        }
        
        // Use the recurrence relation to calculate totalWays(i)
        memo[i] = (k - 1) * (totalWays(i - 1, k) + totalWays(i - 2, k));
        return memo[i];
    }
    
public:
    int numWays(int n, int k) {
        return totalWays(n, k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        const memo = {};
        
        const total_ways = (i) => {
            if (i === 1) {
                return k;
            }
            
            if (i === 2) {
                return k * k;
            }
            
            // Check if we have already calculated total_ways(i)
            if (i in memo) {
                return memo[i];
            }
            
            // Use the recurrence relation to calculate total_ways(i)
            memo[i] = (k - 1) * (total_ways(i - 1) + total_ways(i - 2));
            return memo[i];
        };
        
        return total_ways(n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of fence posts.

---

## 2. Bottom-Up Dynamic Programming (Tabulation)

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        # Base cases for the problem to avoid index out of bound issues
        if n == 1:
            return k
        if n == 2:
            return k * k

        total_ways = [0] * (n + 1)
        total_ways[1] = k
        total_ways[2] = k * k
        
        for i in range(3, n + 1):
            total_ways[i] = (k - 1) * (total_ways[i - 1] + total_ways[i - 2])
        
        return total_ways[n]
```

```java
class Solution {
    public int numWays(int n, int k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n == 1) return k;
        if (n == 2) return k * k;
        
        int totalWays[] = new int[n + 1];
        totalWays[1] = k;
        totalWays[2] = k * k;
        
        for (int i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }
        
        return totalWays[n];
    }
}
```

```cpp
class Solution {
public:
    int numWays(int n, int k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n == 1) return k;
        if (n == 2) return k * k;
        
        int totalWays[n + 1];
        totalWays[1] = k;
        totalWays[2] = k * k;
        
        for (int i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }
        
        return totalWays[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n === 1) return k;
        if (n === 2) return k * k;
        
        let totalWays = new Array(n + 1);
        totalWays[1] = k;
        totalWays[2] = k * k;
        
        for (let i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }
        
        return totalWays[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of fence posts.

---

## 3. Bottom-Up, Constant Space

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 1:
            return k
        
        two_posts_back = k
        one_post_back = k * k
        
        for i in range(3, n + 1):
            curr = (k - 1) * (one_post_back + two_posts_back)
            two_posts_back = one_post_back
            one_post_back = curr

        return one_post_back
```

```java
class Solution {
    public int numWays(int n, int k) {
        if (n == 1) return k;
        
        int twoPostsBack = k;
        int onePostBack = k * k;
        
        for (int i = 3; i <= n; i++) {
            int curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }
        
        return onePostBack;
    }
}
```

```cpp
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 1) return k;

        int twoPostsBack = k;
        int onePostBack = k * k;

        for (int i = 3; i <= n; i++) {
            int curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }

        return onePostBack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        if (n === 1) return k;
        
        let twoPostsBack = k;
        let onePostBack = k * k;

        for (let i = 3; i <= n; i++) {
            let curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }

        return onePostBack;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of fence posts.
