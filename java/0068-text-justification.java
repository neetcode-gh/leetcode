class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        int count = 0;
        List<String> currLine = new ArrayList<>();
        List<String> ans = new ArrayList<>();
        for (String w : words) {
            if (count == 0) {
                count += w.length();
                currLine.add(w);
            } else if (count + 1 + w.length() > maxWidth) {
                ans.add(getLine(currLine, count, maxWidth));
                currLine = new ArrayList<>(List.of(w));
                count = w.length();
            } else {
                count += 1 + w.length();
                currLine.add(w);
            }
        }
        ans.add(getLastLine(currLine, maxWidth));
        return ans;
    }

    private String getLine(List<String> words, int count, int maxWidth) {
        if (words.size() == 0) return "";
        if (words.size() == 1) return words.get(0) + " ".repeat(maxWidth - words.get(0).length());
        int extraSpaces = (maxWidth - count) / (words.size() - 1);
        int remSpaces = (maxWidth - count) % (words.size() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.size() - 1; i++) {
            sb.append(words.get(i)).append(" ");
            sb.append(" ".repeat(extraSpaces));
            if (remSpaces-- > 0)
                sb.append(" ");
        }
        sb.append(words.getLast());
        return sb.toString();
    }

    private String getLastLine(List<String> words, int maxWidth) {
        String wordsStr = String.join(" ", words);
        return wordsStr.toString() + " ".repeat(maxWidth - wordsStr.length());
    }
}
