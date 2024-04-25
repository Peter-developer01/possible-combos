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
        for (let i = start; i < nums.length; i++) {
            const num = nums[i];
            if (target - num >= 0) {
                for (const comb of dp(i, target - num)) {
                    res.push([num, ...comb]);
                }
            }
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
	const results = combinationSum(numbers, target.value);
})
