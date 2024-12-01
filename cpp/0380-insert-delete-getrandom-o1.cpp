class RandomizedSet {
public:

    unordered_map<int,int> indices;
    vector<int> values;
    RandomizedSet() {
    }
    
    bool insert(int val) {

        if(indices.find(val)==indices.end()){
            values.push_back(val);
            // store the index of that value
            indices[val] = values.size() -1;
            return true;
        }
        return false;
    }
    
    bool remove(int val) {

       if(indices.find(val)==indices.end()){
           return false;
       }

        // find index of the value
        int idx = indices[val];
        // get the last value in the vector
        // and change its index to curr val's index
        indices[values[values.size()-1]] = idx;

        // replace curr vals index with last 
        // last value
        values[idx] = values[values.size()-1];

        // so now the curr val is removed from the
        // vector replaced by last value and so 
        // we could just remove last value 
        values.pop_back();

        // also erase it from the hash map
        indices.erase(val);
        return true;
    }
    
    int getRandom() {
        return values[rand()%values.size()];
    }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */