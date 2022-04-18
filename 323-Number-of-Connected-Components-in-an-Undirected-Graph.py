class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        W = 'WHITE' # not visited
        G = 'GREY'  # partially visited
        B = 'BLACK' # fully visited
        
        colors = [W for _ in range(n)]
        
        adj = collections.defaultdict(list)
        
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)
            
        def dfs(u):
            colors[u] = G
            for v in adj[u]:
                if colors[v] == W:
                    dfs(v)
            colors[u] = B
            
        # forest aka number of connected trees
        forest = 0
            
        for s in range(n):
            if colors[s] == W:
                dfs(s)
                forest += 1
                
        return forest
