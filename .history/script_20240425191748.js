function combinationSum(nums, target) {
    const memo = {};

    // remove duplicates from the array
    nums = nums.sort((a, b) => a - b).filter((num, index, arr) => index === 0 || num !== arr[index - 1]);

    function dp(start, target) {
        if (memo[target]) {
            return memo[target];
        }
        if (target === 0) {
            return [[]];
        }
        if (target < 0) {
            return [];
        }
        const res = [];
		const used = [];
        for (let i = start; i < nums.length; i++) {
            const num = nums[i];
			console.log(used)
			if (used.includes(num)) continue;
            if (target - num >= 0) {
                for (const comb of dp(i, target - num)) {
                    res.push([num, ...comb]);
                }
            }
			used.push(num);
        }
        memo[target] = res;
        return res;
    }

    return dp(0, target);
}

const generateButton = document.querySelector(".generate"),
	list = document.querySelector(".list"),
	target = document.querySelector(".target"),
	result = document.querySelector(".result");

generateButton.addEventListener("click", () => {
	document.querySelector(".result-h2").style.display = "block";
	const numbers = list.value.replaceAll("\n", ", ").split(", ").map(Number).filter(num => !Number.isNaN(num));
	let results = combinationSum(numbers, target.value).filter(result => hasUniqueNumbers(result));
	results = removeNonUniqueArrays(results);
	results = results.map(result => `<li>${result.join(" + ")} = ${target.value}</li>`)
	result.innerHTML = results.join(" ");
});

function hasUniqueNumbers(arr) {
	return new Set(arr).size === arr.length;
}

function removeNonUniqueArrays(arrays) {
	const uniqueArrays = [];
	const arrayStrings = new Set();

	for (const array of arrays) {
		const arrayString = JSON.stringify(array);
		if (!arrayStrings.has(arrayString)) {
			uniqueArrays.push(array);
			arrayStrings.add(arrayString);
		}
	}

	return uniqueArrays;
}