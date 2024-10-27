/**
 * Binary Search
 * 
 * Time O(n*log(n) + m*n) | Space O(m)
 * https://leetcode.com/problems/search-suggestions-system/description/
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {

    products.sort((product1, product2) => {
        if(product1 < product2) {
            return -1;
        }
        if(product2 < product1) {
            return 1;
        }
        if(product1 === product2) {
            return 0;
        }
    });

    const result = [];
    let left = 0;
    let right = products.length - 1;
    for(let i = 0;  i < searchWord.length; i++) {
        let char = searchWord[i];
        
        while(left <= right && (products[left].length - 1 < i || products[left][i] !== char)) {
            left++;
        }
        while(left <= right && (products[right].length - 1 < i || products[right][i] !== char)) {
            right--;
        }

        const subResult = [];
        const len = Math.min(right - left + 1, 3);
        for(let j = 0; j < len; j++) {
            subResult.push(products[left+j]);
        }
        result.push(subResult);
    }

    return result;
};

/**
 * DFS - Trie
 * Time O(N * M) | Space O(N)
 * https://leetcode.com/problems/search-suggestions-system/
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts1 = (products, searchWord) => new Trie()
    .buildTrie(products)
    .searchWord(searchWord);

class Node {
    constructor () {
        this.children = new Map();
        this.isWord = false;
    }
};

class Trie {
    constructor () {
        this.root = new Node();
    }

    buildTrie (products) {
        for (const word of products) {
            this.insert(word);
        }

        return this;
    }
    
    insert (word, { root: node } = this) {        
        for (const char of word.split('')) {
            const child = (node.children.get(char) ?? new Node());
            
            node.children.set(char, child);

            node = child;
        }

        node.isWord = true;
    }
    
    searchWord (searchWord, buffer = [], suggestions = []) {
        for (const char of searchWord.split('')) {
            const prefix = this.getPrefix(buffer, char);
            const words = this.getSuggestions(prefix);

            suggestions.push(words);
        }
        
        return suggestions;
    }

    getPrefix (buffer, char) {
        buffer.push(char);

        return buffer.join('');
    }
    
    getSuggestions (prefix, words = []) {
        const node = this.getPrefixNode(prefix);

        const isInvalidPrefix = (node === null);
        if (isInvalidPrefix) return words
        
        return this.search(node, prefix, words);
    }

    getPrefixNode (prefix, { root: node } = this) {
        for (const char of prefix.split('')) {
            const child = (node.children.get(char) ?? null);

            const isLeafNode = (child === null);
            if (isLeafNode) return null;

            node = child;
        }

        return node;
    }

    search (node, word, words) {
        const isBaseCase = (words.length === 3);
        if (isBaseCase) return words;

        if (node.isWord) words.push(word);

        return this.dfs(node, word, words);
    }

    dfs (node, word, words) {
        for (const char of this.getChars()) {
            const child = (node.children.get(char) ?? null);

            const isLeafNode = (child === null);
            if (isLeafNode) continue;
        
            this.search(child, (word + char), words);
        }

        return words;
    }

    getChars () {
        return new Array(26).fill()
            .map((_, index) => String.fromCharCode((index + 97)));
    }
};
