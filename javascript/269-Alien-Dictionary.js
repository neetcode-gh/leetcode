let alienOrder = function (words) {
  let graph = {};

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      graph[words[i][j]] = new Set();
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    let word1 = words[i];
    let word2 = words[i + 1];

    if (word1.length > word2.length && (word1 + '').startsWith(word2)) {
      return '';
    }

    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      let c1 = word1[j];
      let c2 = word2[j];

      if (c1 !== c2) {
        graph[c1].add(c2);
        break;
      }
    }
  }

  let visited = {}; // 'false' = visited, 'true' = current path
  let res = [];

  function dfs(c) {
    if (visited[c]) {
      return Boolean(visited[c]);
    }

    visited[c] = 'true';
    for (let nei of graph[c]) {
      if (dfs(nei)) {
        return true;
      }
    }

    visited[c] = 'false';
    res.push(c);
  }

  Object.keys(graph).forEach((c) => {
    if (dfs(c)) {
      return '';
    }
  });

  return res.reverse().join('');
};
