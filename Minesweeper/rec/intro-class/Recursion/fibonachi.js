var fibArr = getFibonachiSequence(7);
console.log('fibArr', fibArr);
 
function getFibonachiSequence(n){
	var arr = [1, 1];
	for (var i = 2; i < n; i++){
		arr.push(arr[i-1] + arr[i-2]);
	}
	return arr;
}


var idx = 3;
var res = getFibonachiNum(idx)
console.log('Fib num', idx, res);

idx = 4;
var res = getFibonachiNum(idx)
console.log('Fib num', idx, res);

zz
function getFibonachiNum(n){
	if (n === 0 || n === 1) return 1;
	else {
		return getFibonachiNum(n - 1) + getFibonachiNum(n - 2);
	}
}


