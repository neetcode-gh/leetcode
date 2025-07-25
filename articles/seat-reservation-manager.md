## 1. Brute Force

::tabs-start

```python
class SeatManager:

    def __init__(self, n: int):
        self.seats = [False] * n

    def reserve(self) -> int:
        for i in range(len(self.seats)):
            if not self.seats[i]:
                self.seats[i] = True
                return i + 1

    def unreserve(self, seatNumber: int) -> None:
        self.seats[seatNumber - 1] = False
```

```java
public class SeatManager {
    private boolean[] seats;

    public SeatManager(int n) {
        seats = new boolean[n];
    }

    public int reserve() {
        for (int i = 0; i < seats.length; i++) {
            if (!seats[i]) {
                seats[i] = true;
                return i + 1;
            }
        }
        return -1;
    }

    public void unreserve(int seatNumber) {
        seats[seatNumber - 1] = false;
    }
}
```

```cpp
class SeatManager {
private:
    vector<bool> seats;

public:
    SeatManager(int n) : seats(n, false) {}

    int reserve() {
        for (int i = 0; i < seats.size(); i++) {
            if (!seats[i]) {
                seats[i] = true;
                return i + 1;
            }
        }
        return -1;
    }

    void unreserve(int seatNumber) {
        seats[seatNumber - 1] = false;
    }
};
```

```javascript
class SeatManager {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.seats = new Array(n).fill(false);
    }

    /**
     * @return {number}
     */
    reserve() {
        for (let i = 0; i < this.seats.length; i++) {
            if (!this.seats[i]) {
                this.seats[i] = true;
                return i + 1;
            }
        }
    }

    /**
     * @param {number} seatNumber
     * @return {void}
     */
    unreserve(seatNumber) {
        this.seats[seatNumber - 1] = false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(n)$ time for each $reserve()$ function call.
    - $O(1)$ time for each $unreserve()$ function call.
- Space complexity: $O(n)$

---

## 2. Min-Heap

::tabs-start

```python
class SeatManager:
    def __init__(self, n: int):
        self.unres = list(range(1, n + 1))
        heapq.heapify(self.unres)

    def reserve(self) -> int:
        return heapq.heappop(self.unres)

    def unreserve(self, seatNumber: int) -> None:
        heapq.heappush(self.unres, seatNumber)
```

```java
public class SeatManager {
    private PriorityQueue<Integer> unres;

    public SeatManager(int n) {
        unres = new PriorityQueue<>();
        for (int i = 1; i <= n; i++) {
            unres.offer(i);
        }
    }

    public int reserve() {
        return unres.poll();
    }

    public void unreserve(int seatNumber) {
        unres.offer(seatNumber);
    }
}
```

```cpp
class SeatManager {
private:
    priority_queue<int, vector<int>, greater<int>> unres;

public:
    SeatManager(int n) {
        for (int i = 1; i <= n; i++) {
            unres.push(i);
        }
    }

    int reserve() {
        int seat = unres.top();
        unres.pop();
        return seat;
    }

    void unreserve(int seatNumber) {
        unres.push(seatNumber);
    }
};
```

```javascript
class SeatManager {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.unres = new MinPriorityQueue();
        for (let i = 1; i <= n; i++) {
            this.unres.enqueue(i);
        }
    }

    /**
     * @return {number}
     */
    reserve() {
        return this.unres.dequeue();
    }

    /**
     * @param {number} seatNumber
     * @return {void}
     */
    unreserve(seatNumber) {
        this.unres.enqueue(seatNumber);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n \log n)$ time for initialization.
    - $O(\log n)$ time for each $reserve()$ function call.
    - $O(\log n)$ time for each $unreserve()$ function call.
- Space complexity: $O(n)$

---

## 3. Min-Heap (Optimal)

::tabs-start

```python
class SeatManager:
    def __init__(self, n: int):
        self.minHeap = []
        self.nextSeat = 1

    def reserve(self) -> int:
        if self.minHeap:
            return heapq.heappop(self.minHeap)

        seat = self.nextSeat
        self.nextSeat += 1
        return seat

    def unreserve(self, seatNumber: int) -> None:
        heapq.heappush(self.minHeap, seatNumber)
```

```java
public class SeatManager {
    private PriorityQueue<Integer> minHeap;
    private int nextSeat;

    public SeatManager(int n) {
        minHeap = new PriorityQueue<>();
        nextSeat = 1;
    }

    public int reserve() {
        if (!minHeap.isEmpty()) {
            return minHeap.poll();
        }
        return nextSeat++;
    }

    public void unreserve(int seatNumber) {
        minHeap.offer(seatNumber);
    }
}
```

```cpp
class SeatManager {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int nextSeat;

public:
    SeatManager(int n) {
        nextSeat = 1;
    }

    int reserve() {
        if (!minHeap.empty()) {
            int seat = minHeap.top();
            minHeap.pop();
            return seat;
        }
        return nextSeat++;
    }

    void unreserve(int seatNumber) {
        minHeap.push(seatNumber);
    }
};
```

```javascript
class SeatManager {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.minHeap = new MinPriorityQueue();
        this.nextSeat = 1;
    }

    /**
     * @return {number}
     */
    reserve() {
        if (!this.minHeap.isEmpty()) {
            return this.minHeap.dequeue();
        }
        return this.nextSeat++;
    }

    /**
     * @param {number} seatNumber
     * @return {void}
     */
    unreserve(seatNumber) {
        this.minHeap.enqueue(seatNumber);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(\log n)$ time for each $reserve()$ function call.
    - $O(\log n)$ time for each $unreserve()$ function call.
- Space complexity: $O(n)$

---

## 4. Ordered Set

::tabs-start

```python
class SeatManager:
    def __init__(self, n: int):
        self.available = SortedSet()
        self.nextSeat = 1

    def reserve(self) -> int:
        if self.available:
            return self.available.pop(0)

        seat = self.nextSeat
        self.nextSeat += 1
        return seat

    def unreserve(self, seatNumber: int) -> None:
        self.available.add(seatNumber)
```

```java
public class SeatManager {
    private TreeSet<Integer> available;
    private int nextSeat;

    public SeatManager(int n) {
        available = new TreeSet<>();
        nextSeat = 1;
    }

    public int reserve() {
        if (!available.isEmpty()) {
            return available.pollFirst();
        }
        return nextSeat++;
    }

    public void unreserve(int seatNumber) {
        available.add(seatNumber);
    }
}
```

```cpp
class SeatManager {
private:
    set<int> available;
    int nextSeat;

public:
    SeatManager(int n) {
        nextSeat = 1;
    }

    int reserve() {
        if (!available.empty()) {
            int seat = *available.begin();
            available.erase(available.begin());
            return seat;
        }
        return nextSeat++;
    }

    void unreserve(int seatNumber) {
        available.insert(seatNumber);
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(\log n)$ time for each $reserve()$ function call.
    - $O(\log n)$ time for each $unreserve()$ function call.
- Space complexity: $O(n)$
