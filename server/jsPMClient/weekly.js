const axios = require('axios');
// Replace with your preferred stock data API endpoint
const API_URL = 'https://www.alphavantage.co/query?function=';
const API_KEY = '86OF2WSYWBQNRPRP'; // Replace with your actual API key
// Fetch historical price data for a specific stock
async function fetchHistoricalData(symbol) {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`);
        console.log('response : ',response);
        return response.data['Weekly Time Series'];
    } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error;
    }
}

// Calculate Simple Moving Average (SMA)
function calculateSMA(data, period) {
    const dates = Object.keys(data).sort();
    const smaValues = {};

    for (let i = period - 1; i < dates.length; i++) {
        const currentDate = dates[i];
        const sum = Object.values(data).slice(i - period + 1, i + 1).reduce((acc, val) => acc + parseFloat(val['4. close']), 0);
        smaValues[currentDate] = sum / period;
    }

    return smaValues;
}

// Calculate Exponential Moving Average (EMA)
function calculateEMA(data, period) {
    const dates = Object.keys(data).sort();
    const emaValues = {};
    const multiplier = 2 / (period + 1);

    let ema = 0;
    for (let i = period - 1; i < dates.length; i++) {
        const currentDate = dates[i];
        if (i === period - 1) {
            ema = Object.values(data).slice(i - period + 1, i + 1).reduce((acc, val) => acc + parseFloat(val['4. close']), 0) / period;
        } else {
            ema = (parseFloat(data[currentDate]['4. close']) - ema) * multiplier + ema;
        }
        emaValues[currentDate] = ema;
    }

    return emaValues;
}

// Calculate Relative Strength Index (RSI)
function calculateRSI(data, period) {
    const dates = Object.keys(data).sort();
    const rsiValues = {};

    for (let i = period; i < dates.length; i++) {
        const currentDate = dates[i];
        const prevDate = dates[i - 1];
        const closePrice = parseFloat(data[currentDate]['4. close']);
        const prevClosePrice = parseFloat(data[prevDate]['4. close']);

        let gain = 0;
        let loss = 0;

        if (closePrice > prevClosePrice) {
            gain = closePrice - prevClosePrice;
        } else {
            loss = prevClosePrice - closePrice;
        }

        rsiValues[currentDate] = 100 - (100 / (1 + (gain / loss)));
    }

    return rsiValues;
}

// Analyze indicators to identify potential entry and exit points for trades
function analyzeIndicators(smaData, emaData, rsiData) {
    const dates = Object.keys(smaData).sort();
    const entryExitPoints = [];

    for (const date of dates) {
        const smaValue = smaData[date];
        const emaValue = emaData[date];
        const rsiValue = rsiData[date];

        // Example: Buy when SMA crosses above EMA and RSI is below 30 (oversold)
        // Sell when SMA crosses below EMA and RSI is above 70 (overbought)
        if (smaValue > emaValue && rsiValue < 30) {
            entryExitPoints.push({ date, action: 'Buy' });
        } else if (smaValue < emaValue && rsiValue > 70) {
            entryExitPoints.push({ date, action: 'Sell' });
        }
    }

    return entryExitPoints;
}

// Main function to fetch data, calculate indicators, and analyze entry/exit points
async function main() {
    const symbol = 'HAL';
    const historicalData = await fetchHistoricalData(symbol);
    const smaData = calculateSMA(historicalData, 20);
    const emaData = calculateEMA(historicalData, 20);
    const rsiData = calculateRSI(historicalData, 14);
   // console.log('historicalData : ',historicalData);
    console.log('smaData : ',smaData);
    console.log('emaData : ',emaData);
    console.log('rsiData : ',rsiData);
    const entryExitPoints = analyzeIndicators(smaData, emaData, rsiData);

    console.log('Entry/Exit Points:', entryExitPoints);
}

// Run the main function
main();
