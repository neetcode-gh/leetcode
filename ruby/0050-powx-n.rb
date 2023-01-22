
def my_pow(x, n)
    solution = multiply(x, n.abs)

    if n>=0
        return solution
    else
        return (1/solution)

    end
end


def multiply(x,n)
    return 0 if x==0
    return 1 if n==0
    result = multiply((x*x),n/2)
    if (n%2 ==1)
        return (x * result)
    else
        return result
    end
end