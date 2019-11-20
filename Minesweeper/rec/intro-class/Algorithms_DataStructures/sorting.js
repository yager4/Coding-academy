console.log('09-sorts');

// var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
var vals = getLargeArray();
 

console.time('array sort');
vals.sort(numsComperator);
console.timeEnd('array sort');

function numsComperator(num1, num2) {
    return num1 - num2;
}


function getLargeArray() {
    var res = [];
    for (var i = 0; i < 100000; i++) res.push(1000 - i);
    return res;
}

// O(N**2)
function bubbleSort(a) {
    var swapped = true;
    while (swapped) {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    }
}


function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    var middle = parseInt(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left,right);
}


// This function merges 2 sorted arrays into a single array
function merge(arr1, arr2) {
    var result = [];
    // while there are items in both arrays
    while (arr1.length && arr2.length) {
        // push the bigger
        if (arr1[0] <= arr2[0]) {
            result.push(arr1.shift());
        } else {
            result.push(arr2.shift());
        }
    }
    // Add the remaining items
    while (arr1.length) result.push(arr1.shift());
    while (arr2.length) result.push(arr2.shift());

    return result;
}

