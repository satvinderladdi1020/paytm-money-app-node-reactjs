const axios = require('axios'); // For making external API calls

// Replace with your preferred stock data API endpoint
const API_URL = 'https://www.alphavantage.co/query?function=';
const API_KEY = '86OF2WSYWBQNRPRP'; // Replace with your actual API key

// Indicators (replace with your chosen indicators)
const indicators = {
  SMA: 'SMA',
  EMA:'EMA', // Simple Moving Average
  RSI: 'RSI', // Relative Strength Index
  BBANDS:'BBANDS'
}

async function screenStock(symbol) {
  const url = `${API_URL}${indicators.SMA}&symbol=${symbol}&interval=weekly&time_period=7&series_type=open&apikey=${API_KEY}`;
  console.log('url', url);
  const smaResponse = await axios.get(url);
  const smaData = smaResponse.data; // Parse SMA data
  console.log('smaData', smaData);
  const _url = `${API_URL}${indicators.RSI}&symbol=${symbol}&interval=weekly&time_period=7&series_type=open&apikey=${API_KEY}`;
  console.log('_url', _url);
  const rsiResponse = await axios.get(_url);
  const rsiData = rsiResponse.data; // Parse RSI data

  console.log('rsiData', rsiData);

  const b_url = `${API_URL}${indicators.EMA}&symbol=${symbol}&interval=weekly&time_period=7&series_type=open&apikey=${API_KEY}`;
  console.log('b_url', b_url);
  const bbandsResponse = await axios.get(b_url);
  const emaData = bbandsResponse.data; // Parse RSI data


  console.log('emaData', emaData);

  const { buySignals, sellSignals } = generateSignals(smaData, emaData, rsiData);
  console.log('Buy Signals:', buySignals);
  console.log('Sell Signals:', sellSignals);
  


   // Placeholder for signals
}
// Function to generate buy and sell signals based on indicators
function generateSignals(smaData, emaData, rsiData) {
    const buySignals = [];
    const sellSignals = [];

    const dates = Object.keys(smaData);
    for (let i = 1; i < dates.length; i++) {
        const date = dates[i];
        const prevDate = dates[i - 1];

        // Check if SMA crossed above EMA
        const smaCrossedAboveEMA = smaData[date] > emaData[date] && smaData[prevDate] <= emaData[prevDate];

        // Check if SMA crossed below EMA
        const smaCrossedBelowEMA = smaData[date] < emaData[date] && smaData[prevDate] >= emaData[prevDate];

        // Check if RSI data is available for the current date
        if (rsiData[date]) {
            // Check if RSI value is below a certain threshold (e.g., 30) for oversold condition
            const isRSIOversold = parseFloat(rsiData[date]['RSI']) < 30;

            // Check if RSI value is above a certain threshold (e.g., 70) for overbought condition
            const isRSIOverbought = parseFloat(rsiData[date]['RSI']) > 70;

            if (smaCrossedAboveEMA && isRSIOversold) {
                buySignals.push({ date, price: parseFloat(smaData[date]) });
            } else if (smaCrossedBelowEMA && isRSIOverbought) {
                sellSignals.push({ date, price: parseFloat(smaData[date]) });
            }
        } else {
            console.log(`RSI data not available for date: ${date}`);
        }
    }

    return { buySignals, sellSignals };
}



// Example usage
screenStock('HAL').then(signals => {
    console.log('Buy signal detected for ITC', signals);
//   if (signals.buySignal) {
//     console.log('Buy signal detected for ITC');
//   } else if (signals.sellSignal) {
//     console.log('Sell signal detected for ITC');
//   } else {
//     console.log('No signals for ITC');
//   }
});
