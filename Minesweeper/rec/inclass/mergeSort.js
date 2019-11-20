debugger;
var sorted = mergeSort([7,3,6,1,2]);

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    var middlePoint = Math.floor(arr.length / 2);
    var leftArray = arr.splice(0 , middlePoint);
    var rightArray = arr;
   
    leftArray = mergeSort (leftArray)
    rightArray = mergeSort (rightArray);

    return mergeArrays(leftArray , rightArray);
}

function mergeArrays(leftArray , rightArray){
    var sortedArray = [];
    while (leftArray.length && rightArray.length){
        if (leftArray[0] < rightArray[0]){
            sortedArray.push(leftArray[0]);
            leftArray.shift();
        }
        else{
            sortedArray.push(rightArray[0]);
            rightArray.shift();
        }
    }

   return  sortedArray.concat(rightArray , leftArray);
}