public class LRUCache {
    private Dictionary<int, LinkedListNode<(int key, int value)>> _dict = new();
    private LinkedList<(int key, int value)> _values = new();

    private int _capacity; 

    public LRUCache(int capacity) {
        _capacity = capacity;
    }
    
    public int Get(int key) {
        if (!_dict.ContainsKey(key)) {
            return -1;
        }

        var node = _dict[key];
        _values.Remove(node);
        _values.AddFirst(node);

        return node.Value.value;
    }
    
    public void Put(int key, int value) {
        if (!_dict.ContainsKey(key) && _dict.Count >= _capacity) {
            var node = _values.Last;
            _dict.Remove(node.Value.key);
            _values.Remove(node);
        }

        var existingNode = _dict.GetValueOrDefault(key);
        if (existingNode != null) {
            _values.Remove(existingNode);
        }

        _values.AddFirst((key, value));
        _dict[key] = _values.First;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.Get(key);
 * obj.Put(key,value);
 */
