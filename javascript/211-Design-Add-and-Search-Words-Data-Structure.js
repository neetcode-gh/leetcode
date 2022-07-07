class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let cur = this.root;

    for (const c of word) {
      if (!(c in cur.children)) {
        cur.children[c] = new TrieNode();
      }
      cur = cur.children[c];
    }
    cur.endOfWord = true;
  }

  search(word) {
    function dfs(j, root) {
      let cur = root;

      for (let i = j; i < word.length; i++) {
        const c = word[i];

        if (c === ".") {
          for (const key in cur.children) {
            if (Object.prototype.hasOwnProperty.call(cur.children, key)) {
              const child = cur.children[key];

              if (dfs(i + 1, child)) {
                return true;
              }
            }
          }
          return false;
        } else {
          if (!(c in cur.children)) {
            return false;
          }
          cur = cur.children[c];
        }
      }

      return cur.endOfWord;
    }
    return dfs(0, this.root);
  }
}
