export const stocks: StockType[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 190.00 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 179.55 },
 // { symbol: 'MSFT', name: 'Microsoft Corporation', currentPrice: 438.45 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', currentPrice: 201.34 },
 // { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 246.19 },
  { symbol: 'META', name: 'Meta Platforms Inc.', currentPrice: 467.21 },
 // { symbol: 'NVDA', name: 'NVIDIA Corporation', currentPrice: 129.38 },
  { symbol: 'NFLX', name: 'Netflix Inc.', currentPrice: 668.74 },
 // { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', currentPrice: 420.11 },
 // { symbol: 'JPM', name: 'JPMorgan Chase & Co.', currentPrice: 207.88 },
 // { symbol: 'V', name: 'Visa Inc.', currentPrice: 278.92 },
 // { symbol: 'JNJ', name: 'Johnson & Johnson', currentPrice: 162.30 },
 // { symbol: 'PG', name: 'Procter & Gamble Co.', currentPrice: 166.45 },
 // { symbol: 'DIS', name: 'The Walt Disney Company', currentPrice: 92.50 },
 // { symbol: 'INTC', name: 'Intel Corporation', currentPrice: 34.67 },
 // { symbol: 'KO', name: 'The Coca-Cola Company', currentPrice: 62.84 },
 // { symbol: 'PEP', name: 'PepsiCo Inc.', currentPrice: 169.33 },
 // { symbol: 'CSCO', name: 'Cisco Systems Inc.', currentPrice: 48.29 },
 // { symbol: 'XOM', name: 'Exxon Mobil Corporation', currentPrice: 112.09 },
 // { symbol: 'BAC', name: 'Bank of America Corporation', currentPrice: 38.40 }
];


export class StockType{
  symbol: string;
  name: string;
  currentPrice: number;
}
