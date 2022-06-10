/*
    Design data structure that follows constraints of an LRU cache
    Hash map + doubly linked list, left = LRU, right = MRU
    get: update to MRU, put: update to MRU, remove LRU if full
    Time: O(1)
    Space: O(capacity)
*/

struct Node{
    int key, val;
    Node *prev, *next;
    Node(int k, int v): key(k), val(v), prev(NULL), next(NULL) {}
};

class LRUCache {
private:
    int cap;
    unordered_map<int, Node*> cache;
    Node *left, *right;
    
    // remove node from list
    void remove(Node *node){
        Node* prev = node->prev;
        Node* next = node->next;
        
        prev->next = next;
        next->prev = prev;
    }
    
    // insert node at right
    void insert(Node *node){
        Node* prev = right->prev;
        Node* next = right;
        
        prev->next = node;
        next->prev = node;
        
        node->prev = prev;
        node->next = next;
    }

public:
    LRUCache(int capacity) {
        cap = capacity;
        
        left = new Node(0,0);
        right = new Node(0,0);
        
        left->next = right;
        right->prev = left;
    }
    
    int get(int key) {
        if(cache.find(key)!=cache.end()){
            remove(cache[key]);
            insert(cache[key]);
            return cache[key]->val;
        }
        return -1;
    }
    
    void put(int key, int value) {
        if(cache.find(key)!=cache.end())    remove(cache[key]);
        
        cache[key] = new Node(key, value);
        insert(cache[key]);
        
        // remove from list & delete LRU from map
        if(cache.size() > cap){
            Node *lru = left->next;
            remove(lru);
            cache.erase(lru->key);
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */