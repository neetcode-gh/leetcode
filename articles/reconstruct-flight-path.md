## 1. Depth First Search

::tabs-start

```python
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = {src: [] for src, dst in tickets}
        tickets.sort()
        for src, dst in tickets:
            adj[src].append(dst)

        res = ["JFK"]
        def dfs(src):
            if len(res) == len(tickets) + 1:
                return True
            if src not in adj:
                return False

            temp = list(adj[src])
            for i, v in enumerate(temp):
                adj[src].pop(i)
                res.append(v)
                if dfs(v): return True
                adj[src].insert(i, v)
                res.pop()
            return False
            
        dfs("JFK")
        return res
```

```java
public class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, List<String>> adj = new HashMap<>();
        for (List<String> ticket : tickets) {
            adj.putIfAbsent(ticket.get(0), new ArrayList<>());
        }
        
        tickets.sort((a, b) -> a.get(1).compareTo(b.get(1)));
        for (List<String> ticket : tickets) {
            adj.get(ticket.get(0)).add(ticket.get(1));
        }
        
        List<String> res = new ArrayList<>();
        res.add("JFK");
        
        if (dfs("JFK", res, adj, tickets.size() + 1)) {
            return res;
        }
        return new ArrayList<>();
    }
    
    private boolean dfs(String src, List<String> res, 
                        Map<String, List<String>> adj, int targetLen) {
        if (res.size() == targetLen) {
            return true;
        }
        
        if (!adj.containsKey(src)) {
            return false;
        }
        
        List<String> temp = new ArrayList<>(adj.get(src));
        for (int i = 0; i < temp.size(); i++) {
            String v = temp.get(i);
            adj.get(src).remove(i);
            res.add(v);
            if (dfs(v, res, adj, targetLen)) return true;
            adj.get(src).add(i, v);
            res.remove(res.size() - 1);
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, vector<string>> adj;
        for (auto& ticket : tickets) {
            adj[ticket[0]];
        }

        sort(tickets.begin(), tickets.end());
        for (auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }

        vector<string> res = {"JFK"};
        dfs("JFK", res, adj, tickets.size() + 1);
        return res;
    }

private:
    bool dfs(const string& src, vector<string>& res, 
             unordered_map<string, vector<string>>& adj, int targetLen) {
        if (res.size() == targetLen) {
            return true;
        }

        if (adj.find(src) == adj.end()) {
            return false;
        }

        vector<string> temp = adj[src];
        for (int i = 0; i < temp.size(); ++i) {
            string v = temp[i];
            adj[src].erase(adj[src].begin() + i);
            res.push_back(v);
            if (dfs(v, res, adj, targetLen)) return true;
            adj[src].insert(adj[src].begin() + i, v);
            res.pop_back();
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = {};
        for (const [src, dst] of tickets) {
            if (!adj[src]) adj[src] = [];
        }

        tickets.sort();
        for (const [src, dst] of tickets) {
            adj[src].push(dst);
        }

        const res = ["JFK"];
        const dfs = (src) => {
            if (res.length === tickets.length + 1) return true;
            if (!adj[src]) return false;

            const temp = [...adj[src]];
            for (let i = 0; i < temp.length; i++) {
                const v = temp[i];
                adj[src].splice(i, 1);
                res.push(v);
                if (dfs(v)) return true;
                res.pop();
                adj[src].splice(i, 0, v);
            }
            return false;
        }

        dfs("JFK");
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> FindItinerary(List<List<string>> tickets) {
        var adj = new Dictionary<string, List<string>>();
        foreach (var ticket in tickets) {
            if (!adj.ContainsKey(ticket[0])) {
                adj[ticket[0]] = new List<string>();
            }
        }

        tickets.Sort((a, b) => string.Compare(a[1], b[1]));
        foreach (var ticket in tickets) {
            adj[ticket[0]].Add(ticket[1]);
        }

        var res = new List<string> { "JFK" };
        Dfs("JFK", res, adj, tickets.Count + 1);
        return res;
    }

    private bool Dfs(string src, List<string> res, 
                     Dictionary<string, List<string>> adj, int targetLen) {
        if (res.Count == targetLen) return true;
        if (!adj.ContainsKey(src)) return false;

        var temp = new List<string>(adj[src]);
        for (int i = 0; i < temp.Count; i++) {
            var v = temp[i];
            adj[src].RemoveAt(i);
            res.Add(v);
            if (Dfs(v, res, adj, targetLen)) return true;
            res.RemoveAt(res.Count - 1);
            adj[src].Insert(i, v);
        }
        return false;
    }
}
```

