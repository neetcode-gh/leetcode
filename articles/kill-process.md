## 1. Depth First Search 

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.

---

## 2. Tree Simulation 

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `pid` and `ppid`.
