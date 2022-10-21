# @param {Integer} n
# @return {String[]}
def generate_parenthesis(n)
    parenthesis = []
    recurse(n, "", parenthesis, 0, 0)
    parenthesis
end

def recurse(n, pre, parenthesis, opens, closes)
    if (n * 2 == pre.length)
        parenthesis << pre
    else
        if closes < opens
             recurse(n, pre + ")", parenthesis, opens, closes + 1)
        end
        
        if opens < n
            recurse(n, pre + "(", parenthesis, opens + 1, closes)
        end
    end
end
