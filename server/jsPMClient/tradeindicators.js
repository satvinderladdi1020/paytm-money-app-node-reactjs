const axios = require('axios');
const { SMA } = require('technicalindicators');

// Fetch historical stock data
async function getStockData(symbol) {
const response = await axios.get(`YOUR_STOCK_DATA_API/${symbol}`);
return response.data.closes; // Assuming the API returns an object with a 'closes' array
}

// Calculate Simple Moving Averages (SMA)
function calculateSMA(data, period) {
return SMA.calculate({ period, values: data });
}

// Generate buy/sell signals
function generateSignals(shortSMA, longSMA) {
const signals = [];
for (let i = 1; i < shortSMA.length; i++) {
if (shortSMA[i] > longSMA[i] && shortSMA[i - 1] <= longSMA[i - 1]) {
signals.push('BUY');
} else if (shortSMA[i] < longSMA[i] && shortSMA[i - 1] >= longSMA[i - 1]) {
signals.push('SELL');
} else {
signals.push('HOLD');
}
}
return signals;
}

// Main function to execute the strategy
async function main() {
const symbol = 'AAPL'; // Example stock symbol
const stockData = await getStockData(symbol);
const shortPeriod = 5; // Short period for SMA
const longPeriod = 20; // Long period for SMA

const shortSMA = calculateSMA(stockData, shortPeriod);
const longSMA = calculateSMA(stockData, longPeriod);

const signals = generateSignals(shortSMA, longSMA);
console.log(signals);
}

main();