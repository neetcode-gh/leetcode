class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        DSU dsu = new DSU(n);

        Map<String, Integer> map = new HashMap<>();  // email -> index of acc

        for(int i = 0; i < n; i++){
            for(int j = 1; j < accounts.get(i).size(); j++){
                String email = accounts.get(i).get(j);
                String name = accounts.get(i).get(0);

                if(!map.containsKey(email))
                    map.put(email, i);
                else
                    dsu.union(i, map.get(email)); 
            }
        }

        Map<Integer, List<String>> merged = new HashMap<>();  // index of acc -> list of emails
        for(String email : map.keySet()){
            int group = map.get(email);
            int lead = dsu.find(group);
            
            if(!merged.containsKey(lead))
                merged.put(lead, new ArrayList<String>());

            merged.get(lead).add(email);    
        }

        List<List<String>> res = new ArrayList<>();  
        for(int ac : merged.keySet()){
            List<String> grp = merged.get(ac);
            Collections.sort(grp);
            grp.add(0, accounts.get(ac).get(0));
            res.add(grp);
        }
        return res;
    }
}

class DSU {
    int[] parent;
    int[] rank;

    public DSU(int size) {
        rank = new int[size];
        parent = new int[size];
        for (int i = 0; i < size; i++)
            parent[i] = i;
    }

    public int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    // Union By Rank

    public boolean union(int x, int y) {
        int xr = find(x), yr = find(y);
        if (xr == yr) {
            return false;
        } else if (rank[xr] < rank[yr]) {
            parent[xr] = yr;
        } else if (rank[xr] > rank[yr]) {
            parent[yr] = xr;
        } else {
            parent[yr] = xr;
            rank[xr]++;
        }
        return true;
    }
}
