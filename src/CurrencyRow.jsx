import React from 'react'

const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount

  } = props
  return (
    <div>
        <input type="number" name="" id="" className='input' value={amount} onChange={onChangeAmount}/>  <br />
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
          ))}
         
        </select>
    </div>
  )
}

export default CurrencyRow