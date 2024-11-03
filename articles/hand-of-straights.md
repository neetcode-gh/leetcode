## 1. Sorting

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 2. Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Ordered Map

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
        hand.forEach(num => count.set(num, (count.get(num) || 0) + 1));

        let q = new Queue();
        let lastNum = -1, openGroups = 0;

        Array.from(count.keys()).sort((a, b) => a - b).forEach(num => {
            if ((openGroups > 0 && num > lastNum + 1) || 
                 openGroups > count.get(num)) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 4. Hash Map

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
        hand.forEach(num => count.set(num, (count.get(num) || 0) + 1));
        
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$