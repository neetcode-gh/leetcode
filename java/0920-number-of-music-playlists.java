class Solution {
    public int numMusicPlaylists(int n, int goal, int k) {
        map = new HashMap<>();
        return (int)findPlaylists(0, goal, n, k);
    }

    HashMap<Pair, Integer> map;
    int mod = 1000000007;

    public long findPlaylists(int old_songs, int goal, int n, int k) {
        if(goal == 0 && old_songs == n) {
            return 1;
        }

        if(goal == 0 || old_songs > n) {
            return 0;
        }

        if(map.containsKey(new Pair(old_songs, goal))) {
            return map.get(new Pair(old_songs, goal));
        }

        // chossing an new_song
        long res = ((n - old_songs) * (findPlaylists(old_songs + 1, goal - 1, n, k) % mod)) % mod;

        // choose an old_songs
        if(old_songs > k) {
            res = (res + ((old_songs - k) * (findPlaylists(old_songs, goal - 1, n, k)) % mod) % mod) % mod;
        }

        map.put(new Pair(old_songs, goal), (int)res);

        return res;
    }

    class Pair {
        int a;
        int b;

        public Pair(int a, int b) {
            this.a = a;
            this.b = b;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Pair pair = (Pair) obj;
            return a == pair.a && b == pair.b;
        }

        @Override
        public int hashCode() {
            return 31 * a + b;
        }
    }
}
