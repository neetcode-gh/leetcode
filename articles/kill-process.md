## 1. Depth First Search

::tabs-start

```python
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        if kill == 0:
            return []

        result = [kill]
        for i in range(len(ppid)):
            if ppid[i] == kill:
                result.extend(self.killProcess(pid, ppid, pid[i]))

        return result
```

```java
class Solution {
    public List < Integer > killProcess(List < Integer > pid, List < Integer > ppid, int kill) {
        List < Integer > l = new ArrayList < > ();

        if (kill == 0)
            return l;

        l.add(kill);

        for (int i = 0; i < ppid.size(); i++)
            if (ppid.get(i) == kill)
                l.addAll(killProcess(pid, ppid, pid.get(i)));

        return l;
    }
}
```

```cpp
class Solution {
public:
    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {
        vector<int> result;
        if (kill == 0) return result;

        result.push_back(kill);
        for (int i = 0; i < ppid.size(); i++) {
            if (ppid[i] == kill) {
                vector<int> children = killProcess(pid, ppid, pid[i]);
                result.insert(result.end(), children.begin(), children.end());
            }
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pid
     * @param {number[]} ppid
     * @param {number} kill
     * @return {number[]}
     */
    killProcess(pid, ppid, kill) {
        if (kill === 0) return [];

        const result = [kill];
        for (let i = 0; i < ppid.length; i++) {
            if (ppid[i] === kill) {
                result.push(...this.killProcess(pid, ppid, pid[i]));
            }
        }

        return result;
    }
}
```

```csharp
public class Solution {
    public IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill) {
        var result = new List<int>();
        if (kill == 0) return result;

        result.Add(kill);
        for (int i = 0; i < ppid.Count; i++) {
            if (ppid[i] == kill) {
                result.AddRange(KillProcess(pid, ppid, pid[i]));
            }
        }

        return result;
    }
}
```

```go
func killProcess(pid []int, ppid []int, kill int) []int {
    if kill == 0 {
        return []int{}
    }

    result := []int{kill}
    for i := 0; i < len(ppid); i++ {
        if ppid[i] == kill {
            result = append(result, killProcess(pid, ppid, pid[i])...)
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun killProcess(pid: List<Int>, ppid: List<Int>, kill: Int): List<Int> {
        if (kill == 0) return emptyList()

        val result = mutableListOf(kill)
        for (i in ppid.indices) {
            if (ppid[i] == kill) {
                result.addAll(killProcess(pid, ppid, pid[i]))
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func killProcess(_ pid: [Int], _ ppid: [Int], _ kill: Int) -> [Int] {
        if kill == 0 { return [] }

        var result = [kill]
        for i in 0..<ppid.count {
            if ppid[i] == kill {
                result.append(contentsOf: killProcess(pid, ppid, pid[i]))
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.

---

## 2. Tree Simulation

::tabs-start

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.children = []

class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        mp = {}
        for id in pid:
            mp[id] = Node(id)

        for i in range(len(ppid)):
            if ppid[i] > 0:
                mp[ppid[i]].children.append(mp[pid[i]])

        result = [kill]
        self.getAllChildren(mp[kill], result)
        return result

    def getAllChildren(self, node, result):
        for child in node.children:
            result.append(child.val)
            self.getAllChildren(child, result)
```

```java
class Solution {

    class Node {
        int val;
        List < Node > children = new ArrayList < > ();
    }

    public List < Integer > killProcess(List < Integer > pid, List < Integer > ppid, int kill) {
        HashMap < Integer, Node > map = new HashMap < > ();
        for (int id: pid) {
            Node node = new Node();
            node.val = id;
            map.put(id, node);
        }
        for (int i = 0; i < ppid.size(); i++) {
            if (ppid.get(i) > 0) {
                Node par = map.get(ppid.get(i));
                par.children.add(map.get(pid.get(i)));
            }
        }
        List < Integer > l = new ArrayList < > ();
        l.add(kill);
        getAllChildren(map.get(kill), l);
        return l;
    }

    public void getAllChildren(Node pn, List < Integer > l) {
        for (Node n: pn.children) {
            l.add(n.val);
            getAllChildren(n, l);
        }
    }
}
```

