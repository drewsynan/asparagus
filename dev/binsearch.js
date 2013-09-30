// Discard all values with fitness = 0 (inverse function must be unique, 0 will create multiple
// inverse cdf values for a single point)
// use cdf as a key (since it will be unique)
// binary search on the keys
// return item having the matching key 

/*
//check for hist
	// [{_id: val}]
	var hist;
	var inputSum = 0;
	for (index in inputArray) {
		inputSum = inputSum + inputArray[i]
	}

	if (inputSum == 1) {
		hist = inputArray.sort();
	} else {
		for (index in inputArray) {
			hist.push(inputArray[index]/inputSum);
		}
	}
*/


function binarySearch(hist, searchValue) {
	hist.sort();

	//console.log("-------------");
	len = hist.length;
	//console.log(len);

	if(len == 1) {
		//console.log("FOUND");
		//console.log(hist[0]);
		return hist[0];
	}

	pivot = Math.floor((hist.length)/2);
	//console.log("pivot");
	//console.log(pivot);

	leftHalf = hist.slice(0,pivot);
	rightHalf = hist.slice(pivot,hist.length);

	//console.log("LEFT");
	//console.log(leftHalf);
	//console.log("RIGHT");
	//console.log(rightHalf);

	var returnVal;
	if(searchValue > hist[pivot-1]) {
		//console.log("GOING RIGHT");
		returnVal = binarySearch(rightHalf, searchValue);

	} else {
		//console.log("GOING LEFT");
		returnVal = binarySearch(leftHalf, searchValue);
	}

	return returnVal;
}

var test = [0.2, 0.5, 1, 0.7, 0.9, 0.96];
var t2 = binarySearch(test, 0);
console.log("FOUND");
console.log(t2);

//[0.9, 0.96, 1] -> [0.9] [0.96,1]
