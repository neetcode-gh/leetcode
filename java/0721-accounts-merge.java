import java.util.*;

class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        UnionFind uf = new UnionFind(accounts.size());
        HashMap<String, Integer> emailToAccount = new HashMap<>(); // email -> index of account

        for (int i = 0; i < accounts.size(); i++) {
            for (int j = 1; j < accounts.get(i).size(); j++) { // start at 1 because we only want to capture emails
                String email = accounts.get(i).get(j);
                if (emailToAccount.containsKey(email)) {
                    uf.union(i, emailToAccount.get(email));
                } else {
                    emailToAccount.put(email, i);
                }
            }
        }

        HashMap<Integer, List<String>> emailGroup = new HashMap<>(); // index of account -> list of emails
        for (String email : emailToAccount.keySet()) {
            int leader = uf.find(emailToAccount.get(email));
            if (!emailGroup.containsKey(leader)) {
                emailGroup.put(leader, new ArrayList<>());
            }
            emailGroup.get(leader).add(email);
        }

        List<List<String>> res = new ArrayList<>();
        for (int i : emailGroup.keySet()) {
            String name = accounts.get(i).get(0);
            List<String> info = new ArrayList<>();
            info.add(name);
            List<String> emails = emailGroup.get(i);
            Collections.sort(emails);
            info.addAll(emails);
            res.add(info);
        }
        return res;
    }
}

class UnionFind {
    int[] parent;
    int[] rank;

    public UnionFind(int n) {
        this.parent = new int[n+1];
        this.rank = new int[n+1];

        for (int i = 1; i < n + 1; i++) {
            this.parent[i] = i;
            this.rank[i] = 1;
        }
    }

    public int find(int n) {
        int p = this.parent[n];
        while (p != this.parent[p]) {
            this.parent[p] = this.parent[this.parent[p]]; // path compression
            p = this.parent[p];
        }
        return p;
    }

    public boolean union(int n1, int n2) {
        int p1 = find(n1);
        int p2 = find(n2);

        if (p1 == p2) {
            return false; // already connected
        }

        // union by rank
        if (this.rank[p1] > this.rank[p2]) {
            this.parent[p2] = p1;
        } else if (this.rank[p1] < this.rank[p2]) {
            this.parent[p1] = p2;
        } else {
            this.parent[p1] = p2;
            this.rank[p2] += this.rank[p1];
        }
        return true;
    }
}