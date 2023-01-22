#include<iostream>
#include<map>
#include<vector>
#include<queue>
using namespace std;

class Solution {
public:
    string alienOrder(vector<string>& words) {
        map<char,int> degree;
        map<char, vector<char>> graph;
        int n = words.size();

        for (auto& word : words) {
            for (auto& ch : word) {
                degree[ch] = 0;
        }

        for (int i = 0; i < n - 1; i++) {
         int l = min((int)words[i].size(), (int)words[i + 1].size());
         for (int j = 0; j < l; j++) {
            char x = words[i][j];
            char y = words[i + 1][j];
            if (x != y) {
               graph[x].push_back(y);
               degree[y]++;
               break;
            }
         }
      }
      
      string ret = "";
      queue<char> q;
      map<char, int>::iterator it = degree.begin();
      while (it != degree.end()) {
         if (it->second == 0) {
            q.push(it->first);
         }
         it++;
      }

      while (!q.empty()) {
         char x = q.front();
         q.pop();
         ret += x;
         vector<char>::iterator sit = graph[x].begin();
         while (sit != graph[x].end()) {
            degree[*sit]--;
            if (degree[*sit] == 0) {
               q.push(*sit);
            }
            sit++;
         }
      }
      return ret.size() == degree.size() ? ret : "";
      }
    }
};
