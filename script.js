function combinationSum(nums, target) {
    const memo = {};

    nums = nums.sort((a, b) => a - b).filter((num, index, arr) => index === 0 || num !== arr[index - 1]);

    function combinationSumHelper(target, startIndex) {
        if (target in memo) {
            return memo[target];
        }

        if (target === 0) {
            return [[]];
        }

        if (target < 0) {
            return [];
        }

        let result = [];

        for (let i = startIndex; i < nums.length; i++) {
            const currentNum = +nums[i].toFixed(1);
            const currentTarget = +(target - currentNum * factor).toFixed(1);

            const combinations = combinationSumHelper(currentTarget, i);

            for (let j = 0; j < combinations.length; j++) {
                combinations[j].push(currentNum);
                result.push(combinations[j]);
            }
        }

        memo[target] = result;
        return result;
    }

    const factor = 100; // Adjust this factor as needed
    const targetInt = target * factor;
    const result = combinationSumHelper(targetInt, 0);

    return result;
}

const generateButton = document.querySelector(".generate"),
	list = document.querySelector(".list"),
	target = document.querySelector(".target"),
	result = document.querySelector(".result");

generateButton.addEventListener("click", () => {
	document.querySelector(".result-h2").style.display = "block";
	const numbers = list.value.replaceAll("\n", "!").replaceAll(", ", "!").replaceAll(",", ".").replaceAll(" ", "").split("!").map(Number).filter(num => !Number.isNaN(num));
	let results = combinationSum(numbers, parseFloat(target.value)).filter(result => hasUniqueNumbers(result));
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
		const arrayString = JSON.stringify(array.sort());
		if (!arrayStrings.has(arrayString)) {
			uniqueArrays.push(array);
			arrayStrings.add(arrayString);
		}
	}

	return uniqueArrays;
}
