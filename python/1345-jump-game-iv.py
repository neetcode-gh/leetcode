
from collections import defaultdict, deque
from typing import List


class Solution:
    # Time O(n) - Space O(n)
    def minJumps(self, arr: List[int]) -> int:
        n = len(arr)
        # Base case.
        if n < 2:
            return 0
        # A dictionary of vertices indexed by values.
        d = defaultdict(list)
        for i in reversed(range(n)):
            d[arr[i]].append(i)

        # A function that gets all neighbors of a node that we have not
        # queued yet.
        def getUnqueuedNeighbors(i: int) -> List[int]:
            adj = []
            # We can reach the element before.
            if 0 < i and not seen[i - 1]:
                seen[i - 1] = True
                adj.append(i - 1)
            # We can reach the element after.
            if i < n - 1 and not seen[i + 1]:
                seen[i + 1] = True
                adj.append(i + 1)
            # We can also reach any element with the same value.
            if arr[i] in d:
                for node in d[arr[i]]:
                    if node != i:
                        adj.append(node)
                        seen[node] = True
                d.pop(arr[i])
            return adj

        # A list of nodes that we have visited already.
        seen = [False] * n
        seen[0] = True
        # BFS starting at 0 and counting the steps until we reach n-1.
        steps, level = 0, deque([0])
        while level:
            steps += 1
            # Process an entire level.
            for _ in range(len(level)):
                current = level.popleft()
                for nei in getUnqueuedNeighbors(current):
                    # If this is the target node, return.
                    if nei == n - 1:
                        return steps
                    level.append(nei)
