const validRate = (rate) => {
    const NUMBER_ZERO = 0;
    const NUMBER_SIX = 6;
    const rateInteger = Number.isInteger(rate);
    const rateNumbers = rate > NUMBER_ZERO && rate < NUMBER_SIX;

    return rateInteger && rateNumbers;
};

module.exports = validRate;