from typing import List
from collections import defaultdict

class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        def dfs(node: int, parent: int) -> int:
            total_time = 0
            for child in graph[node]:
                if child == parent:
                    continue
                time_from_child = dfs(child, node)
                if time_from_child > 0 or hasApple[child]:
                    total_time += time_from_child + 2
            return total_time

        return dfs(0, -1)
