const axios = require('axios');

// Function to fetch historical stock data from NSE API
async function fetchHistoricalData(symbol, startDate, endDate) {
    try {
        const response = await axios.get(`https://www.nseindia.com/api/historical/cm/equity?symbol=${symbol}`);
        console.log('response : ', response );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error;
    }
}

// Function to calculate simple moving average (SMA)
function calculateSMA(prices, period) {
    const smaValues = [];
    for (let i = period - 1; i < prices.length; i++) {
        const sum = prices.slice(i - period + 1, i + 1).reduce((acc, price) => acc + price.close, 0);
        const sma = sum / period;
        smaValues.push({ date: prices[i].date, value: sma });
    }
    return smaValues;
}

// Function to calculate Bollinger Bands
function calculateBollingerBands(prices, smaValues, period, deviation) {
    const bollingerBands = [];
    for (let i = period - 1; i < prices.length; i++) {
        const pricesSubset = prices.slice(i - period + 1, i + 1);
        const sum = pricesSubset.reduce((acc, price) => acc + Math.pow(price.close - smaValues[i - period + 1].value, 2), 0);
        const stddev = Math.sqrt(sum / period);
        const upperBand = smaValues[i - period + 1].value + (deviation * stddev);
        const lowerBand = smaValues[i - period + 1].value - (deviation * stddev);
        bollingerBands.push({ date: prices[i].date, upperBand, lowerBand });
    }
    return bollingerBands;
}

// Example usage
async function runAlgorithm() {
    const symbol = 'RELIANCE';
    const startDate = '2024-04-01';
    const endDate = '2024-04-36';
    const period = 20; // Period for moving average and Bollinger Bands
    const deviation = 2; // Number of standard deviations for Bollinger Bands

    try {
        // Fetch historical data
        const historicalData = await fetchHistoricalData(symbol, startDate, endDate);

        // Extract closing prices
        const closingPrices = historicalData.map(item => ({ date: item.TIMESTAMP, close: parseFloat(item.CLOSE) }));

        // Calculate SMA
        const smaValues = calculateSMA(closingPrices, period);

        // Calculate Bollinger Bands
        const bollingerBands = calculateBollingerBands(closingPrices, smaValues, period, deviation);

        // Example output
        console.log('Simple Moving Averages:');
        console.table(smaValues);
        console.log('Bollinger Bands:');
        console.table(bollingerBands);
    } catch (error) {
        console.error('Error running algorithm:', error);
    }
}

// Run the algorithm
runAlgorithm();
