function factorialNotRecursion(n){
    var sum = 1;
    for (var i = 1 ; i <=n ; i++){
        sum*= i;
    }
    return sum;
}

function factorial(n){
    if (n <= 1) return 1;
    return n* factorial(n-1);
}


debugger;
factorial(3);