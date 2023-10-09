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
      next
    elsif paren.empty? || match[paren.pop] != char
      return false
    end
    paren.pop
  end
  paren.empty?
end
