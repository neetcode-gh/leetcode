## 1. Greedy

::tabs-start

```python
class Solution:
    def connectSticks(self, sticks: List[int]) -> int:
        min_heap = sticks
        heapq.heapify(min_heap)
        total_cost = 0

        while len(min_heap) > 1:
            new_stick = heapq.heappop(min_heap) + heapq.heappop(min_heap)
            total_cost += new_stick
            heapq.heappush(min_heap, new_stick)

        return total_cost
```

```java
class Solution {
    public int connectSticks(int[] sticks) {
        int totalCost = 0;
 
        PriorityQueue<Integer> pq = new PriorityQueue<>();
 
        for (int stick : sticks) {
            pq.add(stick);
        }
 
        // combine two of the smallest sticks until we are left with just one.
        while (pq.size() > 1) {
            int stick1 = pq.remove();
            int stick2 = pq.remove();
            
            int cost = stick1 + stick2;
            totalCost += cost;
            
            pq.add(stick1 + stick2);
        }
 
        return totalCost;
    }
}
```

```cpp
class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        int totalCost = 0;
        
        priority_queue<int, vector<int>, greater<int>> pq;
        
        for (int i = 0; i < sticks.size(); i++) {
            pq.push(sticks[i]);
        }
        
        // combine two of the smallest sticks until we are left with just one.
        while (pq.size() > 1) {
            int stick1 = pq.top(); 
            pq.pop();
            int stick2 = pq.top(); 
            pq.pop();
            
            int cost = stick1 + stick2;
            totalCost += cost;
            
            pq.push(stick1+stick2);
        }
        
        return totalCost;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sticks
     * @return {number}
     */
    connectSticks(sticks) {
        let totalCost = 0;
        
        // Using @datastructures-js/priority-queue
        const pq = MinPriorityQueue.fromArray(sticks);
        
        while (pq.size() > 1) {
            const stick1 = pq.dequeue();
            const stick2 = pq.dequeue();
            
            const cost = stick1 + stick2;
            totalCost += cost;
            
            pq.enqueue(cost);
        }
        
        return totalCost;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of the input array.
