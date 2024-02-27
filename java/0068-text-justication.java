class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>(), line = new ArrayList<>();
        int len = 0;
        for(String word: words) {
            if(len + line.size() + word.length() > maxWidth) {
                int numSpaces = maxWidth - len, eq = numSpaces / Math.max(line.size() - 1, 1), rem = numSpaces % Math.max(line.size() - 1, 1);
                for(int i = 0; i < Math.max(1, line.size()-1); i++) {
                    line.set(i, line.get(i) + " ".repeat(eq));
                    if(rem > 0) {
                        line.set(i, line.get(i) + " ");
                        rem--;
                    }
                }
                String resLine = "";
                for(String w: line) resLine += w;
                res.add(resLine);
                line.clear();
                len = 0;
            }
            line.add(word);
            len += word.length();
        }
        String lastLine = "";
        for(int i = 0; i < line.size(); i++) {
            lastLine += line.get(i) + (i != line.size()-1? " ": "");
        }
        res.add(lastLine + " ".repeat(maxWidth - lastLine.length()));
        return res;
    }
}
