class LRUCache {
public:

    int m_capacity;
    unordered_map<int,  list<pair<int, int>>::iterator> m_map; 
    //m_map_iter->first: key, m_map_iter->second: list iterator;
    
    list<pair<int, int>> m_list;                               
    //m_list_iter->first: key, m_list_iter->second: value;
    
public:
    LRUCache(size_t capacity) : m_capacity(capacity) {}
    
    int get(int key) 
    {
        auto found_iter = m_map.find(key);
        
        if (found_iter == m_map.end()) //key doesn't exist
            return -1;
        
        //move the node corresponding to key to front
        m_list.splice(m_list.begin(), m_list, found_iter->second); 

        //return value of the node
        return found_iter->second->second;                       
        
    }
    
    void put(int key, int value) 
    {
        auto found_iter = m_map.find(key);
        if (found_iter != m_map.end()) //key exists
        {
          
            //move the node corresponding to key to front
            m_list.splice(m_list.begin(), m_list, found_iter->second); 
            
            //update value of the node
            found_iter->second->second = value;                        
           
            return;
        }
        
        if (m_map.size() == m_capacity) //reached capacity
        {
           int key_to_del = m_list.back().first; 
           m_list.pop_back();            //remove node in list;
           m_map.erase(key_to_del);      //remove key in map
        }
        
        m_list.emplace_front(key, value);  //create new node in list
        m_map[key] = m_list.begin();       //create correspondence between key and node
    }
};
