class Solution {
    public String convertToTitle(int columnNumber) {
        Map<Integer, Character> map = new HashMap<>();
        char c = 'A';

        for (int i = 1; i <= 26; i++) {
            map.put(i, c);
            c++;
        }

        StringBuilder res = new StringBuilder();

        while (columnNumber > 0) {
            int r = (columnNumber - 1) % 26;
            res.insert(0, map.get(r + 1));
            columnNumber = (columnNumber - 1) / 26;
        }

        return res.toString();
    }
}