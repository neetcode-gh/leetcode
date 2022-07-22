/*
    Given list of words in another language, return string such that:
    Letters are sorted in lexicographical incr order wrt this language
    Ex. words = ["wrt","wrf","er","ett","rftt"]

    Build graph + record edges, BFS + topological sort, check cyclic

    Time: O(n)
    Space: O(n)
*/

// create graph or adjacency list
        unordered_map<char, unordered_set<char>> graph; // set to avoid duplicacy
        unordered_map<char, int> indegree;

        for(auto word: words){
            for(auto c : word){
                indegree[c] = 0;
            }
        }

        for(int i=0; i<words.size()-1; i++){
            
            bool flag = false;
            string s1 = words[i];
            string s2 = words[i+1];

            int len = min(s1.length(), s2.length());

            for(int j=0; j<len; j++){

                char ch1 = s1[j];
                char ch2 = s2[j];

                // if the char do not match
                if(ch1 != ch2){

                    unordered_set<char> set;
                    if(graph.find(ch1) != graph.end()){
                        
                        set = graph[ch1];

                        if(set.find(ch2) == set.end()){
                            set.insert(ch2);
                            graph[ch1] = set;
                            indegree[ch2]++;
                        }
        
                    }
                    else{
                        set.insert(ch2);
                        graph[ch1] = set;
                        indegree[ch2]++;
                    }

                    flag = true;
                    break;
                }
            }
            if(flag == false and (s1.length() > s2.length())) return "";
        }

        queue<char> pq;

        for(auto i : indegree){
            if(i.second == 0) pq.push(i.first);
        }

        string ans = "";
        int count = 0;
        while(pq.size()>0){

            auto rem = pq.front();
            pq.pop();

            ans += rem;
            count++;

            if(graph[rem].empty()) continue;

            if(graph.find(rem) != graph.end()){
                unordered_set<char> nbrs = graph[rem];

                for(char nbr : nbrs){
                    indegree[nbr]--;
                    if(indegree[nbr] == 0){
                        pq.push(nbr);
                    }
                }
            }
        }

        if(count == indegree.size()){
            return ans;
        }
        return "";
