class TrieNode {
    children: {};
    endOfWord: boolean;
    constructor() {
        this.children = {};
        this.endOfWord = false;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let cur = this.root;

        for (const c of word) {
            if (!(c in cur.children)) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.endOfWord = true;
    }

    search(word: string): boolean {
        let cur = this.root;

        for (const c of word) {
            if (!(c in cur.children)) {
                return false;
            }
            cur = cur.children[c];
        }

        return cur.endOfWord;
    }

    startsWith(prefix: string): boolean {
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

const trie = new Trie();
trie.insert('apple');
trie.search('apple'); // return True
trie.search('app'); // return False
trie.startsWith('app'); // return True
trie.insert('app');
trie.search('app'); // return True
