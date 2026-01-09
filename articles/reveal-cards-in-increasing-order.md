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

```csharp
public class Solution {
    public int[] DeckRevealedIncreasing(int[] deck) {
        Array.Sort(deck);
        int n = deck.Length;
        int[] res = new int[n];
        Queue<int> q = new Queue<int>();

        for (int i = 0; i < n; i++) {
            q.Enqueue(i);
        }

        foreach (int num in deck) {
            int i = q.Dequeue();
            res[i] = num;
            if (q.Count > 0) {
                q.Enqueue(q.Dequeue());
            }
        }

        return res;
    }
}
```

```go
func deckRevealedIncreasing(deck []int) []int {
    sort.Ints(deck)
    n := len(deck)
    res := make([]int, n)
    q := []int{}

    for i := 0; i < n; i++ {
        q = append(q, i)
    }

    for _, num := range deck {
        i := q[0]
        q = q[1:]
        res[i] = num
        if len(q) > 0 {
            q = append(q, q[0])
            q = q[1:]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun deckRevealedIncreasing(deck: IntArray): IntArray {
        deck.sort()
        val n = deck.size
        val res = IntArray(n)
        val q = ArrayDeque<Int>()

        for (i in 0 until n) {
            q.add(i)
        }

        for (num in deck) {
            val i = q.removeFirst()
            res[i] = num
            if (q.isNotEmpty()) {
                q.add(q.removeFirst())
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func deckRevealedIncreasing(_ deck: [Int]) -> [Int] {
        let sortedDeck = deck.sorted()
        let n = sortedDeck.count
        var res = [Int](repeating: 0, count: n)
        var q = Array(0..<n)

        for num in sortedDeck {
            let i = q.removeFirst()
            res[i] = num
            if !q.isEmpty {
                q.append(q.removeFirst())
            }
        }

        return res
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

```csharp
public class Solution {
    public int[] DeckRevealedIncreasing(int[] deck) {
        Array.Sort(deck);
        Queue<int> q = new Queue<int>();

        for (int i = deck.Length - 1; i >= 0; i--) {
            if (q.Count > 0) {
                q.Enqueue(q.Dequeue());
            }
            q.Enqueue(deck[i]);
        }

        int[] res = new int[deck.Length];
        for (int i = deck.Length - 1; i >= 0; i--) {
            res[i] = q.Dequeue();
        }
        return res;
    }
}
```

```go
func deckRevealedIncreasing(deck []int) []int {
    sort.Ints(deck)
    q := []int{}

    for i := len(deck) - 1; i >= 0; i-- {
        if len(q) > 0 {
            q = append(q, q[0])
            q = q[1:]
        }
        q = append(q, deck[i])
    }

    res := make([]int, len(deck))
    for i := len(deck) - 1; i >= 0; i-- {
        res[i] = q[0]
        q = q[1:]
    }
    return res
}
```

```kotlin
class Solution {
    fun deckRevealedIncreasing(deck: IntArray): IntArray {
        deck.sort()
        val q = ArrayDeque<Int>()

        for (i in deck.size - 1 downTo 0) {
            if (q.isNotEmpty()) {
                q.add(q.removeFirst())
            }
            q.add(deck[i])
        }

        val res = IntArray(deck.size)
        for (i in deck.size - 1 downTo 0) {
            res[i] = q.removeFirst()
        }
        return res
    }
}
```

```swift
class Solution {
    func deckRevealedIncreasing(_ deck: [Int]) -> [Int] {
        let sortedDeck = deck.sorted()
        var q = [Int]()

        for i in stride(from: sortedDeck.count - 1, through: 0, by: -1) {
            if !q.isEmpty {
                q.append(q.removeFirst())
            }
            q.append(sortedDeck[i])
        }

        var res = [Int](repeating: 0, count: deck.count)
        for i in stride(from: deck.count - 1, through: 0, by: -1) {
            res[i] = q.removeFirst()
        }
        return res
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

```csharp
public class Solution {
    public int[] DeckRevealedIncreasing(int[] deck) {
        int n = deck.Length;
        Array.Sort(deck);
        LinkedList<int> dq = new LinkedList<int>();
        dq.AddLast(deck[n - 1]);

        for (int i = n - 2; i >= 0; i--) {
            dq.AddFirst(dq.Last.Value);
            dq.RemoveLast();
            dq.AddFirst(deck[i]);
        }

        return dq.ToArray();
    }
}
```

```go
func deckRevealedIncreasing(deck []int) []int {
    sort.Ints(deck)
    n := len(deck)
    dq := []int{deck[n-1]}

    for i := n - 2; i >= 0; i-- {
        dq = append([]int{dq[len(dq)-1]}, dq[:len(dq)-1]...)
        dq = append([]int{deck[i]}, dq...)
    }

    return dq
}
```

```kotlin
class Solution {
    fun deckRevealedIncreasing(deck: IntArray): IntArray {
        deck.sort()
        val dq = ArrayDeque<Int>()
        dq.addLast(deck[deck.size - 1])

        for (i in deck.size - 2 downTo 0) {
            dq.addFirst(dq.removeLast())
            dq.addFirst(deck[i])
        }

        return dq.toIntArray()
    }
}
```

```swift
class Solution {
    func deckRevealedIncreasing(_ deck: [Int]) -> [Int] {
        var sortedDeck = deck.sorted()
        var dq = [sortedDeck.removeLast()]

        for i in stride(from: sortedDeck.count - 1, through: 0, by: -1) {
            dq.insert(dq.removeLast(), at: 0)
            dq.insert(sortedDeck[i], at: 0)
        }

        return dq
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

```csharp
public class Solution {
    public int[] DeckRevealedIncreasing(int[] deck) {
        int n = deck.Length;
        int[] res = new int[n];
        bool skip = false;
        int deckIndex = 0, i = 0;

        Array.Sort(deck);

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

```go
func deckRevealedIncreasing(deck []int) []int {
    sort.Ints(deck)
    n := len(deck)
    res := make([]int, n)
    skip := false
    deckIndex, i := 0, 0

    for deckIndex < n {
        if res[i] == 0 {
            if !skip {
                res[i] = deck[deckIndex]
                deckIndex++
            }
            skip = !skip
        }
        i = (i + 1) % n
    }

    return res
}
```

```kotlin
class Solution {
    fun deckRevealedIncreasing(deck: IntArray): IntArray {
        deck.sort()
        val n = deck.size
        val res = IntArray(n)
        var skip = false
        var deckIndex = 0
        var i = 0

        while (deckIndex < n) {
            if (res[i] == 0) {
                if (!skip) {
                    res[i] = deck[deckIndex++]
                }
                skip = !skip
            }
            i = (i + 1) % n
        }

        return res
    }
}
```

```swift
class Solution {
    func deckRevealedIncreasing(_ deck: [Int]) -> [Int] {
        var sortedDeck = deck.sorted()
        let n = sortedDeck.count
        var res = [Int](repeating: 0, count: n)
        var skip = false
        var deckIndex = 0
        var i = 0

        while deckIndex < n {
            if res[i] == 0 {
                if !skip {
                    res[i] = sortedDeck[deckIndex]
                    deckIndex += 1
                }
                skip = !skip
            }
            i = (i + 1) % n
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n)$ space for the output array.
