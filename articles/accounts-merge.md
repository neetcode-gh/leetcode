## 1. Depth First Search

::tabs-start

```python
class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        n = len(accounts)
        emailIdx = {} # email -> id
        emails = [] # set of emails of all accounts
        emailToAcc = {} # email_index -> account_Id

        m = 0
        for accId, a in enumerate(accounts):
            for i in range(1, len(a)):
                email = a[i]
                if email in emailIdx:
                    continue
                emails.append(email)
                emailIdx[email] = m
                emailToAcc[m] = accId
                m += 1

        adj = [[] for _ in range(m)]
        for a in accounts:
            for i in range(2, len(a)):
                id1 = emailIdx[a[i]]
                id2 = emailIdx[a[i - 1]]
                adj[id1].append(id2)
                adj[id2].append(id1)

        emailGroup = defaultdict(list) # index of acc -> list of emails
        visited = [False] * m
        def dfs(node, accId):
            visited[node] = True
            emailGroup[accId].append(emails[node])
            for nei in adj[node]:
                if not visited[nei]:
                    dfs(nei, accId)

        for i in range(m):
            if not visited[i]:
                dfs(i, emailToAcc[i])

        res = []
        for accId in emailGroup:
            name = accounts[accId][0]
            res.append([name] + sorted(emailGroup[accId]))

        return res
```

```java
public class Solution {
    private Map<String, Integer> emailIdx = new HashMap<>(); // email -> id
    private List<String> emails = new ArrayList<>(); // set of emails of all accounts
    private Map<Integer, Integer> emailToAcc = new HashMap<>(); // email_index -> account_Id
    private List<List<Integer>> adj;
    private Map<Integer, List<String>> emailGroup = new HashMap<>(); // index of acc -> list of emails
    private boolean[] visited;

    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        int m = 0;

        // Build email index and mappings
        for (int accId = 0; accId < n; accId++) {
            List<String> account = accounts.get(accId);
            for (int i = 1; i < account.size(); i++) {
                String email = account.get(i);
                if (!emailIdx.containsKey(email)) {
                    emails.add(email);
                    emailIdx.put(email, m);
                    emailToAcc.put(m, accId);
                    m++;
                }
            }
        }

        // Build adjacency list
        adj = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            adj.add(new ArrayList<>());
        }
        for (List<String> account : accounts) {
            for (int i = 2; i < account.size(); i++) {
                int id1 = emailIdx.get(account.get(i));
                int id2 = emailIdx.get(account.get(i - 1));
                adj.get(id1).add(id2);
                adj.get(id2).add(id1);
            }
        }

        // Initialize visited array
        visited = new boolean[m];

        // DFS traversal
        for (int i = 0; i < m; i++) {
            if (!visited[i]) {
                int accId = emailToAcc.get(i);
                emailGroup.putIfAbsent(accId, new ArrayList<>());
                dfs(i, accId);
            }
        }

        // Build result
        List<List<String>> res = new ArrayList<>();
        for (int accId : emailGroup.keySet()) {
            List<String> group = emailGroup.get(accId);
            Collections.sort(group);
            List<String> merged = new ArrayList<>();
            merged.add(accounts.get(accId).get(0));
            merged.addAll(group);
            res.add(merged);
        }

        return res;
    }

    private void dfs(int node, int accId) {
        visited[node] = true;
        emailGroup.get(accId).add(emails.get(node));
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, accId);
            }
        }
    }
}
```

