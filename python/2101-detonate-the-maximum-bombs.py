class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        n = len(bombs)
        graph = [[] for _ in range(n)]

        for i in range(n):
            for j in range(n):
                if i != j:
                    x1, y1, r1 = bombs[i]
                    x2, y2, _ = bombs[j]

                    dst = sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

                    if dst <= r1:
                        graph[i].append(j)

        def dfs(node, vis):
            vis[node] = True
            count = 1

            for nbh in graph[node]:
                if not vis[nbh]:
                    count += dfs(nbh, vis)
                    
            return count

        detonated = 0

        for i in range(n):
            visited = [False] * n
            detonated = max(detonated, dfs(i, visited))
        
        return detonated