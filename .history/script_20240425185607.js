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


const nums = [2, 3, 6, 7];
const target = 7;
console.log("possible combinations are " ,
            combinationSum(nums, target));