```go
func findItinerary(tickets [][]string) []string {
    adj := make(map[string][]string)
    for _, ticket := range tickets {
        adj[ticket[0]] = append(adj[ticket[0]], ticket[1])
    }
    
    for src := range adj {
        sort.Strings(adj[src])
    }
    
    res := []string{"JFK"}
    
    var dfs func(string) bool
    dfs = func(src string) bool {
        if len(res) == len(tickets) + 1 {
            return true
        }
        
        destinations, exists := adj[src]
        if !exists {
            return false
        }
        
        temp := make([]string, len(destinations))
        copy(temp, destinations)
        
        for i, v := range temp {
            adj[src] = append(adj[src][:i], adj[src][i+1:]...)
            res = append(res, v)
            
            if dfs(v) {
                return true
            }
            
            adj[src] = append(adj[src][:i], append([]string{v}, adj[src][i:]...)...)
            res = res[:len(res)-1]
        }
        return false
    }
    
    dfs("JFK")
    return res
}
```

```kotlin
class Solution {
    fun findItinerary(tickets: List<List<String>>): List<String> {
        val adj = HashMap<String, MutableList<String>>()
        
        tickets.sortedBy { it[1] }.forEach { (src, dst) ->
            adj.getOrPut(src) { mutableListOf() }.add(dst)
        }
        
        val res = mutableListOf("JFK")
        
        fun dfs(src: String): Boolean {
            if (res.size == tickets.size + 1) {
                return true
            }
            
            val destinations = adj[src] ?: return false
            
            for (i in destinations.indices) {
                val v = destinations.removeAt(i)
                res.add(v)
                
                if (dfs(v)) {
                    return true
                }
                
                destinations.add(i, v)
                res.removeAt(res.lastIndex)
            }
            return false
        }
        
        dfs("JFK")
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(E * V)$
* Space complexity: $O(E * V)$

> Where $E$ is the number of tickets (edges) and $V$ is the number of airpots (vertices).

---

## 2. Hierholzer's Algorithm (Recursion)

::tabs-start

```python
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = defaultdict(list)
        for src, dst in sorted(tickets)[::-1]:
            adj[src].append(dst)

        res = []
        def dfs(src):
            while adj[src]:
                dst = adj[src].pop()
                dfs(dst)
            res.append(src)
            
        dfs('JFK')
        return res[::-1]
```

```java
public class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> adj = new HashMap<>();
        for (List<String> ticket : tickets) {
            String src = ticket.get(0);
            String dst = ticket.get(1);
            adj.computeIfAbsent(src, k -> new PriorityQueue<>()).offer(dst);
        }

        List<String> res = new ArrayList<>();
        dfs(adj, "JFK", res);

        Collections.reverse(res);
        return res;
    }

    private void dfs(Map<String, PriorityQueue<String>> adj,
                     String src, List<String> res) {
        PriorityQueue<String> queue = adj.get(src);
        while (queue != null && !queue.isEmpty()) {
            String dst = queue.poll();
            dfs(adj, dst, res);
        }
        res.add(src);
    }
}
```

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, deque<string>> adj;
        for (auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }
        for (auto& [src, dests] : adj) {
            sort(dests.rbegin(), dests.rend());
        }
        
        vector<string> res;
        dfs("JFK", adj, res);
        reverse(res.begin(), res.end());
        return res;
    }

private:
    void dfs(const string& src, unordered_map<string, 
             deque<string>>& adj, vector<string>& res) {
        while (!adj[src].empty()) {
            string dst = adj[src].back();
            adj[src].pop_back();
            dfs(dst, adj, res);
        }
        res.push_back(src);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = new Map();
        const res = [];
        
        tickets.sort().reverse().forEach(([src, dst]) => {
            if (!adj.has(src)) adj.set(src, []);
            adj.get(src).push(dst);
        });
        
        function dfs(src) {
            while (adj.has(src) && adj.get(src).length > 0) {
                const dst = adj.get(src).pop();
                dfs(dst);
            }
            res.push(src);
        }
        
        dfs("JFK");
        return res.reverse();
    }
}
```

