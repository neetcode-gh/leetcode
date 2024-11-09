## 1. Sorting

::tabs-start

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        
        while len(stones) > 1:
            stones.sort()
            cur = stones.pop() - stones.pop()
            if cur:
                stones.append(cur)
                
        return stones[0] if stones else 0
```

```java
public class Solution {
    public int lastStoneWeight(int[] stones) {
        List<Integer> stoneList = new ArrayList<>();
        for (int stone : stones) {
            stoneList.add(stone);
        }

        while (stoneList.size() > 1) {
            Collections.sort(stoneList);
            int cur = stoneList.remove(stoneList.size() - 1) -
                      stoneList.remove(stoneList.size() - 1);
            if (cur != 0) {
                stoneList.add(cur);
            }
        }

        return stoneList.isEmpty() ? 0 : stoneList.get(0);
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        while (stones.size() > 1) {
            sort(stones.begin(), stones.end());
            int cur = stones.back() - stones[stones.size() - 2];
            stones.pop_back();
            stones.pop_back();
            if (cur != 0) {
                stones.push_back(cur);
            }
        }
        return stones.empty() ? 0 : stones[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        while (stones.length > 1) {
            stones.sort((a, b) => a - b);
            let cur = stones.pop() - stones.pop();
            if (cur) {
                stones.push(cur);
            }
        }
        return stones.length ? stones[0] : 0;
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeight(int[] stones) {
        List<int> stoneList = new List<int>(stones);
        while (stoneList.Count > 1) {
            stoneList.Sort();
            int cur = stoneList[stoneList.Count - 1] - stoneList[stoneList.Count - 2];
            stoneList.RemoveAt(stoneList.Count - 1); 
            stoneList.RemoveAt(stoneList.Count - 1); 
            if (cur != 0) {
                stoneList.Add(cur); 
            }
        }

        return stoneList.Count == 0 ? 0 : stoneList[0];
    }
}
```

```go
func lastStoneWeight(stones []int) int {
    for len(stones) > 1 {
		sort.Ints(stones)
		cur := stones[len(stones)-1] - stones[len(stones)-2]
		stones = stones[:len(stones)-2]
		if cur > 0 {
			stones = append(stones, cur)
		}
	}
	if len(stones) == 0 {
		return 0
	}
	return stones[0]   
}
```

```kotlin
class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        var stonesList = stones.toMutableList()
        
        while (stonesList.size > 1) {
            stonesList.sort()
            val cur = stonesList.removeAt(stonesList.size - 1) - stonesList.removeAt(stonesList.size - 1)
            if (cur > 0) {
                stonesList.add(cur)
            }
        }
        return if (stonesList.isEmpty()) 0 else stonesList[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        stones.sort()
        n = len(stones)

        while n > 1:
            cur = stones.pop() - stones.pop()
            n -= 2
            if cur > 0:
                l, r = 0, n
                while l < r:
                    mid = (l + r) // 2
                    if stones[mid] < cur:
                        l = mid + 1
                    else:
                        r = mid
                pos = l
                n += 1
                stones.append(0)
                for i in range(n - 1, pos, -1):
                    stones[i] = stones[i - 1]
                stones[pos] = cur

        return stones[0] if n > 0 else 0
```

```java
public class Solution {
    public int lastStoneWeight(int[] stones) {
        Arrays.sort(stones);
        int n = stones.length;

        while (n > 1) {
            int cur = stones[n - 1] - stones[n - 2];
            n -= 2;
            if (cur > 0) {
                int l = 0, r = n;
                while (l < r) {
                    int mid = (l + r) / 2;
                    if (stones[mid] < cur) {
                        l = mid + 1;
                    } else {
                        r = mid;
                    }
                }
                int pos = l;
                n++;
                stones = Arrays.copyOf(stones, n);
                for (int i = n - 1; i > pos; i--) {
                    stones[i] = stones[i - 1];
                }
                stones[pos] = cur;
            }
        }
        return n > 0 ? stones[0] : 0;
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        sort(stones.begin(), stones.end());
        int n = stones.size();

        while (n > 1) {
            int cur = stones[n - 1] - stones[n - 2];
            n -= 2;
            if (cur > 0) {
                int l = 0, r = n;
                while (l < r) {
                    int mid = (l + r) / 2;
                    if (stones[mid] < cur) {
                        l = mid + 1;
                    } else {
                        r = mid;
                    }
                }
                int pos = l;
                stones.push_back(0);
                for (int i = n + 1; i > pos; i--) {
                    stones[i] = stones[i - 1];
                }
                stones[pos] = cur;
                n++;
            }
        }
        return n > 0 ? stones[0] : 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        stones.sort((a, b) => a - b);
        let n = stones.length;

        while (n > 1) {
            let cur = stones.pop() - stones.pop();
            n -= 2;
            if (cur > 0) {
                let l = 0, r = n;
                while (l < r) {
                    let mid = Math.floor((l + r) / 2);
                    if (stones[mid] < cur) {
                        l = mid + 1;
                    } else {
                        r = mid;
                    }
                }
                let pos = l;
                n++;
                stones.push(0);
                for (let i = n - 1; i > pos; i--) {
                    stones[i] = stones[i - 1];
                }
                stones[pos] = cur;
            }
        }
        return n > 0 ? stones[0] : 0;
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeight(int[] stones) {
        Array.Sort(stones);
        int n = stones.Length;

        while (n > 1) {
            int cur = stones[n - 1] - stones[n - 2];
            n -= 2;
            if (cur > 0) {
                int l = 0, r = n;
                while (l < r) {
                    int mid = (l + r) / 2;
                    if (stones[mid] < cur) {
                        l = mid + 1;
                    } else {
                        r = mid;
                    }
                }
                int pos = l;
                Array.Resize(ref stones, n + 1);
                for (int i = n; i > pos; i--) {
                    stones[i] = stones[i - 1];
                }
                stones[pos] = cur;
                n++;
            }
        }
        return n > 0 ? stones[0] : 0;
    }
}
```

```go
func lastStoneWeight(stones []int) int {
    sort.Ints(stones)
    n := len(stones)
    
    for n > 1 {
        cur := stones[n-1] - stones[n-2]
        n -= 2
        
        if cur > 0 {
            pos := sort.Search(n, func(i int) bool {
                return stones[i] >= cur
            })
            
            for i := n; i > pos; i-- {
                stones[i] = stones[i-1]
            }
            stones[pos] = cur
            n++
        }
    }
    
    if n > 0 {
        return stones[0]
    }
    return 0
}
```

```kotlin
class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        stones.sort()
        var n = stones.size
        
        while (n > 1) {
            val cur = stones[n-1] - stones[n-2]
            n -= 2
            
            if (cur > 0) {
                var l = 0
                var r = n
                while (l < r) {
                    val mid = (l + r) / 2
                    if (stones[mid] < cur) {
                        l = mid + 1
                    } else {
                        r = mid
                    }
                }
                
                for (i in n downTo l+1) {
                    stones[i] = stones[i-1]
                }
                stones[l] = cur
                n++
            }
        }
        
        return if (n > 0) stones[0] else 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Heap

::tabs-start

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        stones = [-s for s in stones]
        heapq.heapify(stones)

        while len(stones) > 1:
            first = heapq.heappop(stones)
            second = heapq.heappop(stones)
            if second > first:
                heapq.heappush(stones, first - second)

        stones.append(0)
        return abs(stones[0])
```

```java
class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int s : stones) {
            minHeap.offer(-s);
        }

        while (minHeap.size() > 1) {
            int first = minHeap.poll();
            int second = minHeap.poll();
            if (second > first) {
                minHeap.offer(first - second);
            }
        }

        minHeap.offer(0);
        return Math.abs(minHeap.peek());
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> maxHeap;
        for (int s : stones) {
            maxHeap.push(s);
        }

        while (maxHeap.size() > 1) {
            int first = maxHeap.top();
            maxHeap.pop();
            int second = maxHeap.top();
            maxHeap.pop();
            if (second < first) {
                maxHeap.push(first - second);
            }
        }

        maxHeap.push(0);
        return maxHeap.top();
    }
};
```

```javascript
/**
 * const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        const maxPQ = new MaxPriorityQueue();

        for (const stone of stones) {
            maxPQ.enqueue(stone);
        }

        while (maxPQ.size() > 1) {
            const stone1 = maxPQ.dequeue();
            const stone2 = maxPQ.dequeue();

            if (stone1 !== stone2) {
                maxPQ.enqueue(stone1 - stone2);
            }
        }

        return maxPQ.size() === 1 ? maxPQ.dequeue() : 0;
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeight(int[] stones) {
        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        foreach (int s in stones) {
            minHeap.Enqueue(-s, -s);
        }

        while (minHeap.Count > 1) {
            int first = minHeap.Dequeue();
            int second = minHeap.Dequeue();
            if (second > first) {
                minHeap.Enqueue(first - second, first - second);
            }
        }

        minHeap.Enqueue(0, 0);
        return Math.Abs(minHeap.Peek());
    }
}
```

```go
func lastStoneWeight(stones []int) int {
    pq := priorityqueue.NewWith(func(a, b interface{}) int {
        return a.(int) - b.(int)  
    })
    
    for _, s := range stones {
        pq.Enqueue(-s)
    }
    
    for pq.Size() > 1 {
        first, _ := pq.Dequeue()
        second, _ := pq.Dequeue()
        if second.(int) > first.(int) {
            pq.Enqueue(first.(int) - second.(int))
        }
    }
    
    pq.Enqueue(0)
    result, _ := pq.Dequeue()
    return -result.(int)
}
```

```kotlin
class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        val minHeap = PriorityQueue<Int>()
        for (s in stones) {
            minHeap.offer(-s)
        }
        
        while (minHeap.size > 1) {
            val first = minHeap.poll()
            val second = minHeap.poll()
            if (second > first) {
                minHeap.offer(first - second)
            }
        }
        
        minHeap.offer(0)
        return Math.abs(minHeap.peek())
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 4. Bucket Sort

::tabs-start

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:

        maxStone = max(stones)
        bucket = [0] * (maxStone + 1)
        for stone in stones:
            bucket[stone] += 1
        
        first = second = maxStone
        while first > 0:
            if bucket[first] % 2 == 0:
                first -= 1
                continue
            
            j = min(first - 1, second)
            while j > 0 and bucket[j] == 0:
                j -= 1
            
            if j == 0:
                return first
            second = j
            bucket[first] -= 1
            bucket[second] -= 1
            bucket[first - second] += 1
            first = max(first - second, second)
        return first
```

```java
public class Solution {
    public int lastStoneWeight(int[] stones) {
        int maxStone = 0;
        for (int stone : stones) {
            maxStone = Math.max(maxStone, stone);
        }

        int[] bucket = new int[maxStone + 1];
        for (int stone : stones) {
            bucket[stone]++;
        }
        
        int first = maxStone, second = maxStone;
        while (first > 0) {
            if (bucket[first] % 2 == 0) {
                first--;
                continue;
            }
            
            int j = Math.min(first - 1, second);
            while (j > 0 && bucket[j] == 0) {
                j--;
            }
            
            if (j == 0) {
                return first;
            }
            
            second = j;
            bucket[first]--;
            bucket[second]--;
            bucket[first - second]++;
            first = Math.max(first - second, second);
        }
        
        return first;
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        int maxStone = 0;
        for (int stone : stones) {
            maxStone = max(maxStone, stone);
        }

        vector<int> bucket(maxStone + 1, 0);
        for (int stone : stones) {
            bucket[stone]++;
        }
        
        int first = maxStone, second = maxStone;
        while (first > 0) {
            if (bucket[first] % 2 == 0) {
                first--;
                continue;
            }

            int j = min(first - 1, second);
            while (j > 0 && bucket[j] == 0) {
                j--;
            }

            if (j == 0) {
                return first;
            }

            second = j;
            bucket[first]--;
            bucket[second]--;
            bucket[first - second]++;
            first = max(first - second, second);
        }

        return first;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        let maxStone = 0;
        for (let stone of stones) {
            maxStone = Math.max(maxStone, stone);
        }

        let bucket = Array(maxStone + 1).fill(0);
        for (let stone of stones) {
            bucket[stone]++;
        }

        let first = maxStone, second = maxStone;
        while (first > 0) {
            if (bucket[first] % 2 === 0) {
                first--;
                continue;
            }

            let j = Math.min(first - 1, second);
            while (j > 0 && bucket[j] === 0) {
                j--;
            }

            if (j === 0) {
                return first;
            }

            second = j;
            bucket[first]--;
            bucket[second]--;
            bucket[first - second]++;
            first = Math.max(first - second, second);
        }

        return first;
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeight(int[] stones) {
        int maxStone = 0;
        foreach (int stone in stones) {
            maxStone = Math.Max(maxStone, stone);
        }

        int[] bucket = new int[maxStone + 1];
        foreach (int stone in stones) {
            bucket[stone]++;
        }

        int first = maxStone, second = maxStone;
        while (first > 0) {
            if (bucket[first] % 2 == 0) {
                first--;
                continue;
            }

            int j = Math.Min(first - 1, second);
            while (j > 0 && bucket[j] == 0) {
                j--;
            }

            if (j == 0) {
                return first;
            }

            second = j;
            bucket[first]--;
            bucket[second]--;
            bucket[first - second]++;
            first = Math.Max(first - second, second);
        }

        return first;
    }
}
```

```go
func lastStoneWeight(stones []int) int {
    maxStone := 0
    for _, stone := range stones {
        if stone > maxStone {
            maxStone = stone
        }
    }
    
    bucket := make([]int, maxStone+1)
    for _, stone := range stones {
        bucket[stone]++
    }
    
    first, second := maxStone, maxStone
    for first > 0 {
        if bucket[first]%2 == 0 {
            first--
            continue
        }
        
        j := min(first-1, second)
        for j > 0 && bucket[j] == 0 {
            j--
        }
        
        if j == 0 {
            return first
        }
        second = j
        bucket[first]--
        bucket[second]--
        bucket[first-second]++
        first = max(first-second, second)
    }
    return first
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        val maxStone = stones.max()!!
        val bucket = IntArray(maxStone + 1)
        for (stone in stones) {
            bucket[stone]++
        }
        
        var first = maxStone
        var second = maxStone
        while (first > 0) {
            if (bucket[first] % 2 == 0) {
                first--
                continue
            }
            
            var j = minOf(first - 1, second)
            while (j > 0 && bucket[j] == 0) {
                j--
            }
            
            if (j == 0) {
                return first
            }
            second = j
            bucket[first]--
            bucket[second]--
            bucket[first - second]++
            first = maxOf(first - second, second)
        }
        return first
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + w)$
* Space complexity: $O(w)$

> Where $n$ is the length of the $stones$ array and $w$ is the maximum value in the $stones$ array.