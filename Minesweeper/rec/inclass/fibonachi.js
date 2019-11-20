function fibonachiNonRecursion(n) {
    var fibo = [1, 1];

    for (var i = 2; i < n; i++) {
        fibo[i] = fibo[i - 1] + fibo[i - 2];
    }

    return fibo[n - 1];
}
fibonachiNonRecursion(5);

function fibonacci(n) {
    if (n <= 2) return 1;
   return  fibonacci(n - 1) + fibonacci(n - 2);
}
debugger;
fibonacci(4);