
function factorial(n) {
    var fact = 1;
    for (var num = 2; num <= n; num++) {
        fact *= num;
    }
    return fact;
}

function factorialRecursion(n) {
   debugger
    if (n === 1) return 1;
    else return factorialRecursion(n - 1) * n;
}

var res = factorial(6);
console.log('res (loop): ', res);
res = factorialRecursion(6);
console.log('res (recursion): ', res);
