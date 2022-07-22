def is_valid(s)
  paren = []
  match = {
    "{" => "}",
    "(" => ")",
    "[" => "]",
  }
  s.each_char do |char|
    if match.key?(char)
      paren << char
    else
      return false if paren.empty?
      return false if match[paren.pop] != char
    end
  end
  paren.empty?
end
