class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
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
    let cur = this.root;

    for (const c of word) {
      if (!(c in cur.children)) {
        return false;
      }
      cur = cur.children[c];
    }

    return cur.endOfWord;
  }

  startsWith(prefix) {
    let cur = this.root;

    for (const c of prefix) {
      if (!(c in cur.children)) {
        return false;
      }
      cur = cur.children[c];
    }

    return true;
  }
}
