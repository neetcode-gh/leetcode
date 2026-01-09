## 1. Brute Force

### Intuition

The simplest way to manage seat reservations is to track each seat's status with a boolean array. When someone reserves, we scan from the beginning to find the first unreserved seat. When someone unreserves, we simply mark that seat as available again. This guarantees we always return the smallest available seat number, but the linear scan makes reservations slow for large numbers of seats.

### Algorithm

1. Initialize a boolean array `seats` of size `n`, where `false` means unreserved.
2. For `reserve()`:
   - Scan through the array from index `0`.
   - Find the first seat that is `false` (unreserved).
   - Mark it as `true` (reserved) and return the seat number (index + 1).
3. For `unreserve(seatNumber)`:
   - Mark `seats[seatNumber - 1]` as `false`.

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

```csharp
public class SeatManager {
    private bool[] seats;

    public SeatManager(int n) {
        seats = new bool[n];
    }

    public int Reserve() {
        for (int i = 0; i < seats.Length; i++) {
            if (!seats[i]) {
                seats[i] = true;
                return i + 1;
            }
        }
        return -1;
    }

    public void Unreserve(int seatNumber) {
        seats[seatNumber - 1] = false;
    }
}
```

```go
type SeatManager struct {
    seats []bool
}

func Constructor(n int) SeatManager {
    return SeatManager{seats: make([]bool, n)}
}

func (this *SeatManager) Reserve() int {
    for i := 0; i < len(this.seats); i++ {
        if !this.seats[i] {
            this.seats[i] = true
            return i + 1
        }
    }
    return -1
}

func (this *SeatManager) Unreserve(seatNumber int) {
    this.seats[seatNumber-1] = false
}
```

```kotlin
class SeatManager(n: Int) {
    private val seats = BooleanArray(n)

    fun reserve(): Int {
        for (i in seats.indices) {
            if (!seats[i]) {
                seats[i] = true
                return i + 1
            }
        }
        return -1
    }

    fun unreserve(seatNumber: Int) {
        seats[seatNumber - 1] = false
    }
}
```

```swift
class SeatManager {
    private var seats: [Bool]

    init(_ n: Int) {
        seats = [Bool](repeating: false, count: n)
    }

    func reserve() -> Int {
        for i in 0..<seats.count {
            if !seats[i] {
                seats[i] = true
                return i + 1
            }
        }
        return -1
    }

    func unreserve(_ seatNumber: Int) {
        seats[seatNumber - 1] = false
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

### Intuition

To efficiently retrieve the smallest available seat, we can use a min-heap. By initializing the heap with all seat numbers from 1 to `n`, the smallest seat is always at the top. Reserving pops from the heap, and unreserving pushes back onto it. The heap maintains the ordering automatically.

### Algorithm

1. Initialize a min-heap with all seat numbers from 1 to `n`.
2. For `reserve()`:
   - Pop and return the minimum element from the heap.
3. For `unreserve(seatNumber)`:
   - Push `seatNumber` back into the heap.

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

```csharp
public class SeatManager {
    private PriorityQueue<int, int> unres;

    public SeatManager(int n) {
        unres = new PriorityQueue<int, int>();
        for (int i = 1; i <= n; i++) {
            unres.Enqueue(i, i);
        }
    }

    public int Reserve() {
        return unres.Dequeue();
    }

    public void Unreserve(int seatNumber) {
        unres.Enqueue(seatNumber, seatNumber);
    }
}
```

```go
import "container/heap"

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type SeatManager struct {
    unres *MinHeap
}

func Constructor(n int) SeatManager {
    h := &MinHeap{}
    heap.Init(h)
    for i := 1; i <= n; i++ {
        heap.Push(h, i)
    }
    return SeatManager{unres: h}
}

func (this *SeatManager) Reserve() int {
    return heap.Pop(this.unres).(int)
}

func (this *SeatManager) Unreserve(seatNumber int) {
    heap.Push(this.unres, seatNumber)
}
```

```kotlin
import java.util.PriorityQueue

class SeatManager(n: Int) {
    private val unres = PriorityQueue<Int>()

    init {
        for (i in 1..n) {
            unres.offer(i)
        }
    }

    fun reserve(): Int {
        return unres.poll()
    }

    fun unreserve(seatNumber: Int) {
        unres.offer(seatNumber)
    }
}
```

```swift
class SeatManager {
    private var unres: Heap<Int>

    init(_ n: Int) {
        unres = Heap<Int>()
        for i in 1...n {
            unres.insert(i)
        }
    }

    func reserve() -> Int {
        return unres.popMin()!
    }