```cpp
class Solution {
    struct Node {
        int val;
        vector<Node*> children;
        Node(int v) : val(v) {}
    };

public:
    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {
        unordered_map<int, Node*> mp;
        for (int id : pid) {
            mp[id] = new Node(id);
        }

        for (int i = 0; i < ppid.size(); i++) {
            if (ppid[i] > 0) {
                mp[ppid[i]]->children.push_back(mp[pid[i]]);
            }
        }

        vector<int> result;
        result.push_back(kill);
        getAllChildren(mp[kill], result);
        return result;
    }

private:
    void getAllChildren(Node* node, vector<int>& result) {
        for (Node* child : node->children) {
            result.push_back(child->val);
            getAllChildren(child, result);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pid
     * @param {number[]} ppid
     * @param {number} kill
     * @return {number[]}
     */
    killProcess(pid, ppid, kill) {
        const mp = new Map();
        for (const id of pid) {
            mp.set(id, { val: id, children: [] });
        }

        for (let i = 0; i < ppid.length; i++) {
            if (ppid[i] > 0) {
                mp.get(ppid[i]).children.push(mp.get(pid[i]));
            }
        }

        const result = [kill];
        this.getAllChildren(mp.get(kill), result);
        return result;
    }

    getAllChildren(node, result) {
        for (const child of node.children) {
            result.push(child.val);
            this.getAllChildren(child, result);
        }
    }
}
```

```csharp
public class Solution {
    class Node {
        public int val;
        public List<Node> children = new List<Node>();
        public Node(int v) { val = v; }
    }

    public IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill) {
        var mp = new Dictionary<int, Node>();
        foreach (int id in pid) {
            mp[id] = new Node(id);
        }

        for (int i = 0; i < ppid.Count; i++) {
            if (ppid[i] > 0) {
                mp[ppid[i]].children.Add(mp[pid[i]]);
            }
        }

        var result = new List<int> { kill };
        GetAllChildren(mp[kill], result);
        return result;
    }

    private void GetAllChildren(Node node, List<int> result) {
        foreach (var child in node.children) {
            result.Add(child.val);
            GetAllChildren(child, result);
        }
    }
}
```

```go
type Node struct {
    val      int
    children []*Node
}

func killProcess(pid []int, ppid []int, kill int) []int {
    mp := make(map[int]*Node)
    for _, id := range pid {
        mp[id] = &Node{val: id, children: []*Node{}}
    }

    for i := 0; i < len(ppid); i++ {
        if ppid[i] > 0 {
            mp[ppid[i]].children = append(mp[ppid[i]].children, mp[pid[i]])
        }
    }

    result := []int{kill}
    getAllChildren(mp[kill], &result)
    return result
}

func getAllChildren(node *Node, result *[]int) {
    for _, child := range node.children {
        *result = append(*result, child.val)
        getAllChildren(child, result)
    }
}
```

```kotlin
class Solution {
    class Node(val value: Int) {
        val children = mutableListOf<Node>()
    }

    fun killProcess(pid: List<Int>, ppid: List<Int>, kill: Int): List<Int> {
        val mp = mutableMapOf<Int, Node>()
        for (id in pid) {
            mp[id] = Node(id)
        }

        for (i in ppid.indices) {
            if (ppid[i] > 0) {
                mp[ppid[i]]!!.children.add(mp[pid[i]]!!)
            }
        }

        val result = mutableListOf(kill)
        getAllChildren(mp[kill]!!, result)
        return result
    }

    private fun getAllChildren(node: Node, result: MutableList<Int>) {
        for (child in node.children) {
            result.add(child.value)
            getAllChildren(child, result)
        }
    }
}
```

```swift
class Solution {
    class Node {
        var val: Int
        var children: [Node] = []
        init(_ val: Int) { self.val = val }
    }

    func killProcess(_ pid: [Int], _ ppid: [Int], _ kill: Int) -> [Int] {
        var mp = [Int: Node]()
        for id in pid {
            mp[id] = Node(id)
        }

        for i in 0..<ppid.count {
            if ppid[i] > 0 {
                mp[ppid[i]]!.children.append(mp[pid[i]]!)
            }
        }

        var result = [kill]
        getAllChildren(mp[kill]!, &result)
        return result
    }

    private func getAllChildren(_ node: Node, _ result: inout [Int]) {
        for child in node.children {
            result.append(child.val)
            getAllChildren(child, &result)
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.

---

## 3. HashMap + Depth First Search 

::tabs-start

```python
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        map_dict = {}
        for i in range(len(ppid)):
            if ppid[i] > 0:
                if ppid[i] not in map_dict:
                    map_dict[ppid[i]] = []
                map_dict[ppid[i]].append(pid[i])
        
        result = [kill]
        self.getAllChildren(map_dict, result, kill)
        return result
    
    def getAllChildren(self, map_dict, result, kill):
        if kill in map_dict:
            for child_id in map_dict[kill]:
                result.append(child_id)
                self.getAllChildren(map_dict, result, child_id)
```

```java
class Solution {
    public List <Integer> killProcess(List <Integer> pid, List <Integer> ppid, int kill) {
        HashMap <Integer, List <Integer>> map = new HashMap <> ();

        for (int i = 0; i < ppid.size(); i++) {
            if (ppid.get(i) > 0) {
                List <Integer> l = map.getOrDefault(ppid.get(i), new ArrayList <Integer> ());
                l.add(pid.get(i));
                map.put(ppid.get(i), l);
            }
        }

        List <Integer> l = new ArrayList<> ();
        l.add(kill);
        getAllChildren(map, l, kill);
        return l;
    }

