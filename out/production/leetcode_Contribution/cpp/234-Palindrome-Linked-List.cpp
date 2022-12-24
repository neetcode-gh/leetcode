class Solution{    
    public:    
        bool isPalindrome(ListNode* head){            
            vector<int> v;            
            while(head != nullptr){                
                v.push_back(head -> val);                
                head = head -> next;              
            }         
            for(int i = 0; i < v.size() / 2; i++){                
                if(v[i] != v[v.size() - i - 1]){                    
                    return false;                    
                }                
            }            
            return true;
        }    
};
