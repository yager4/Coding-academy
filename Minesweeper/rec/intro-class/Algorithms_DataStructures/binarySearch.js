console.log('09-sorts');

var list = [2, 5, 8, 9, 13, 45, 67, 99];

console.log(binarySearch(list, 8)) // 7 -> returns the index of the item
console.log(binarySearchRecursion(list, 8, 0, list.length - 1)) // 7 -> returns the index of the item

// values is a sorted array
function binarySearch(values, value) {
    // initial values for start, middle and end
    var leftIdx = 0
    var rightIdx = values.length - 1
    var middleIdx = Math.floor((leftIdx + rightIdx) / 2)

    // While the middle is not what we're looking for and the list does not have a single item
    while (leftIdx < rightIdx) {
        if (values[middleIdx] === value) return middleIdx;

        if (value < values[middleIdx]) {
            rightIdx = middleIdx - 1
        } else {
            leftIdx = middleIdx + 1
        }

        // recalculate middle on every iteration
        middleIdx = Math.floor((leftIdx + rightIdx) / 2)
    }
    return -1;
}


function binarySearchRecursion(items, item, left, right) {
    if (left > right) {
        return -1;
    }
    var middle = Math.floor((right + left) / 2);
    if (items[middle] === item) {
        return middle;
    } else if (items[middle] > item) {
        return binarySearchRecursion(items, item, left, middle - 1);
    } else {
        return binarySearchRecursion(items, item, middle + 1, right);
    }
}


function myFind(values, value) {
    for (let i = 0; i < values.length; i++) {
        if(value === values[i]) return i
    }
    return -1;
}