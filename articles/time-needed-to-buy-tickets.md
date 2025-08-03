## 1. Queue

::tabs-start

```python
class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        n = len(tickets)
        q = deque()

        for i in range(n):
            q.append(i)

        time = 0
        while q:
            time += 1
            cur = q.popleft()
            tickets[cur] -= 1
            if tickets[cur] == 0:
                if cur == k:
                    return time
            else:
                q.append(cur)
        return time
```

```java
public class Solution {
    public int timeRequiredToBuy(int[] tickets, int k) {
        int n = tickets.length;
        Queue<Integer> queue = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            queue.add(i);
        }

        int time = 0;
        while (!queue.isEmpty()) {
            time++;
            int cur = queue.poll();
            tickets[cur]--;
            if (tickets[cur] == 0) {
                if (cur == k) {
                    return time;
                }
            } else {
                queue.add(cur);
            }
        }
        return time;
    }
}
```

```cpp
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int n = tickets.size();
        queue<int> q;

        for (int i = 0; i < n; i++) {
            q.push(i);
        }

        int time = 0;
        while (!q.empty()) {
            time++;
            int cur = q.front();
            q.pop();
            tickets[cur]--;
            if (tickets[cur] == 0) {
                if (cur == k) {
                    return time;
                }
            } else {
                q.push(cur);
            }
        }
        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} tickets
     * @param {number} k
     * @return {number}
     */
    timeRequiredToBuy(tickets, k) {
        let n = tickets.length;
        let queue = new Queue();

        for (let i = 0; i < n; i++) {
            queue.push(i);
        }

        let time = 0;
        while (queue.size() > 0) {
            time++;
            let cur = queue.pop();
            tickets[cur]--;
            if (tickets[cur] === 0) {
                if (cur === k) {
                    return time;
                }
            } else {
                queue.push(cur);
            }
        }
        return time;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the input array and $m$ is the maximum value in the input array.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        n = len(tickets)
        idx = 0

        time = 0
        while True:
            time += 1
            tickets[idx] -= 1
            if tickets[idx] == 0:
                if idx == k:
                    return time
            idx = (idx + 1) % n
            while tickets[idx] == 0:
                idx = (idx + 1) % n

        return time
```

```java
public class Solution {
    public int timeRequiredToBuy(int[] tickets, int k) {
        int n = tickets.length;
        int idx = 0;

        int time = 0;
        while (true) {
            time++;
            tickets[idx]--;
            if (tickets[idx] == 0) {
                if (idx == k) {
                    return time;
                }
            }
            idx = (idx + 1) % n;
            while (tickets[idx] == 0) {
                idx = (idx + 1) % n;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int n = tickets.size();
        int idx = 0;

        int time = 0;
        while (true) {
            time++;
            tickets[idx]--;
            if (tickets[idx] == 0) {
                if (idx == k) {
                    return time;
                }
            }
            idx = (idx + 1) % n;
            while (tickets[idx] == 0) {
                idx = (idx + 1) % n;
            }
        }

        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} tickets
     * @param {number} k
     * @return {number}
     */
    timeRequiredToBuy(tickets, k) {
        let n = tickets.length;
        let idx = 0;

        let time = 0;
        while (true) {
            time++;
            tickets[idx]--;
            if (tickets[idx] === 0) {
                if (idx === k) {
                    return time;
                }
            }
            idx = (idx + 1) % n;
            while (tickets[idx] === 0) {
                idx = (idx + 1) % n;
            }
        }

        return time;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ is the size of the input array and $m$ is the maximum value in the input array.

---

## 3. Iteration (One Pass)

::tabs-start

```python
class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        res = 0

        for i in range(len(tickets)):
            if i <= k:
                res += min(tickets[i], tickets[k])
            else:
                res += min(tickets[i], tickets[k] - 1)

        return res
```

```java
public class Solution {
    public int timeRequiredToBuy(int[] tickets, int k) {
        int res = 0;

        for (int i = 0; i < tickets.length; i++) {
            if (i <= k) {
                res += Math.min(tickets[i], tickets[k]);
            } else {
                res += Math.min(tickets[i], tickets[k] - 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int res = 0;

        for (int i = 0; i < tickets.size(); i++) {
            if (i <= k) {
                res += min(tickets[i], tickets[k]);
            } else {
                res += min(tickets[i], tickets[k] - 1);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} tickets
     * @param {number} k
     * @return {number}
     */
    timeRequiredToBuy(tickets, k) {
        let res = 0;

        for (let i = 0; i < tickets.length; i++) {
            if (i <= k) {
                res += Math.min(tickets[i], tickets[k]);
            } else {
                res += Math.min(tickets[i], tickets[k] - 1);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