    public void getAllChildren(HashMap <Integer, List <Integer>> map, List <Integer> l, int kill) {
        if (map.containsKey(kill))
            for (int id: map.get(kill)) {
                l.add(id);
                getAllChildren(map, l, id);
            }
    }
}
```

```cpp
class Solution {
public:
    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {
        unordered_map<int, vector<int>> map;
        for (int i = 0; i < ppid.size(); i++) {
            if (ppid[i] > 0) {
                map[ppid[i]].push_back(pid[i]);
            }
        }
        
        vector<int> result;
        result.push_back(kill);
        getAllChildren(map, result, kill);
        return result;
    }
    
private:
    void getAllChildren(unordered_map<int, vector<int>>& map, vector<int>& result, int kill) {
        if (map.find(kill) != map.end()) {
            for (int child_id : map[kill]) {
                result.push_back(child_id);
                getAllChildren(map, result, child_id);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pid
     * @param {number[]} ppid
     * @param {number} kill
     * @return {number[]}
     */
    killProcess(pid, ppid, kill) {
        const map = new Map();
        for (let i = 0; i < ppid.length; i++) {
            if (ppid[i] > 0) {
                if (!map.has(ppid[i])) {
                    map.set(ppid[i], []);
                }
                map.get(ppid[i]).push(pid[i]);
            }
        }
        
        const result = [kill];
        this.getAllChildren(map, result, kill);
        return result;
    }
    
    /**
     * @param {Map<number, number[]>} map
     * @param {number[]} result
     * @param {number} kill
     * @return {void}
     */
    getAllChildren(map, result, kill) {
        if (map.has(kill)) {
            for (const childId of map.get(kill)) {
                result.push(childId);
                this.getAllChildren(map, result, childId);
            }
        }
    }
}
```

```csharp
public class Solution {
    public IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill) {
        var map = new Dictionary<int, List<int>>();
        for (int i = 0; i < ppid.Count; i++) {
            if (ppid[i] > 0) {
                if (!map.ContainsKey(ppid[i])) {
                    map[ppid[i]] = new List<int>();
                }
                map[ppid[i]].Add(pid[i]);
            }
        }

        var result = new List<int> { kill };
        GetAllChildren(map, result, kill);
        return result;
    }

    private void GetAllChildren(Dictionary<int, List<int>> map, List<int> result, int kill) {
        if (map.ContainsKey(kill)) {
            foreach (int childId in map[kill]) {
                result.Add(childId);
                GetAllChildren(map, result, childId);
            }
        }
    }
}
```

```go
func killProcess(pid []int, ppid []int, kill int) []int {
    mp := make(map[int][]int)
    for i := 0; i < len(ppid); i++ {
        if ppid[i] > 0 {
            mp[ppid[i]] = append(mp[ppid[i]], pid[i])
        }
    }

    result := []int{kill}
    var getAllChildren func(kill int)
    getAllChildren = func(kill int) {
        if children, ok := mp[kill]; ok {
            for _, childId := range children {
                result = append(result, childId)
                getAllChildren(childId)
            }
        }
    }

    getAllChildren(kill)
    return result
}
```

```kotlin
class Solution {
    fun killProcess(pid: List<Int>, ppid: List<Int>, kill: Int): List<Int> {
        val map = mutableMapOf<Int, MutableList<Int>>()
        for (i in ppid.indices) {
            if (ppid[i] > 0) {
                map.getOrPut(ppid[i]) { mutableListOf() }.add(pid[i])
            }
        }

        val result = mutableListOf(kill)
        getAllChildren(map, result, kill)
        return result
    }

    private fun getAllChildren(map: Map<Int, List<Int>>, result: MutableList<Int>, kill: Int) {
        map[kill]?.forEach { childId ->
            result.add(childId)
            getAllChildren(map, result, childId)
        }
    }
}
```

```swift
class Solution {
    func killProcess(_ pid: [Int], _ ppid: [Int], _ kill: Int) -> [Int] {
        var map = [Int: [Int]]()
        for i in 0..<ppid.count {
            if ppid[i] > 0 {
                map[ppid[i], default: []].append(pid[i])
            }
        }

        var result = [kill]
        getAllChildren(map, &result, kill)
        return result
    }

    private func getAllChildren(_ map: [Int: [Int]], _ result: inout [Int], _ kill: Int) {
        if let children = map[kill] {
            for childId in children {
                result.append(childId)
                getAllChildren(map, &result, childId)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.

---

## 4. HashMap + Breadth First Search

::tabs-start

```python
class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        map_dict = {}
        for i in range(len(ppid)):
            if ppid[i] > 0:
                if ppid[i] not in map_dict:
                    map_dict[ppid[i]] = []
                map_dict[ppid[i]].append(pid[i])
        
        queue = deque([kill])
        result = []
        while queue:
            r = queue.popleft()
            result.append(r)
            if r in map_dict:
                for child_id in map_dict[r]:
                    queue.append(child_id)
        
        return result
```

```java
class Solution {

    public List < Integer > killProcess(List < Integer > pid, List < Integer > ppid, int kill) {
        HashMap < Integer, List < Integer >> map = new HashMap < > ();

        for (int i = 0; i < ppid.size(); i++) {
            if (ppid.get(i) > 0) {
                List < Integer > l = map.getOrDefault(ppid.get(i), new ArrayList < Integer > ());
                l.add(pid.get(i));
                map.put(ppid.get(i), l);
            }
        }

        Queue < Integer > queue = new LinkedList < > ();
        List < Integer > l = new ArrayList < > ();
        queue.add(kill);
        while (!queue.isEmpty()) {
            int r = queue.remove();
            l.add(r);
            if (map.containsKey(r))
                for (int id: map.get(r))
                    queue.add(id);
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {
        unordered_map<int, vector<int>> map;
        for (int i = 0; i < ppid.size(); i++) {
            if (ppid[i] > 0) {
                map[ppid[i]].push_back(pid[i]);
            }
        }
        
        queue<int> q;
        vector<int> result;
        q.push(kill);
        while (!q.empty()) {
            int r = q.front();
            q.pop();
            result.push_back(r);
            if (map.find(r) != map.end()) {
                for (int child_id : map[r]) {
                    q.push(child_id);
                }
            }
        }
        
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pid
     * @param {number[]} ppid
     * @param {number} kill
     * @return {number[]}
     */
    killProcess(pid, ppid, kill) {
        const map = new Map();
        for (let i = 0; i < ppid.length; i++) {
            if (ppid[i] > 0) {
                if (!map.has(ppid[i])) {
                    map.set(ppid[i], []);
                }
                map.get(ppid[i]).push(pid[i]);
            }
        }

        const queue = [kill];
        const result = [];
        while (queue.length > 0) {
            const r = queue.shift();
            result.push(r);
            if (map.has(r)) {
                for (const childId of map.get(r)) {
                    queue.push(childId);
                }
            }
        }

        return result;
    }
}
```

```csharp
public class Solution {
    public IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill) {
        var map = new Dictionary<int, List<int>>();
        for (int i = 0; i < ppid.Count; i++) {
            if (ppid[i] > 0) {
                if (!map.ContainsKey(ppid[i])) {
                    map[ppid[i]] = new List<int>();
                }
                map[ppid[i]].Add(pid[i]);
            }
        }

        var queue = new Queue<int>();
        var result = new List<int>();
        queue.Enqueue(kill);
        while (queue.Count > 0) {
            int r = queue.Dequeue();
            result.Add(r);
            if (map.ContainsKey(r)) {
                foreach (int childId in map[r]) {
                    queue.Enqueue(childId);
                }
            }
        }

        return result;
    }
}
```

```go
func killProcess(pid []int, ppid []int, kill int) []int {
    mp := make(map[int][]int)
    for i := 0; i < len(ppid); i++ {
        if ppid[i] > 0 {
            mp[ppid[i]] = append(mp[ppid[i]], pid[i])
        }
    }

    queue := []int{kill}
    result := []int{}
    for len(queue) > 0 {
        r := queue[0]
        queue = queue[1:]
        result = append(result, r)
        if children, ok := mp[r]; ok {
            queue = append(queue, children...)
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun killProcess(pid: List<Int>, ppid: List<Int>, kill: Int): List<Int> {
        val map = mutableMapOf<Int, MutableList<Int>>()
        for (i in ppid.indices) {
            if (ppid[i] > 0) {
                map.getOrPut(ppid[i]) { mutableListOf() }.add(pid[i])
            }
        }

        val queue = java.util.LinkedList<Int>()
        val result = mutableListOf<Int>()
        queue.add(kill)
        while (queue.isNotEmpty()) {
            val r = queue.poll()
            result.add(r)
            map[r]?.forEach { childId ->
                queue.add(childId)
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func killProcess(_ pid: [Int], _ ppid: [Int], _ kill: Int) -> [Int] {
        var map = [Int: [Int]]()
        for i in 0..<ppid.count {
            if ppid[i] > 0 {
                map[ppid[i], default: []].append(pid[i])
            }
        }

        var queue = [kill]
        var result = [Int]()
        while !queue.isEmpty {
            let r = queue.removeFirst()
            result.append(r)
            if let children = map[r] {
                queue.append(contentsOf: children)
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.
