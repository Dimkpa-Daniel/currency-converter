import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import ConverterLogo from './assets/converterlogo.png'

// const endpoint = 'latest'
// const access_key = '0aGmcEb3fjGGrvVpsJxqMU0jwTzDDFa8';


const BASE_URL = 'https://open.er-api.com/v6/latest/USD'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // console.log(currencyOptions)
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  // console.log(exchangeRate);


  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }





  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        const secondCurrency = Object.keys(data.rates)[1]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(firstCurrency)
        setToCurrency(secondCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])


  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}$symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }

  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }


  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (

    <div className="overall">
      <div className="content">
        <img src={ConverterLogo} alt="" />
        <h2>CURRENCY CONVERTER</h2>
        <p>
          Perform your day-to-day currency conversion with our currency converter.
          If you have any questions or require our services, please let us know. Thank you.
        </p>
      </div>

      <div className='converter'>

        <div className="from">
          <h3>From</h3>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
          />
        </div>
        {/* <div className="equals">=</div> */}

        <div className="to">
          <h3>To</h3>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
          />
        </div>
      </ div>
    </div>
  );
}

export default App;
