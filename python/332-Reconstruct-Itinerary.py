class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = { u:collections.deque() for u, v in tickets }
        res = ["JFK"]
        
        tickets.sort()
        for u, v in tickets:
            adj[u].append(v)
        
        def dfs(cur):
            if len(res) == len(tickets) + 1:
                return True
            if cur not in adj:
                return False
            
            temp = list(adj[cur])
            for v in temp:
                adj[cur].popleft()
                res.append(v)
                if dfs(v):
                    return res
                res.pop()
                adj[cur].append(v)
            return False        
        dfs("JFK")
        return res
