class Solution {
  public boolean backspaceCompare(String s, String t) {
    return backspace(s).equals(backspace(t));
  }

  private String backspace(final String s) {
    StringBuilder sb = new StringBuilder();
    for (final char c : s.toCharArray())
      if (c != '#')
        sb.append(c);
      else if (sb.length() != 0)
        sb.deleteCharAt(sb.length() - 1);
    return sb.toString();
  }
}