```cpp
class Solution {
    unordered_map<string, int> emailIdx; // email -> id
    vector<string> emails; // set of emails of all accounts
    unordered_map<int, int> emailToAcc; // email_index -> account_Id
    vector<vector<int>> adj;
    unordered_map<int, vector<string>> emailGroup; // index of acc -> list of emails
    vector<bool> visited;

public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        int m = 0;

        // Build email index and mappings
        for (int accId = 0; accId < n; accId++) {
            vector<string>& account = accounts[accId];
            for (int i = 1; i < account.size(); i++) {
                string& email = account[i];
                if (emailIdx.find(email) == emailIdx.end()) {
                    emails.push_back(email);
                    emailIdx[email] = m;
                    emailToAcc[m] = accId;
                    m++;
                }
            }
        }

        // Build adjacency list
        adj.resize(m);
        for (auto& account : accounts) {
            for (int i = 2; i < account.size(); i++) {
                int id1 = emailIdx[account[i]];
                int id2 = emailIdx[account[i - 1]];
                adj[id1].push_back(id2);
                adj[id2].push_back(id1);
            }
        }

        visited.resize(m, false);
        // DFS traversal
        for (int i = 0; i < m; i++) {
            if (!visited[i]) {
                int accId = emailToAcc[i];
                dfs(i, accId);
            }
        }

        // Build result
        vector<vector<string>> res;
        for (auto& [accId, group] : emailGroup) {
            sort(group.begin(), group.end());
            vector<string> merged;
            merged.push_back(accounts[accId][0]);
            merged.insert(merged.end(), group.begin(), group.end());
            res.push_back(merged);
        }

        return res;
    }

private:
    void dfs(int node, int& accId) {
        visited[node] = true;
        emailGroup[accId].push_back(emails[node]);
        for (int& neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, accId);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} accounts
     * @return {string[][]}
     */
    accountsMerge(accounts) {
        const emailIdx = new Map(); // email -> id
        const emails = []; // set of emails of all accounts
        const emailToAcc = new Map(); // email_index -> account_Id
        const adj = [];
        const emailGroup = new Map(); // index of acc -> list of emails
        let visited = [];

        const n = accounts.length;
        let m = 0;

        // Build email index and mappings
        for (let accId = 0; accId < n; accId++) {
            const account = accounts[accId];
            for (let i = 1; i < account.length; i++) {
                const email = account[i];
                if (!emailIdx.has(email)) {
                    emails.push(email);
                    emailIdx.set(email, m);
                    emailToAcc.set(m, accId);
                    m++;
                }
            }
        }

        // Build adjacency list
        for (let i = 0; i < m; i++) {
            adj.push([]);
        }
        for (const account of accounts) {
            for (let i = 2; i < account.length; i++) {
                const id1 = emailIdx.get(account[i]);
                const id2 = emailIdx.get(account[i - 1]);
                adj[id1].push(id2);
                adj[id2].push(id1);
            }
        }

        // Initialize visited array
        visited = Array(m).fill(false);

        // DFS traversal
        const dfs = (node, accId) => {
            visited[node] = true;
            emailGroup.get(accId).push(emails[node]);
            for (const neighbor of adj[node]) {
                if (!visited[neighbor]) {
                    dfs(neighbor, accId);
                }
            }
        };

        for (let i = 0; i < m; i++) {
            if (!visited[i]) {
                const accId = emailToAcc.get(i);
                if (!emailGroup.has(accId)) {
                    emailGroup.set(accId, []);
                }
                dfs(i, accId);
            }
        }

        // Build result
        const res = [];
        for (const [accId, group] of emailGroup.entries()) {
            group.sort();
            const merged = [accounts[accId][0], ...group];
            res.push(merged);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    private Dictionary<string, int> emailIdx = new Dictionary<string, int>();
    private List<string> emails = new List<string>();
    private List<List<int>> adj;
    private bool[] visited;
    private Dictionary<int, List<string>> components = new Dictionary<int, List<string>>();
    private Dictionary<int, string> componentName = new Dictionary<int, string>();

    public List<List<string>> AccountsMerge(List<List<string>> accounts) {
        int m = 0;

        for (int accId = 0; accId < accounts.Count; accId++) {
            var account = accounts[accId];
            for (int i = 1; i < account.Count; i++) {
                string email = account[i];
                if (!emailIdx.ContainsKey(email)) {
                    emailIdx[email] = m++;
                    emails.Add(email);
                }
            }
        }

        adj = new List<List<int>>();
        for (int i = 0; i < m; i++) adj.Add(new List<int>());

        foreach (var account in accounts) {
            for (int i = 2; i < account.Count; i++) {
                int u = emailIdx[account[i - 1]];
                int v = emailIdx[account[i]];
                adj[u].Add(v);
                adj[v].Add(u);
            }
        }

        visited = new bool[m];

        foreach (var account in accounts) {
            string name = account[0];
            foreach (var email in account.Skip(1)) {
                int idx = emailIdx[email];
                if (!visited[idx]) {
                    components[idx] = new List<string>();
                    componentName[idx] = name;
                    Dfs(idx, idx);
                }
            }
        }

        var res = new List<List<string>>();
        foreach (var kvp in components) {
            var group = kvp.Value;
            group.Sort(StringComparer.Ordinal);
            var merged = new List<string> { componentName[kvp.Key] };
            merged.AddRange(group);
            res.Add(merged);
        }

        return res;
    }

    private void Dfs(int node, int root) {
        visited[node] = true;
        components[root].Add(emails[node]);
        foreach (int nei in adj[node]) {
            if (!visited[nei]) {
                Dfs(nei, root);
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n * m)\log (n * m))$
- Space complexity: $O(n * m)$

> Where $n$ is the number of accounts and $m$ is the number of emails.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        n = len(accounts)
        emailIdx = {} # email -> id
        emails = [] # set of emails of all accounts
        emailToAcc = {} # email_index -> account_Id

        m = 0
        for accId, a in enumerate(accounts):
            for i in range(1, len(a)):
                email = a[i]
                if email in emailIdx:
                    continue
                emails.append(email)
                emailIdx[email] = m
                emailToAcc[m] = accId
                m += 1

        adj = [[] for _ in range(m)]
        for a in accounts:
            for i in range(2, len(a)):
                id1 = emailIdx[a[i]]
                id2 = emailIdx[a[i - 1]]
                adj[id1].append(id2)
                adj[id2].append(id1)

        emailGroup = defaultdict(list) # index of acc -> list of emails
        visited = [False] * m

        def bfs(start, accId):
            queue = deque([start])
            visited[start] = True
            while queue:
                node = queue.popleft()
                emailGroup[accId].append(emails[node])
                for nei in adj[node]:
                    if not visited[nei]:
                        visited[nei] = True
                        queue.append(nei)

        for i in range(m):
            if not visited[i]:
                bfs(i, emailToAcc[i])

        res = []
        for accId in emailGroup:
            name = accounts[accId][0]
            res.append([name] + sorted(emailGroup[accId]))

        return res
```

```java
public class Solution {
    private Map<String, Integer> emailIdx = new HashMap<>(); // email -> id
    private List<String> emails = new ArrayList<>(); // set of emails of all accounts
    private Map<Integer, Integer> emailToAcc = new HashMap<>(); // email_index -> account_Id
    private List<List<Integer>> adj;
    private Map<Integer, List<String>> emailGroup = new HashMap<>(); // index of acc -> list of emails
    private boolean[] visited;

    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        int m = 0;

        // Build email index and mappings
        for (int accId = 0; accId < n; accId++) {
            List<String> account = accounts.get(accId);
            for (int i = 1; i < account.size(); i++) {
                String email = account.get(i);
                if (!emailIdx.containsKey(email)) {
                    emails.add(email);
                    emailIdx.put(email, m);
                    emailToAcc.put(m, accId);
                    m++;
                }
            }
        }

        // Build adjacency list
        adj = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            adj.add(new ArrayList<>());
        }
        for (List<String> account : accounts) {
            for (int i = 2; i < account.size(); i++) {
                int id1 = emailIdx.get(account.get(i));
                int id2 = emailIdx.get(account.get(i - 1));
                adj.get(id1).add(id2);
                adj.get(id2).add(id1);
            }
        }

        // Initialize visited array
        visited = new boolean[m];

        // BFS traversal
        for (int i = 0; i < m; i++) {
            if (!visited[i]) {
                int accId = emailToAcc.get(i);
                emailGroup.putIfAbsent(accId, new ArrayList<>());
                bfs(i, accId);
            }
        }

        // Build result
        List<List<String>> res = new ArrayList<>();
        for (int accId : emailGroup.keySet()) {
            List<String> group = emailGroup.get(accId);
            Collections.sort(group);
            List<String> merged = new ArrayList<>();
            merged.add(accounts.get(accId).get(0));
            merged.addAll(group);
            res.add(merged);
        }

        return res;
    }

    private void bfs(int start, int accId) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            emailGroup.get(accId).add(emails.get(node));
            for (int neighbor : adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
}
```

```cpp
class Solution {
    unordered_map<string, int> emailIdx; // email -> id
    vector<string> emails; // set of emails of all accounts
    unordered_map<int, int> emailToAcc; // email_index -> account_Id
    vector<vector<int>> adj;
    unordered_map<int, vector<string>> emailGroup; // index of acc -> list of emails
    vector<bool> visited;

public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        int m = 0;

        // Build email index and mappings
        for (int accId = 0; accId < n; accId++) {
            vector<string>& account = accounts[accId];
            for (int i = 1; i < account.size(); i++) {
                string& email = account[i];
                if (emailIdx.find(email) == emailIdx.end()) {
                    emails.push_back(email);
                    emailIdx[email] = m;
                    emailToAcc[m] = accId;
                    m++;
                }
            }
        }

        // Build adjacency list
        adj.resize(m);
        for (auto& account : accounts) {
            for (int i = 2; i < account.size(); i++) {
                int id1 = emailIdx[account[i]];
                int id2 = emailIdx[account[i - 1]];
                adj[id1].push_back(id2);
                adj[id2].push_back(id1);
            }
        }

        visited.resize(m, false);
        // BFS traversal
        for (int i = 0; i < m; i++) {
            if (!visited[i]) {
                int accId = emailToAcc[i];
                bfs(i, accId);
            }
        }

        // Build result
        vector<vector<string>> res;
        for (auto& [accId, group] : emailGroup) {
            sort(group.begin(), group.end());
            vector<string> merged;
            merged.push_back(accounts[accId][0]);
            merged.insert(merged.end(), group.begin(), group.end());
            res.push_back(merged);
        }

        return res;
    }

private:
    void bfs(int start, int accId) {
        queue<int> q;
        q.push(start);
        visited[start] = true;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            emailGroup[accId].push_back(emails[node]);
            for (int& neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} accounts
     * @return {string[][]}
     */
    accountsMerge(accounts) {
        const emailIdx = new Map(); // email -> id
        const emails = []; // set of emails of all accounts
        const emailToAcc = new Map(); // email_index -> account_Id
        const adj = [];
        const emailGroup = new Map(); // index of acc -> list of emails
        let visited = [];

        const n = accounts.length;
        let m = 0;

        // Build email index and mappings
        for (let accId = 0; accId < n; accId++) {
            const account = accounts[accId];
            for (let i = 1; i < account.length; i++) {
                const email = account[i];
                if (!emailIdx.has(email)) {
                    emails.push(email);
                    emailIdx.set(email, m);
                    emailToAcc.set(m, accId);
                    m++;
                }
            }
        }

        // Build adjacency list
        for (let i = 0; i < m; i++) {
            adj.push([]);
        }
        for (const account of accounts) {
            for (let i = 2; i < account.length; i++) {
                const id1 = emailIdx.get(account[i]);
                const id2 = emailIdx.get(account[i - 1]);
                adj[id1].push(id2);
                adj[id2].push(id1);
            }
        }

        // Initialize visited array
        visited = Array(m).fill(false);

        // BFS traversal
        const bfs = (start, accId) => {
            const queue = new Queue([start]);
            visited[start] = true;

            while (!queue.isEmpty()) {
                const node = queue.pop();
                emailGroup.get(accId).push(emails[node]);
                for (const neighbor of adj[node]) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.push(neighbor);
                    }
                }
            }
        };

        for (let i = 0; i < m; i++) {
            if (!visited[i]) {
                const accId = emailToAcc.get(i);
                if (!emailGroup.has(accId)) {
                    emailGroup.set(accId, []);
                }
                bfs(i, accId);
            }
        }

        // Build result
        const res = [];
        for (const [accId, group] of emailGroup.entries()) {
            group.sort();
            const merged = [accounts[accId][0], ...group];
            res.push(merged);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<string>> AccountsMerge(List<List<string>> accounts) {
        int n = accounts.Count;
        Dictionary<string, int> emailIdx = new Dictionary<string, int>();
        List<string> emails = new List<string>();
        Dictionary<int, int> emailToAcc = new Dictionary<int, int>();

        int m = 0;
        for (int accId = 0; accId < n; accId++) {
            var account = accounts[accId];
            for (int i = 1; i < account.Count; i++) {
                string email = account[i];
                if (!emailIdx.ContainsKey(email)) {
                    emailIdx[email] = m;
                    emails.Add(email);
                    emailToAcc[m] = accId;
                    m++;
                }
            }
        }

        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i < m; i++) adj.Add(new List<int>());

        foreach (var account in accounts) {
            for (int i = 2; i < account.Count; i++) {
                int id1 = emailIdx[account[i]];
                int id2 = emailIdx[account[i - 1]];
                adj[id1].Add(id2);
                adj[id2].Add(id1);
            }
        }

        Dictionary<int, List<string>> emailGroup = new Dictionary<int, List<string>>();
        bool[] visited = new bool[m];

        void Bfs(int start, int accId) {
            Queue<int> queue = new Queue<int>();
            queue.Enqueue(start);
            visited[start] = true;

            if (!emailGroup.ContainsKey(accId))
                emailGroup[accId] = new List<string>();

            while (queue.Count > 0) {
                int node = queue.Dequeue();
                emailGroup[accId].Add(emails[node]);

                foreach (int nei in adj[node]) {
                    if (!visited[nei]) {
                        visited[nei] = true;
                        queue.Enqueue(nei);
                    }
                }
            }
        }

        for (int i = 0; i < m; i++) {
            if (!visited[i]) {
                Bfs(i, emailToAcc[i]);
            }
        }

        List<List<string>> res = new List<List<string>>();
        foreach (var kvp in emailGroup) {
            int accId = kvp.Key;
            string name = accounts[accId][0];
            List<string> merged = new List<string> { name };
            kvp.Value.Sort(StringComparer.Ordinal);
            merged.AddRange(kvp.Value);
            res.Add(merged);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n * m)\log (n * m))$
- Space complexity: $O(n * m)$

> Where $n$ is the number of accounts and $m$ is the number of emails.

---

## 3. Disjoint Set Union

::tabs-start

```python
class UnionFind:
    def __init__(self, n):
        self.par = [i for i in range(n)]
        self.rank = [1] * n

    def find(self, x):
        while x != self.par[x]:
            self.par[x] = self.par[self.par[x]]
            x = self.par[x]
        return x

    def union(self, x1, x2):
        p1, p2 = self.find(x1), self.find(x2)
        if p1 == p2:
            return False
        if self.rank[p1] > self.rank[p2]:
            self.par[p2] = p1
            self.rank[p1] += self.rank[p2]
        else:
            self.par[p1] = p2
            self.rank[p2] += self.rank[p1]
        return True

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        uf = UnionFind(len(accounts))
        emailToAcc = {}  # email -> index of acc

        for i, a in enumerate(accounts):
            for e in a[1:]:
                if e in emailToAcc:
                    uf.union(i, emailToAcc[e])
                else:
                    emailToAcc[e] = i

        emailGroup = defaultdict(list)  # index of acc -> list of emails
        for e, i in emailToAcc.items():
            leader = uf.find(i)
            emailGroup[leader].append(e)

        res = []
        for i, emails in emailGroup.items():
            name = accounts[i][0]
            res.append([name] + sorted(emailGroup[i]))
        return res
