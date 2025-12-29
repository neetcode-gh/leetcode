## 1. Backtracking

::tabs-start

```python
class Solution:
    def _backtracking(self, factors: List[int], ans: List[List[int]]) -> None:
        # Got a solution.
        if len(factors) > 1:
            ans.append(factors.copy())
        
        last_factor = factors.pop()
        
        i = 2 if not factors else factors[-1]
        while i <= last_factor // i:
            if last_factor % i == 0:
                # Add i and last_factor // i.
                factors.append(i)
                factors.append(last_factor // i)
                self._backtracking(factors, ans)
                # Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.pop()
                factors.pop()
            i += 1
        
        # Add last_factor back to factors to restore it.
        factors.append(last_factor)
    
    def getFactors(self, n: int) -> List[List[int]]:
        ans = []
        self._backtracking([n], ans)
        return ans
```

```java
class Solution {
    private void backtracking(final LinkedList<Integer> factors, final List<List<Integer>> ans) {
        // Got a solution.
        if (factors.size() > 1) {
            ans.add(new ArrayList(factors));
        }

        final int lastFactor = factors.removeLast();
        
        for (int i = factors.isEmpty() ? 2 : factors.peekLast(); i <=  lastFactor / i; ++i) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.add(i);
                factors.add(lastFactor / i);
                backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.removeLast();
                factors.removeLast();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.add(lastFactor);
    }

    public List<List<Integer>> getFactors(int n) {
        final List<List<Integer>> ans = new LinkedList<>();
        backtracking(new LinkedList<>(Arrays.asList(n)), ans);

        return ans;
    }
}
```

```cpp
class Solution {
    void backtracking(vector<int>& factors, vector<vector<int>>& ans) {
        // Got a solution,
        if (factors.size() > 1) {
            ans.push_back(factors);
        }

        const int lastFactor = factors.back();
        factors.pop_back();

        for (int i = factors.empty() ? 2 : factors.back(); i <= lastFactor / i; ++i) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.push_back(i);
                factors.push_back(lastFactor / i);
                backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns
                factors.pop_back();
                factors.pop_back();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.push_back(lastFactor);
    }

public:
    vector<vector<int>> getFactors(int n) {
        vector<int> factors = {n};
        vector<vector<int>> ans;
        backtracking(factors, ans);

        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} factors
     * @param {number[][]} ans
     */
    _backtracking(factors, ans) {
        // Got a solution.
        if (factors.length > 1) {
            ans.push([...factors]);
        }

        const lastFactor = factors.pop();

        for (let i = factors.length === 0 ? 2 : factors[factors.length - 1]; i <= Math.floor(lastFactor / i); ++i) {
            if (lastFactor % i === 0) {
                // Add i and lastFactor / i.
                factors.push(i);
                factors.push(Math.floor(lastFactor / i));
                this._backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.pop();
                factors.pop();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.push(lastFactor);
    }

    /**
     * @param {number} n
     * @return {number[][]}
     */
    getFactors(n) {
        const ans = [];
        this._backtracking([n], ans);
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^{1.5})$

- Space complexity: $O(\log (n))$

>  Where $n$ is the input integer `n`.

---

## 2. Iterative DFS

::tabs-start

```java
class Solution {
    public List<List<Integer>> getFactors(int n) {

        final List<List<Integer>> ans = new LinkedList<>();
        final Stack<LinkedList<Integer>> stack = new Stack<>();
        stack.push(new LinkedList<>(new LinkedList<>(Arrays.asList(n))));

        while (!stack.isEmpty()) {
            final LinkedList<Integer> factors = stack.pop();
            final int lastFactor = factors.removeLast();
            
            for (int i = factors.isEmpty() ? 2 : factors.peekLast(); i <=  lastFactor / i; ++i) {
                if (lastFactor % i == 0) {
                    // Add i and lastFactor / i.
                    LinkedList<Integer> newFactors = new LinkedList<>(factors);
                    newFactors.add(i);
                    newFactors.add(lastFactor / i);
                    stack.push(newFactors);
                    ans.add(new LinkedList<>(newFactors));
                }
            }
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> getFactors(int n) {
        vector<vector<int>> ans;
        stack<vector<int>> stack;
        stack.push({n});

        while (!stack.empty()) {
            auto factors = stack.top();
            stack.pop();
            const int lastFactor = factors.back();
            factors.pop_back();

            for (int i = factors.empty() ? 2 : factors.back(); i <= lastFactor / i; ++i) {
                if (lastFactor % i == 0) {
                    vector<int> newFactors = factors;
                    newFactors.push_back(i);
                    newFactors.push_back(lastFactor / i);
                    stack.push(newFactors);
                    ans.push_back(newFactors);
                }
            }
        }

        return ans;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^{1.5})$

- Space complexity: $O(n \cdot \log (n))$

>  Where $n$ is the input integer `n`.