```csharp
public class Solution {
    private Dictionary<string, List<string>> adj;
    private List<string> res = new List<string>();
    
    public List<string> FindItinerary(List<List<string>> tickets) {
        adj = new Dictionary<string, List<string>>();
        var sortedTickets = tickets.OrderByDescending(t => t[1]).ToList();
        foreach (var ticket in sortedTickets) {
            if (!adj.ContainsKey(ticket[0])) {
                adj[ticket[0]] = new List<string>();
            }
            adj[ticket[0]].Add(ticket[1]);
        }
        
        Dfs("JFK");
        res.Reverse();
        return res;
    }
    
    private void Dfs(string src) {
        while (adj.ContainsKey(src) && adj[src].Count > 0) {
            var dst = adj[src][adj[src].Count - 1];
            adj[src].RemoveAt(adj[src].Count - 1);
            Dfs(dst);
        }
        res.Add(src);
    }
}
```

```go
func findItinerary(tickets [][]string) []string {
    adj := make(map[string][]string)
    
    sort.Slice(tickets, func(i, j int) bool {
        if tickets[i][0] == tickets[j][0] {
            return tickets[i][1] > tickets[j][1]
        }
        return tickets[i][0] > tickets[j][0]
    })
    
    for _, ticket := range tickets {
        src, dst := ticket[0], ticket[1]
        adj[src] = append(adj[src], dst)
    }
    
    res := make([]string, 0)
    
    var dfs func(string)
    dfs = func(src string) {
        for len(adj[src]) > 0 {
            last := len(adj[src]) - 1
            dst := adj[src][last]
            adj[src] = adj[src][:last]
            dfs(dst)
        }
        res = append(res, src)
    }
    
    dfs("JFK")
    
    for i := 0; i < len(res)/2; i++ {
        res[i], res[len(res)-1-i] = res[len(res)-1-i], res[i]
    }
    
    return res
}
```

```kotlin
class Solution {
    fun findItinerary(tickets: List<List<String>>): List<String> {
        val adj = HashMap<String, MutableList<String>>()
        
        tickets.sortedWith(compareBy({ it[0] }, { it[1] }))
            .reversed()
            .forEach { (src, dst) ->
                adj.getOrPut(src) { mutableListOf() }.add(dst)
            }
        
        val res = mutableListOf<String>()
        
        fun dfs(src: String) {
            while (adj[src]?.isNotEmpty() == true) {
                val dst = adj[src]!!.removeAt(adj[src]!!.lastIndex)
                dfs(dst)
            }
            res.add(src)
        }
        
        dfs("JFK")
        return res.reversed()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(E\log E)$
* Space complexity: $O(E)$

> Where $E$ is the number of tickets (edges) and $V$ is the number of airpots (vertices).

---

## 3. Hierholzer's Algorithm (Iteration)

::tabs-start

```python
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = defaultdict(list)
        for src, dst in sorted(tickets)[::-1]:
            adj[src].append(dst)
            
        stack = ["JFK"]
        res = []
        
        while stack:
            curr = stack[-1]
            if not adj[curr]:
                res.append(stack.pop())
            else:
                stack.append(adj[curr].pop())
                
        return res[::-1]
