public class Node
{
    public int val;
    public int key;
    public Node prev;
    public Node next;

    public Node(int key, int val)
    {
        this.key = key;
        this.val = val;
        prev = null;
        next = null;
    }
}

public class LRUCache
{
    private Dictionary<int, Node> keyValue = new();
    private int _capacity;
    private Node left;
    private Node right;

    //T: O(1), S: O(Capacity)
    public LRUCache(int capacity)
    {
        _capacity = capacity;
        left = new Node(0, 0);
        right = new Node(0, 0);
        // left : LRU, right : MRU (Most recently used)
        left.next = right;
        right.prev = left;
    }

    //Remove from list
    private void remove(Node node)
    {
        var prev = node.prev;
        var next = node.next;

        prev.next = next;
        next.prev = prev;
    }

    // Insert at right
    private void insert(Node node)
    {
        var next = right;
        var prev = right.prev;

        node.next = next;
        next.prev = node;
        prev.next = node;
        node.prev = prev;

    }

    public int Get(int key)
    {
        if (!keyValue.ContainsKey(key))
            return -1;
        // we need to update this to be MRU
        var node = keyValue[key];
        remove(node);
        insert(node);
        return node.val;
    }

    public void Put(int key, int value)
    {
        if (keyValue.ContainsKey(key))
        {
            var node = keyValue[key];
            keyValue.Remove(key);
            remove(node);
        }

        var newNode = new Node(key, value);
        keyValue.Add(key, newNode);
        insert(newNode);

        if (keyValue.Count > _capacity)
        {
            // remove  from the list and delete the LRU from dictionary
            var lru = left.next;
            remove(lru);
            keyValue.Remove(lru.key);
        }

    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.Get(key);
 * obj.Put(key,value);
 */