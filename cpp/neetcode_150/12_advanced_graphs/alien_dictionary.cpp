/*
    Given list of words in another language, return string such that:
    Letters are sorted in lexicographical incr order wrt this language
    Ex. words = ["wrt","wrf","er","ett","rftt"]

    Build graph + record edges, BFS + topological sort, check cyclic

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> graph;
        unordered_map<char, int> indegree;
        
        // initialize, find all unique letters
        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words[i].size(); j++) {
                char c = words[i][j];
                indegree[c] = 0;
            }
        }
        
        // build graph, record indegree, find all edges
        for (int i = 0; i < words.size() - 1; i++) {
            string word1 = words[i];
            string word2 = words[i + 1];
            
            // find first mismatch & insert into hash maps
            int length = min(word1.size(), word2.size());
            for (int j = 0; j < length; j++) {
                if (word1[j] != word2[j]) {
                    unordered_set<char> s = graph[word1[j]];
                    if (s.find(word2[j]) == s.end()) {
                        graph[word1[j]].insert(word2[j]);
                        indegree[word2[j]]++;
                    }
                    break;
                }
                
                if (j == length - 1 && word1.size() > word2.size()) {
                    return "";
                }
            }
        }
        
        // bfs + topological sort
        string result = "";
        queue<char> q;

        for (auto it = indegree.begin(); it != indegree.end(); it++) {
            if (it->second == 0) {
                q.push(it->first);
            }
        }

        while (!q.empty()) {
            char c = q.front();
            q.pop();
            result += c;

            if (graph[c].empty()) {
                continue;
            }
            
            unordered_set<char> edges = graph[c];
            for (auto it = edges.begin(); it != edges.end(); it++) {
                char edge = *it;
                indegree[edge]--;
                if (indegree[edge] == 0) {
                    q.push(edge);
                }
            }
        }
        
        // check if it's cyclic
        if (result.size() < indegree.size()) {
            return "";
        }
        return result;
    }
};