```

```java
public class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> adj = new HashMap<>();
        for (List<String> ticket : tickets) {
            adj.computeIfAbsent(ticket.get(0), 
            k -> new PriorityQueue<>()).add(ticket.get(1));
        }
        
        LinkedList<String> res = new LinkedList<>();
        Stack<String> stack = new Stack<>();
        stack.push("JFK");
        
        while (!stack.isEmpty()) {
            String curr = stack.peek();
            if (!adj.containsKey(curr) || adj.get(curr).isEmpty()) {
                res.addFirst(stack.pop());
            } else {
                stack.push(adj.get(curr).poll());
            }
        }
        
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, vector<string>> adj;
        for (const auto& ticket : tickets) {
            adj[ticket[0]].push_back(ticket[1]);
        }
        for (auto& [src, destinations] : adj) {
            sort(destinations.rbegin(), destinations.rend());
        }
        
        vector<string> res;
        stack<string> stk;
        stk.push("JFK");
        
        while (!stk.empty()) {
            string curr = stk.top();
            if (adj[curr].empty()) {
                res.push_back(curr);
                stk.pop();
            } else {
                string next = adj[curr].back();
                adj[curr].pop_back();
                stk.push(next);
            }
        }
        
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} tickets
     * @return {string[]}
     */
    findItinerary(tickets) {
        const adj = new Map();
        tickets.sort().reverse().forEach(([src, dst]) => {
            if (!adj.has(src)) adj.set(src, []);
            adj.get(src).push(dst);
        });
        
        const res = [];
        const stack = ["JFK"];
        
        while (stack.length > 0) {
            let curr = stack[stack.length - 1];
            if (!adj.has(curr) || adj.get(curr).length === 0) {
                res.unshift(stack.pop());
            } else {
                stack.push(adj.get(curr).pop());
            }
        }
        
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> FindItinerary(List<List<string>> tickets) {
        var adj = new Dictionary<string, List<string>>();
        foreach (var ticket in tickets.OrderByDescending(t => t[1])) {
            if (!adj.ContainsKey(ticket[0])) {
                adj[ticket[0]] = new List<string>();
            }
            adj[ticket[0]].Add(ticket[1]);
        }
        
        var res = new List<string>();
        var stack = new Stack<string>();
        stack.Push("JFK");
        
        while (stack.Count > 0) {
            var curr = stack.Peek();
            if (!adj.ContainsKey(curr) || adj[curr].Count == 0) {
                res.Insert(0, stack.Pop());
            } else {
                var next = adj[curr][adj[curr].Count - 1];
                adj[curr].RemoveAt(adj[curr].Count - 1);
                stack.Push(next);
            }
        }
        
        return res;
    }
}
```

```go
func findItinerary(tickets [][]string) []string {
	adj := make(map[string][]string)
	for _, ticket := range tickets {
		src, dst := ticket[0], ticket[1]
		adj[src] = append(adj[src], dst)
	}
	for src := range adj {
		sort.Sort(sort.Reverse(sort.StringSlice(adj[src])))
	}

	stack := []string{"JFK"}
	var res []string

	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		if len(adj[curr]) == 0 {
			res = append(res, stack[len(stack)-1])
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, adj[curr][len(adj[curr])-1])
			adj[curr] = adj[curr][:len(adj[curr])-1]
		}
	}

	for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
		res[i], res[j] = res[j], res[i]
	}
	return res
}
```

```kotlin
class Solution {
    fun findItinerary(tickets: List<List<String>>): List<String> {
        val adj = HashMap<String, MutableList<String>>()
        for ((src, dst) in tickets.sortedWith(
            compareByDescending<List<String>> { it[0] }.thenByDescending { it[1] })
        ) {
            adj.computeIfAbsent(src) { mutableListOf() }.add(dst)
        }

        val stack = ArrayDeque<String>().apply { add("JFK") }
        val res = mutableListOf<String>()

        while (stack.isNotEmpty()) {
            val curr = stack.last()
            if (adj[curr].isNullOrEmpty()) {
                res.add(stack.removeLast())
            } else {
                stack.add(adj[curr]!!.removeLast())
            }
        }
        
        return res.asReversed()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(E\log E)$
* Space complexity: $O(E)$

> Where $E$ is the number of tickets (edges) and $V$ is the number of airpots (vertices).