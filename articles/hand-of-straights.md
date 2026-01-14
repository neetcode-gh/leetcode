## 1. Sorting

### Intuition

We are given a hand of cards and a group size. The goal is to check whether we can divide all cards into groups of size `groupSize` such that:
- each group consists of **consecutive numbers**
- every card is used **exactly once**

A simple and intuitive way to approach this is:
- always try to form groups starting from the **smallest available card**
- once we start a group at a number `x`, we must also have `x + 1`, `x + 2`, ..., `x + groupSize - 1`

Sorting the hand helps because it ensures we always process cards in increasing order, which naturally enforces the consecutive requirement.

A frequency map `count` helps us track how many times each card is still available.

### Algorithm

1. If the total number of cards is not divisible by `groupSize`:
   - return `false` immediately (grouping is impossible)
2. Count the frequency of each card value using a map.
3. Sort the hand in increasing order.
4. Iterate through each card value in the sorted hand:
   - If the current card is already used up (its count is `0`), skip it
   - Otherwise, try to form a group starting from this card
5. To form a group starting at `num`:
   - For every value from `num` to `num + groupSize - 1`:
     - If that value does not exist in the count map, return `false`
     - Otherwise, decrement its count by `1`
6. If all cards are successfully grouped without failure:
   - return `true`

::tabs-start

```python
class Solution:
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:
            return False

        count = Counter(hand)
        hand.sort()
        for num in hand:
            if count[num]:
                for i in range(num, num + groupSize):
                    if not count[i]:
                        return False
                    count[i] -= 1
        return True
```

```java
public class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;

        Map<Integer, Integer> count = new HashMap<>();
        for (int num : hand) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        Arrays.sort(hand);
        for (int num : hand) {
            if (count.get(num) > 0) {
                for (int i = num; i < num + groupSize; i++) {
                    if (count.getOrDefault(i, 0) == 0) return false;
                    count.put(i, count.get(i) - 1);
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        unordered_map<int, int> count;
        for (int num : hand) count[num]++;

        sort(hand.begin(), hand.end());
        for (int num : hand) {
            if (count[num] > 0) {
                for (int i = num; i < num + groupSize; i++) {
                    if (count[i] == 0) return false;
                    count[i]--;
                }
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) {
            return false;
        }

        const count = {};
        for (const num of hand) {
            count[num] = (count[num] || 0) + 1;
        }

        hand.sort((a, b) => a - b);
        for (const num of hand) {
            if (count[num] > 0) {
                for (let i = num; i < num + groupSize; i++) {
                    if (!count[i]) return false;
                    count[i] -= 1;
                }
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsNStraightHand(int[] hand, int groupSize) {
        if (hand.Length % groupSize != 0) return false;

        var count = new Dictionary<int, int>();
        foreach (var num in hand) {
            count[num] = count.GetValueOrDefault(num, 0) + 1;
        }

        Array.Sort(hand);
        foreach (var num in hand) {
            if (count[num] > 0) {
                for (int i = num; i < num + groupSize; i++) {
                    if (!count.ContainsKey(i) || count[i] == 0) {
                        return false;
                    }
                    count[i]--;
                }
            }
        }
        return true;
    }
}
```

```go
func isNStraightHand(hand []int, groupSize int) bool {
    if len(hand)%groupSize != 0 {
        return false
    }

    count := map[int]int{}
    for _, num := range hand {
        count[num]++
    }

    sort.Ints(hand)
    for _, num := range hand {
        if count[num] > 0 {
            for i := num; i < num+groupSize; i++ {
                if count[i] == 0 {
                    return false
                }
                count[i]--
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        if (hand.size % groupSize != 0) return false

        val count = HashMap<Int, Int>()
        hand.forEach { count[it] = count.getOrDefault(it, 0) + 1 }
        hand.sort()

        for (num in hand) {
            if (count[num]!! > 0) {
                for (i in num until num + groupSize) {
                    if (count.getOrDefault(i, 0) == 0) {
                        return false
                    }
                    count[i] = count[i]!! - 1
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isNStraightHand(_ hand: [Int], _ groupSize: Int) -> Bool {
        if hand.count % groupSize != 0 {
            return false
        }

        var count = [Int: Int]()
        for num in hand {
            count[num, default: 0] += 1
        }

        let sortedHand = hand.sorted()
        for num in sortedHand {
            if let freq = count[num], freq > 0 {
                for i in num..<(num + groupSize) {
                    if let f = count[i], f > 0 {
                        count[i] = f - 1
                    } else {
                        return false
                    }
                }
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Heap

### Intuition

We need to split the cards into groups of size `groupSize`, where each group is made of **consecutive numbers**, and every card is used exactly once.

A good strategy is to always start building a group from the **smallest card value that is still available**.  
If we can always extend that smallest value into a full consecutive group, then the hand is valid.

To do this efficiently:
- we store frequencies of each card in a map `count`
- we keep a **min-heap** of the available card values so we can always get the current smallest value quickly

When we start a group from `first` (the smallest value in the heap), we must use:
`first`, `first+1`, ..., `first+groupSize-1`

If at any point a required value is missing, grouping is impossible.

The heap also helps ensure we remove values in the correct order when their count reaches zero.

### Algorithm

1. If the total number of cards is not divisible by `groupSize`, return `false`.
2. Build a frequency map `count` where `count[x]` is how many times card `x` appears.
3. Put all distinct card values into a min-heap `minH`.
4. While the heap is not empty:
   - Let `first` be the smallest available value (`minH[0]`)
   - Try to build one group starting at `first`
5. For every value `i` from `first` to `first + groupSize - 1`:
   - If `i` is not in `count`, return `false` (missing a needed card)
   - Decrease `count[i]` by `1` because we use one card of value `i`
   - If `count[i]` becomes `0`:
     - it must be the smallest value currently in the heap
     - otherwise, we are trying to remove numbers out of order, which means grouping breaks
     - pop it from the heap
6. If we process all groups successfully, return `true`

::tabs-start

```python
class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        if len(hand) % groupSize:
            return False

        count = {}
        for n in hand:
            count[n] = 1 + count.get(n, 0)

        minH = list(count.keys())
        heapq.heapify(minH)
        while minH:
            first = minH[0]
            for i in range(first, first + groupSize):
                if i not in count:
                    return False
                count[i] -= 1
                if count[i] == 0:
                    if i != minH[0]:
                        return False
                    heapq.heappop(minH)
        return True
