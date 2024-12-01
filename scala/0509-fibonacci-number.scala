object Solution {
    var gen: Boolean = false;
    var fibonacci = List(0,1)
    def fib(n: Int): Int = {
        generate
        fibonacci(n)
    }
    
    def generate = {
        if(!gen){
            gen = true
            List.range(2, 31).map(x =>
                fibonacci = fibonacci :+ fibonacci(x-1) + fibonacci(x-2)
            )
        }
    }
}
