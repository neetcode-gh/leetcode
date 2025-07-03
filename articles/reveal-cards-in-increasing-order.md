## 1. Simulation Using Queue - I

::tabs-start

```python
class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        deck.sort()
        res = [0] * len(deck)
        q = deque(range(len(deck)))

        for num in deck:
            i = q.popleft()
            res[i] = num
            if q:
                q.append(q.popleft())

        return res
```

```java
public class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        Arrays.sort(deck);
        int n = deck.length;
        int[] res = new int[n];
        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            q.offer(i);
        }

        for (int num : deck) {
            int i = q.poll();
            res[i] = num;
            if (!q.isEmpty()) {
                q.offer(q.poll());
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        sort(deck.begin(), deck.end());
        int n = deck.size();
        vector<int> res(n);
        queue<int> q;

        for (int i = 0; i < n; i++) {
            q.push(i);
        }

        for (int num : deck) {
            int i = q.front();
            q.pop();
            res[i] = num;
            if (!q.empty()) {
                q.push(q.front());
                q.pop();
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} deck
     * @return {number[]}
     */
    deckRevealedIncreasing(deck) {
        deck.sort((a, b) => a - b);
        let n = deck.length;
        let res = new Array(n).fill(0);
        const q = new Queue();

        for (let i = 0; i < n; i++) {
            q.push(i);
        }

        for (let num of deck) {
            let i = q.pop();
            res[i] = num;
            if (!q.isEmpty()) {
                q.push(q.pop());
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Simuation Using Queue - II

::tabs-start

```python
class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        deck.sort()
        q = deque()
        for i in range(len(deck) - 1, -1, -1):
            if q:
                q.append(q.popleft())
            q.append(deck[i])
        return list(q)[::-1]
```

```java
public class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        Arrays.sort(deck);
        Queue<Integer> q = new LinkedList<>();

        for (int i = deck.length - 1; i >= 0; i--) {
            if (!q.isEmpty()) {
                q.offer(q.poll());
            }
            q.offer(deck[i]);
        }

        int[] res = new int[deck.length];
        for (int i = deck.length - 1; i >= 0; i--) {
            res[i] = q.poll();
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        sort(deck.begin(), deck.end());
        queue<int> q;

        for (int i = deck.size() - 1; i >= 0; i--) {
            if (!q.empty()) {
                q.push(q.front());
                q.pop();
            }
            q.push(deck[i]);
        }

        vector<int> res(deck.size());
        for (int i = deck.size() - 1; i >= 0; i--) {
            res[i] = q.front();
            q.pop();
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} deck
     * @return {number[]}
     */
    deckRevealedIncreasing(deck) {
        deck.sort((a, b) => a - b);
        const q = new Queue();

        for (let i = deck.length - 1; i >= 0; i--) {
            if (!q.isEmpty()) {
                q.push(q.pop());
            }
            q.push(deck[i]);
        }

        return q.toArray().reverse();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Simulation Using Deque

::tabs-start

```python
class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        deck.sort()
        dq = deque()
        dq.append(deck.pop())
        for i in range(len(deck) - 1, -1, -1):
            dq.appendleft(dq.pop())
            dq.appendleft(deck[i])
        return list(dq)
```

```java
public class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        int n = deck.length;
        Arrays.sort(deck);
        Deque<Integer> dq = new LinkedList<>();
        dq.addLast(deck[n - 1]);

        for (int i = n - 2; i >= 0; i--) {
            dq.addFirst(dq.removeLast());
            dq.addFirst(deck[i]);
        }

        return dq.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        sort(deck.begin(), deck.end());
        deque<int> dq;
        dq.push_back(deck.back());

        for (int i = deck.size() - 2; i >= 0; i--) {
            dq.push_front(dq.back());
            dq.pop_back();
            dq.push_front(deck[i]);
        }

        return vector<int>(dq.begin(), dq.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} deck
     * @return {number[]}
     */
    deckRevealedIncreasing(deck) {
        deck.sort((a, b) => a - b);
        const dq = new Deque([deck.pop()]);

        for (let i = deck.length - 1; i >= 0; i--) {
            let val = dq.popBack();
            dq.pushFront(val);
            dq.pushFront(deck[i]);
        }

        let res = [];
        while (!dq.isEmpty()) {
            res.push(dq.popFront());
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Simulation Using Two Pointers

::tabs-start

```python
class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        n = len(deck)
        res = [0] * n
        skip = False
        deckIndex, i = 0, 0

        deck.sort()

        while deckIndex < n:
            if res[i] == 0:
                if not skip:
                    res[i] = deck[deckIndex]
                    deckIndex += 1
                skip = not skip
            i = (i + 1) % n

        return res
```

```java
public class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        int n = deck.length;
        int[] res = new int[n];
        Arrays.fill(res, 0);
        boolean skip = false;
        int deckIndex = 0, i = 0;

        Arrays.sort(deck);

        while (deckIndex < n) {
            if (res[i] == 0) {
                if (!skip) {
                    res[i] = deck[deckIndex++];
                }
                skip = !skip;
            }
            i = (i + 1) % n;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        int n = deck.size();
        vector<int> res(n, 0);
        bool skip = false;
        int deckIndex = 0, i = 0;

        sort(deck.begin(), deck.end());

        while (deckIndex < n) {
            if (res[i] == 0) {
                if (!skip) {
                    res[i] = deck[deckIndex++];
                }
                skip = !skip;
            }
            i = (i + 1) % n;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} deck
     * @return {number[]}
     */
    deckRevealedIncreasing(deck) {
        let n = deck.length;
        let res = new Array(n).fill(0);
        let skip = false;
        let deckIndex = 0,
            i = 0;

        deck.sort((a, b) => a - b);

        while (deckIndex < n) {
            if (res[i] === 0) {
                if (!skip) {
                    res[i] = deck[deckIndex++];
                }
                skip = !skip;
            }
            i = (i + 1) % n;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n)$ space for the output array.
