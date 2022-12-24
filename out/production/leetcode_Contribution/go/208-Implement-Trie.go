type Trie struct {
	children  [26]*Trie
	endOfWord bool
	root      *Trie
}

func Constructor() Trie {
	return Trie{
		children:  [26]*Trie{},
		endOfWord: false,
		root:      &Trie{}}
}

func (this *Trie) Insert(word string) {
	cur := this.root

	for i := 0; i < len(word); i++ {
		index := word[i] - 'a'
		if cur.children[index] == nil {
			cur.children[index] = &Trie{}
		}
		cur = cur.children[index]
	}

	cur.endOfWord = true
}

func (this *Trie) Search(word string) bool {
	cur := this.root

	for i := 0; i < len(word); i++ {
		index := word[i] - 'a'
		if cur.children[index] == nil {
			return false
		}
		cur = cur.children[index]
	}

	return cur.endOfWord
}

func (this *Trie) StartsWith(prefix string) bool {
	cur := this.root

	for i := 0; i < len(prefix); i++ {
		index := prefix[i] - 'a'
		if cur.children[index] == nil {
			return false
		}
		cur = cur.children[index]
	}

	return true
}