    func unreserve(_ seatNumber: Int) {
        unres.insert(seatNumber)
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

### Intuition

Rather than pre-populating the heap with all `n` seats, we can lazily assign seats. We track a counter `nextSeat` that represents the next fresh seat to assign. When reserving, if no previously unreserved seats are in the heap, we simply hand out `nextSeat` and increment it. This avoids O(n log n) initialization and handles the common case where seats are reserved in order very efficiently.

### Algorithm

1. Initialize an empty min-heap and set `nextSeat = 1`.
2. For `reserve()`:
   - If the heap is not empty, pop and return the minimum.
   - Otherwise, return `nextSeat` and increment it.
3. For `unreserve(seatNumber)`:
   - Push `seatNumber` into the heap.

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

```csharp
public class SeatManager {
    private PriorityQueue<int, int> minHeap;
    private int nextSeat;

    public SeatManager(int n) {
        minHeap = new PriorityQueue<int, int>();
        nextSeat = 1;
    }

    public int Reserve() {
        if (minHeap.Count > 0) {
            return minHeap.Dequeue();
        }
        return nextSeat++;
    }

    public void Unreserve(int seatNumber) {
        minHeap.Enqueue(seatNumber, seatNumber);
    }
}
```

```go
import "container/heap"

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type SeatManager struct {
    minHeap  *MinHeap
    nextSeat int
}

func Constructor(n int) SeatManager {
    h := &MinHeap{}
    heap.Init(h)
    return SeatManager{minHeap: h, nextSeat: 1}
}

func (this *SeatManager) Reserve() int {
    if this.minHeap.Len() > 0 {
        return heap.Pop(this.minHeap).(int)
    }
    seat := this.nextSeat
    this.nextSeat++
    return seat
}

func (this *SeatManager) Unreserve(seatNumber int) {
    heap.Push(this.minHeap, seatNumber)
}
```

```kotlin
import java.util.PriorityQueue

class SeatManager(n: Int) {
    private val minHeap = PriorityQueue<Int>()
    private var nextSeat = 1

    fun reserve(): Int {
        return if (minHeap.isNotEmpty()) {
            minHeap.poll()
        } else {
            nextSeat++
        }
    }

    fun unreserve(seatNumber: Int) {
        minHeap.offer(seatNumber)
    }
}
```

```swift
class SeatManager {
    private var minHeap: Heap<Int>
    private var nextSeat: Int

    init(_ n: Int) {
        minHeap = Heap<Int>()
        nextSeat = 1
    }

    func reserve() -> Int {
        if !minHeap.isEmpty {
            return minHeap.popMin()!
        }
        let seat = nextSeat
        nextSeat += 1
        return seat
    }

    func unreserve(_ seatNumber: Int) {
        minHeap.insert(seatNumber)
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

### Intuition

An ordered set (like TreeSet or SortedSet) keeps elements sorted and allows efficient retrieval of the minimum. Similar to the optimal min-heap approach, we lazily track unreserved seats. The ordered set provides O(log n) insertion, deletion, and minimum retrieval, making it a clean alternative to the heap.

### Algorithm

1. Initialize an empty ordered set `available` and set `nextSeat = 1`.
2. For `reserve()`:
   - If the set is not empty, remove and return the smallest element.
   - Otherwise, return `nextSeat` and increment it.
3. For `unreserve(seatNumber)`:
   - Add `seatNumber` to the set.

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

```csharp
public class SeatManager {
    private SortedSet<int> available;
    private int nextSeat;

    public SeatManager(int n) {
        available = new SortedSet<int>();
        nextSeat = 1;
    }

    public int Reserve() {
        if (available.Count > 0) {
            int seat = available.Min;
            available.Remove(seat);
            return seat;
        }
        return nextSeat++;
    }

    public void Unreserve(int seatNumber) {
        available.Add(seatNumber);
    }
}
```

```go
import "github.com/emirpasic/gods/trees/redblacktree"

type SeatManager struct {
    available *redblacktree.Tree
    nextSeat  int
}

func Constructor(n int) SeatManager {
    return SeatManager{
        available: redblacktree.NewWithIntComparator(),
        nextSeat:  1,
    }
}

func (this *SeatManager) Reserve() int {
    if this.available.Size() > 0 {
        node := this.available.Left()
        seat := node.Key.(int)
        this.available.Remove(seat)
        return seat
    }
    seat := this.nextSeat
    this.nextSeat++
    return seat
}

func (this *SeatManager) Unreserve(seatNumber int) {
    this.available.Put(seatNumber, true)
}
```

```kotlin
import java.util.TreeSet

class SeatManager(n: Int) {
    private val available = TreeSet<Int>()
    private var nextSeat = 1

    fun reserve(): Int {
        return if (available.isNotEmpty()) {
            available.pollFirst()!!
        } else {
            nextSeat++
        }
    }

    fun unreserve(seatNumber: Int) {
        available.add(seatNumber)
    }
}
```

```swift
class SeatManager {
    private var available: Set<Int>
    private var nextSeat: Int

    init(_ n: Int) {
        available = Set<Int>()
        nextSeat = 1
    }

    func reserve() -> Int {
        if !available.isEmpty {
            let seat = available.min()!
            available.remove(seat)
            return seat
        }
        let seat = nextSeat
        nextSeat += 1
        return seat
    }

    func unreserve(_ seatNumber: Int) {
        available.insert(seatNumber)
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
