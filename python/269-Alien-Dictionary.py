class Solution:
    def alienOrder(self, words: List[str]) -> str:
        adj = {char: set() for word in words for char in word}

        for i in range(len(words)-1):
          w1, w2 = words[i], words[i + 1]
          minLen = min(len(w1), len(w2))
          if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
            return ''
          for j in range(minLen):
            if w1[j] != w2[j]:
              print(w1[j], w2[j])
              adj[w1[j]].add(w2[j])
              break

        visited = {} # {char: bool} False visited, True current path
        res = []

        def dfs(char):
          if char in visited:
            return visited[char]

          visited[char] = True

          for neighChar in adj[char]:
            if dfs(neighChar):
              return True

          visited[char] = False
          res.append(char)

        for char in adj:
          if dfs(char):
            return ''

        res.reverse()
        return ''.join(res)