```

```java
public class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0)
            return false;

        Map<Integer, Integer> count = new HashMap<>();
        for (int n : hand)
            count.put(n, 1 + count.getOrDefault(n, 0));

        PriorityQueue<Integer> minH = new PriorityQueue<>(count.keySet());
        while (!minH.isEmpty()) {
            int first = minH.peek();
            for (int i = first; i < first + groupSize; i++) {
                if (!count.containsKey(i))
                    return false;
                count.put(i, count.get(i) - 1);
                if (count.get(i) == 0) {
                    if (i != minH.peek())
                        return false;
                    minH.poll();
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0)
            return false;

        unordered_map<int, int> count;
        for (int n : hand)
            count[n] = 1 + count[n];

        priority_queue<int, vector<int>, greater<int>> minH;
        for (auto& pair : count)
            minH.push(pair.first);

        while (!minH.empty()) {
            int first = minH.top();
            for (int i = first; i < first + groupSize; i++) {
                if (count.find(i) == count.end())
                    return false;
                count[i] -= 1;
                if (count[i] == 0) {
                    if (i != minH.top())
                        return false;
                    minH.pop();
                }
            }
        }
        return true;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) {
            return false;
        }

        const count = {};
        for (const n of hand) {
            count[n] = (count[n] || 0) + 1;
        }

        const minPQ = new MinPriorityQueue();
        for (const key in count) {
            minPQ.push(Number(key));
        }

        while (!minPQ.isEmpty()) {
            const first = minPQ.front();
            for (let i = first; i < first + groupSize; i++) {
                if (!(i in count) || count[i] === 0) {
                    return false;
                }
                count[i] -= 1;
                if (count[i] === 0) {
                    if (i !== minPQ.front()) {
                        return false;
                    }
                    minPQ.pop();
                }
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsNStraightHand(int[] hand, int groupSize) {
        if (hand.Length % groupSize != 0)
            return false;

        var count = new Dictionary<int, int>();
        foreach (int num in hand) {
            if (count.ContainsKey(num))
                count[num]++;
            else
                count[num] = 1;
        }

        var minH = new PriorityQueue<int, int>();
        foreach (var num in count.Keys)
            minH.Enqueue(num, num);

        while (minH.Count > 0) {
            int first = minH.Peek();
            for (int i = first; i < first + groupSize; i++) {
                if (!count.ContainsKey(i) || count[i] == 0)
                    return false;

                count[i]--;
                if (count[i] == 0) {
                    if (i != minH.Peek())
                        return false;
                    minH.Dequeue();
                }
            }
        }
        return true;
    }
}
```

```go
func isNStraightHand(hand []int, groupSize int) bool {
    if len(hand)%groupSize != 0 {
        return false
    }

    count := map[int]int{}
    for _, n := range hand {
        count[n]++
    }

    minH := priorityqueue.NewWith(utils.IntComparator)
    for k := range count {
        minH.Enqueue(k)
    }

    for !minH.Empty() {
        first, _ := minH.Peek()
        firstKey := first.(int)
        for i := firstKey; i < firstKey+groupSize; i++ {
            if count[i] == 0 {
                return false
            }
            count[i]--
            if count[i] == 0 {
                if val, _ := minH.Peek(); val.(int) != i {
                    return false
                }
                minH.Dequeue()
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        if (hand.size % groupSize != 0) return false

        val count = mutableMapOf<Int, Int>()
        for (n in hand) {
            count[n] = count.getOrDefault(n, 0) + 1
        }

        val minH = PriorityQueue(count.keys)
        while (minH.isNotEmpty()) {
            val first = minH.peek()
            for (i in first until first + groupSize) {
                if (count.getOrDefault(i, 0) == 0) return false
                count[i] = count[i]!! - 1
                if (count[i] == 0) {
                    if (i != minH.peek()) return false
                    minH.poll()
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isNStraightHand(_ hand: [Int], _ groupSize: Int) -> Bool {
        if hand.count % groupSize != 0 {
            return false
        }

        var count = [Int: Int]()
        for n in hand {
            count[n, default: 0] += 1
        }

        var minH = Heap<Int>(Array(count.keys))

        while !minH.isEmpty {
            guard let first = minH.min else { return false }

            for i in first..<(first + groupSize) {
                guard let freq = count[i] else { return false }
                count[i] = freq - 1
                if count[i] == 0 {
                    if i != minH.min {
                        return false
                    }
                    minH.removeMin()
                }
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Ordered Map

### Intuition

We want to check if the cards can be divided into groups of size `groupSize`, where **each group consists of consecutive numbers** and **every card is used exactly once**.

Instead of explicitly forming each group, we can think in terms of **how many groups are currently “open”** and waiting to be extended.

As we process card values in increasing order:
- some groups may already be open and **expect the current number next**
- the current number can either:
  - extend existing open groups
  - or start new groups

The key idea is:
- if there are `open_groups` waiting for the current number, we must have **at least that many cards** of the current value
- any extra cards beyond extending existing groups will start **new groups**
- each group must close exactly after `groupSize` consecutive numbers

A queue is used to remember **how many new groups were started at each step**, so we can close them after `groupSize` steps.

### Algorithm

1. If the total number of cards is not divisible by `groupSize`, return `false`.
2. Count the frequency of each card using a map.
3. Iterate over the card values in **sorted order**.
4. Maintain:
   - `open_groups`: number of groups currently waiting to be extended
   - `last_num`: previous card value processed
   - a queue `q` to track how many groups were started at each value
5. For each card value `num`:
   - If there are open groups and `num` is not consecutive to `last_num`, return `false`
   - If `open_groups > count[num]`, return `false` (not enough cards to extend groups)
6. Calculate how many **new groups** start at `num`:
   - `new_groups = count[num] - open_groups`
   - Push `new_groups` into the queue
7. Update:
   - `last_num = num`
   - `open_groups = count[num]`
8. If the queue size reaches `groupSize`:
   - pop from the queue and subtract that value from `open_groups`
   - this closes groups that have reached length `groupSize`
9. After processing all numbers:
   - return `true` only if `open_groups == 0`

::tabs-start

```python
class Solution:
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand)
        q = deque()
        last_num, open_groups = -1, 0

        for num in sorted(count):
            if ((open_groups > 0 and num > last_num + 1) or
                open_groups > count[num]
            ):
                return False

            q.append(count[num] - open_groups)
            last_num = num
            open_groups = count[num]

            if len(q) == groupSize:
                open_groups -= q.popleft()

        return open_groups == 0
```

```java
public class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;

        Map<Integer, Integer> count = new TreeMap<>();
        for (int num : hand) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        Queue<Integer> q = new LinkedList<>();
        int lastNum = -1, openGroups = 0;

        for (int num : count.keySet()) {
            if ((openGroups > 0 && num > lastNum + 1) ||
                 openGroups > count.get(num)) {
                return false;
            }

            q.add(count.get(num) - openGroups);
            lastNum = num;
            openGroups = count.get(num);

            if (q.size() == groupSize) {
                openGroups -= q.poll();
            }
        }
        return openGroups == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        map<int, int> count;
        for (int num : hand) count[num]++;

        queue<int> q;
        int lastNum = -1, openGroups = 0;

        for (auto& entry : count) {
            int num = entry.first;
            if ((openGroups > 0 && num > lastNum + 1) ||
                 openGroups > count[num]) {
                return false;
            }

            q.push(count[num] - openGroups);
            lastNum = num;
            openGroups = count[num];

            if (q.size() == groupSize) {
                openGroups -= q.front();
                q.pop();
            }
        }
        return openGroups == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false;

        let count = new Map();
        hand.forEach((num) => count.set(num, (count.get(num) || 0) + 1));

        let q = new Queue();
        let lastNum = -1,
            openGroups = 0;

        Array.from(count.keys())
            .sort((a, b) => a - b)
            .forEach((num) => {
                if (
                    (openGroups > 0 && num > lastNum + 1) ||
                    openGroups > count.get(num)
                ) {
                    return false;
                }

                q.push(count.get(num) - openGroups);
                lastNum = num;
                openGroups = count.get(num);

                if (q.size() === groupSize) {
                    openGroups -= q.pop();
                }
            });

        return openGroups === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsNStraightHand(int[] hand, int groupSize) {
        if (hand.Length % groupSize != 0) return false;

        var count = new SortedDictionary<int, int>();
        foreach (int num in hand) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        var q = new Queue<int>();
        int lastNum = -1, openGroups = 0;

        foreach (int num in count.Keys) {
            if ((openGroups > 0 && num > lastNum + 1) ||
                 openGroups > count[num]) {
                return false;
            }

            q.Enqueue(count[num] - openGroups);
            lastNum = num;
            openGroups = count[num];

            if (q.Count == groupSize) {
                openGroups -= q.Dequeue();
            }
        }
        return openGroups == 0;
    }
}
```

```go
func isNStraightHand(hand []int, groupSize int) bool {
    if len(hand)%groupSize != 0 {
        return false
    }

    count := make(map[int]int)
    for _, num := range hand {
        count[num]++
    }

    keys := make([]int, 0, len(count))
    for k := range count {
        keys = append(keys, k)
    }
    sort.Ints(keys)

    q := []int{}
    lastNum, openGroups := -1, 0

    for _, num := range keys {
        if (openGroups > 0 && num > lastNum+1) ||
            openGroups > count[num] {
            return false
        }

        q = append(q, count[num]-openGroups)
        lastNum = num
        openGroups = count[num]

        if len(q) == groupSize {
            openGroups -= q[0]
            q = q[1:]
        }
    }
    return openGroups == 0
}
```

```kotlin
class Solution {
    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        if (hand.size % groupSize != 0) return false

        val count = TreeMap<Int, Int>()
        for (num in hand) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val q: Queue<Int> = LinkedList()
        var lastNum = -1
        var openGroups = 0

        for (num in count.keys) {
            if ((openGroups > 0 && num > lastNum + 1) ||
                 openGroups > count[num]!!) {
                return false
            }

            q.add(count[num]!! - openGroups)
            lastNum = num
            openGroups = count[num]!!

            if (q.size == groupSize) {
                openGroups -= q.poll()
            }
        }
        return openGroups == 0
    }
}
```

```swift
class Solution {
    func isNStraightHand(_ hand: [Int], _ groupSize: Int) -> Bool {
        if hand.count % groupSize != 0 {
            return false
        }

        var count = [Int: Int]()
        for num in hand {
            count[num, default: 0] += 1
        }

        var queue = Deque<Int>()
        var lastNum = -1
        var openGroups = 0

        for (num, numCount) in count.sorted(by: { $0.key < $1.key }) {
            if (openGroups > 0 && num > lastNum + 1) || openGroups > numCount {
                return false
            }

            queue.append(numCount - openGroups)
            lastNum = num
            openGroups = numCount

            if queue.count == groupSize {
                openGroups -= queue.removeFirst()
            }
        }
        return openGroups == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Hash Map

### Intuition

We need to split the hand into groups of size `groupSize`, where each group is made of **consecutive numbers** and every card is used exactly once.

This approach uses only a frequency map and a simple rule:
- Any valid group must start at the **beginning of a consecutive run**
- So for a given number `num`, we first walk left to find the earliest possible start of its run
  (we keep moving left while `start - 1` still exists in the hand)
- Once we know a possible start, we try to repeatedly form consecutive groups starting from that start:
  - while there are still cards at `start`, we build a group:
    `start`, `start+1`, ..., `start+groupSize-1`
  - decrement counts as we use cards

By always forming groups from the earliest start in a run, we avoid skipping needed smaller cards and ensure groups remain consecutive.

### Algorithm

1. If `len(hand)` is not divisible by `groupSize`, return `false`.
2. Build a frequency map `count` for all card values.
3. For each card value `num` in the hand:
   - Find the earliest start of the consecutive run containing `num`:
     - set `start = num`
     - while `count[start - 1] > 0`, decrement `start`
4. For every possible `start` up to `num`:
   - While `count[start] > 0`:
     - Try to create one full group starting at `start`
     - For each `i` from `start` to `start + groupSize - 1`:
       - If `count[i] == 0`, return `false` (missing a needed card)
       - Otherwise decrement `count[i]`
   - Move `start` forward by `1` and continue
5. If all groups are formed successfully, return `true`.

::tabs-start

```python
class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand)
        for num in hand:
            start = num
            while count[start - 1]:
                start -= 1
            while start <= num:
                while count[start]:
                    for i in range(start, start + groupSize):
                        if not count[i]:
                            return False
                        count[i] -= 1
                start += 1
        return True
```

```java
public class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;

        Map<Integer, Integer> count = new HashMap<>();
        for (int num : hand) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        for (int num : hand) {
            int start = num;
            while (count.getOrDefault(start - 1, 0) > 0) start--;
            while (start <= num) {
                while (count.getOrDefault(start, 0) > 0) {
                    for (int i = start; i < start + groupSize; i++) {
                        if (count.getOrDefault(i, 0) == 0) return false;
                        count.put(i, count.get(i) - 1);
                    }
                }
                start++;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        unordered_map<int, int> count;
        for (int num : hand) count[num]++;

        for (int num : hand) {
            int start = num;
            while (count[start - 1] > 0) start--;
            while (start <= num) {
                while (count[start] > 0) {
                    for (int i = start; i < start + groupSize; i++) {
                        if (count[i] == 0) return false;
                        count[i]--;
                    }
                }
                start++;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false;

        const count = new Map();
        hand.forEach((num) => count.set(num, (count.get(num) || 0) + 1));

        for (const num of hand) {
            let start = num;
            while (count.get(start - 1) > 0) start--;
            while (start <= num) {
                while (count.get(start) > 0) {
                    for (let i = start; i < start + groupSize; i++) {
                        if (!count.get(i)) return false;
                        count.set(i, count.get(i) - 1);
                    }
                }
                start++;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsNStraightHand(int[] hand, int groupSize) {
        if (hand.Length % groupSize != 0) return false;

        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in hand) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        foreach (int num in hand) {
            int start = num;
            while (count.ContainsKey(start - 1) && count[start - 1] > 0) {
                start--;
            }
            while (start <= num) {
                while (count.ContainsKey(start) && count[start] > 0) {
                    for (int i = start; i < start + groupSize; i++) {
                        if (!count.ContainsKey(i) || count[i] == 0) {
                            return false;
                        }
                        count[i]--;
                    }
                }
                start++;
            }
        }
        return true;
    }
}
```

```go
func isNStraightHand(hand []int, groupSize int) bool {
    if len(hand)%groupSize != 0 {
        return false
    }

    count := map[int]int{}
    for _, num := range hand {
        count[num]++
    }

    for _, num := range hand {
        start := num
        for count[start-1] > 0 {
            start--
        }

        for start <= num {
            for count[start] > 0 {
                for i := start; i < start+groupSize; i++ {
                    if count[i] == 0 {
                        return false
                    }
                    count[i]--
                }
            }
            start++
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        if (hand.size % groupSize != 0) return false

        val count = HashMap<Int, Int>()
        hand.forEach { count[it] = count.getOrDefault(it, 0) + 1 }

        for (num in hand) {
            var start = num
            while (count.getOrDefault(start - 1, 0) > 0) {
                start--
            }

            while (start <= num) {
                while (count.getOrDefault(start, 0) > 0) {
                    for (i in start until start + groupSize) {
                        if (count.getOrDefault(i, 0) == 0) {
                            return false
                        }
                        count[i] = count[i]!! - 1
                    }
                }
                start++
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isNStraightHand(_ hand: [Int], _ groupSize: Int) -> Bool {
        if hand.count % groupSize != 0 {
            return false
        }

        var count = [Int: Int]()
        for num in hand {
            count[num, default: 0] += 1
        }

        for num in hand {
            var start = num
            while (count[start - 1] ?? 0) > 0 {
                start -= 1
            }
            while start <= num {
                while (count[start] ?? 0) > 0 {
                    for i in start..<(start + groupSize) {
                        if (count[i] ?? 0) == 0 {
                            return false
                        }
                        count[i]! -= 1
                    }
                }
                start += 1
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Forgetting to Check Divisibility First

If the total number of cards is not divisible by `groupSize`, it is impossible to form complete groups. Skipping this initial check wastes time processing the array and may lead to subtle bugs where the algorithm appears to succeed but produces an invalid grouping.

### Not Starting Groups from the Smallest Available Card

Groups must be formed starting from the smallest available card value to ensure consecutive sequences work correctly. Starting from an arbitrary card can leave smaller cards stranded without enough consecutive neighbors to form a valid group. Always process cards in sorted order or use a min-heap to find the smallest available value.

### Failing to Decrement Counts Properly

When forming a group, each card in the consecutive sequence must have its count decremented. A common bug is forgetting to decrement or decrementing the wrong key, which causes cards to be reused or leaves cards unused. Additionally, when a card's count reaches zero, it must be handled correctly to avoid checking for cards that no longer exist.