```

```java
class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int find(int x) {
        if (x != parent[x]) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    public boolean union(int x1, int x2) {
        int p1 = find(x1);
        int p2 = find(x2);
        if (p1 == p2) {
            return false;
        }
        if (rank[p1] > rank[p2]) {
            parent[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            parent[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
}

public class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        UnionFind uf = new UnionFind(n);
        Map<String, Integer> emailToAcc = new HashMap<>(); // email -> index of acc

        // Build union-find structure
        for (int i = 0; i < n; i++) {
            List<String> account = accounts.get(i);
            for (int j = 1; j < account.size(); j++) {
                String email = account.get(j);
                if (emailToAcc.containsKey(email)) {
                    uf.union(i, emailToAcc.get(email));
                } else {
                    emailToAcc.put(email, i);
                }
            }
        }

        // Group emails by leader account
        Map<Integer, List<String>> emailGroup = new HashMap<>(); // index of acc -> list of emails
        for (Map.Entry<String, Integer> entry : emailToAcc.entrySet()) {
            String email = entry.getKey();
            int accId = entry.getValue();
            int leader = uf.find(accId);
            emailGroup.putIfAbsent(leader, new ArrayList<>());
            emailGroup.get(leader).add(email);
        }

        // Build result
        List<List<String>> res = new ArrayList<>();
        for (Map.Entry<Integer, List<String>> entry : emailGroup.entrySet()) {
            int accId = entry.getKey();
            List<String> emails = entry.getValue();
            Collections.sort(emails);
            List<String> merged = new ArrayList<>();
            merged.add(accounts.get(accId).get(0)); // Add account name
            merged.addAll(emails);
            res.add(merged);
        }

        return res;
    }
}
```

```cpp
class UnionFind {
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int x) {
        if (x != parent[x]) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    bool unionSets(int x1, int x2) {
        int p1 = find(x1);
        int p2 = find(x2);
        if (p1 == p2) {
            return false;
        }
        if (rank[p1] > rank[p2]) {
            parent[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            parent[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        UnionFind uf(n);
        unordered_map<string, int> emailToAcc; // email -> index of acc

        // Build union-find structure
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                const string& email = accounts[i][j];
                if (emailToAcc.count(email)) {
                    uf.unionSets(i, emailToAcc[email]);
                } else {
                    emailToAcc[email] = i;
                }
            }
        }

        // Group emails by leader account
        map<int, vector<string>> emailGroup; // index of acc -> list of emails
        for (const auto& [email, accId] : emailToAcc) {
            int leader = uf.find(accId);
            emailGroup[leader].push_back(email);
        }

        // Build result
        vector<vector<string>> res;
        for (auto& [accId, emails] : emailGroup) {
            sort(emails.begin(), emails.end());
            vector<string> merged;
            merged.push_back(accounts[accId][0]);
            merged.insert(merged.end(), emails.begin(), emails.end());
            res.push_back(merged);
        }

        return res;
    }
};
```

```javascript
class UnionFind {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(1);
    }

    /**
     * @param {number} x
     * @return {number}
     */
    find(x) {
        if (x !== this.parent[x]) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    /**
     * @param {number} x1
     * @param {number} x2
     * @return {boolean}
     */
    union(x1, x2) {
        const p1 = this.find(x1);
        const p2 = this.find(x2);
        if (p1 === p2) {
            return false;
        }
        if (this.rank[p1] > this.rank[p2]) {
            this.parent[p2] = p1;
            this.rank[p1] += this.rank[p2];
        } else {
            this.parent[p1] = p2;
            this.rank[p2] += this.rank[p1];
        }
        return true;
    }
}

class Solution {
    /**
     * @param {string[][]} accounts
     * @return {string[][]}
     */
    accountsMerge(accounts) {
        const n = accounts.length;
        const uf = new UnionFind(n);
        const emailToAcc = new Map(); // email -> index of acc

        // Build union-find structure
        for (let i = 0; i < n; i++) {
            for (let j = 1; j < accounts[i].length; j++) {
                const email = accounts[i][j];
                if (emailToAcc.has(email)) {
                    uf.union(i, emailToAcc.get(email));
                } else {
                    emailToAcc.set(email, i);
                }
            }
        }

        // Group emails by leader account
        const emailGroup = new Map(); // index of acc -> list of emails
        for (const [email, accId] of emailToAcc.entries()) {
            const leader = uf.find(accId);
            if (!emailGroup.has(leader)) {
                emailGroup.set(leader, []);
            }
            emailGroup.get(leader).push(email);
        }

        // Build result
        const res = [];
        for (const [accId, emails] of emailGroup.entries()) {
            emails.sort();
            const merged = [accounts[accId][0], ...emails];
            res.push(merged);
        }

        return res;
    }
}
```

```csharp
public class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int Find(int x) {
        if (x != parent[x]) {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    public bool Union(int x, int y) {
        int rootX = Find(x);
        int rootY = Find(y);

        if (rootX == rootY) return false;

        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
            rank[rootX] += rank[rootY];
        } else {
            parent[rootX] = rootY;
            rank[rootY] += rank[rootX];
        }

        return true;
    }
}

public class Solution {
    public List<List<string>> AccountsMerge(List<List<string>> accounts) {
        int n = accounts.Count;
        UnionFind uf = new UnionFind(n);
        Dictionary<string, int> emailToAcc = new Dictionary<string, int>();

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].Count; j++) {
                string email = accounts[i][j];
                if (emailToAcc.ContainsKey(email)) {
                    uf.Union(i, emailToAcc[email]);
                } else {
                    emailToAcc[email] = i;
                }
            }
        }

        Dictionary<int, List<string>> emailGroup = new Dictionary<int, List<string>>();
        foreach (var kvp in emailToAcc) {
            string email = kvp.Key;
            int leader = uf.Find(kvp.Value);
            if (!emailGroup.ContainsKey(leader)) {
                emailGroup[leader] = new List<string>();
            }
            emailGroup[leader].Add(email);
        }

        List<List<string>> res = new List<List<string>>();
        foreach (var kvp in emailGroup) {
            int accId = kvp.Key;
            List<string> emails = kvp.Value;
            emails.Sort(StringComparer.Ordinal);
            List<string> merged = new List<string> { accounts[accId][0] };
            merged.AddRange(emails);
            res.Add(merged);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n * m)\log (n * m))$
- Space complexity: $O(n * m)$

> Where $n$ is the number of accounts and $m$ is the number of emails.
