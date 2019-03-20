import React, { Component } from 'react'
import CurrencyInput from 'react-currency-input'
import logo from './assets/img/logo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      denomination: [100000, 50000, 20000, 10000, 5000, 1000, 100, 50],
      fraction: [],
      left: 0,
      value: 0,
      error: ''
    }
  }

  /**
   * fracting value and assign to state
   */
  fraction = () => {
    const { denomination } = this.state
      let { value } = this.state
      const fraction = []
      if (value !== 0) {
        /**
         * check how much in every denomination
         * and push into fraction array
         */
        for (let i = 0; i < denomination.length; i += 1) {
          let count = 0
          while (value >= denomination[i]) {
            value -= denomination[i]
            count += 1
          }
          fraction.push(count)
        }
        this.setState({ fraction, left: value })
      } else {
        this.setState({
          error: "value can't be zero",
          left: 0,
          fraction: []
        })
      }
  }

   /**
   * process keyUp event
   * @param e = event of input
   */
  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.fraction()
    }
  }

  /**
   * assign value of input to state
   * @param event = event of input
   * @param maskedvalue = value with Prefix and thousandSeparator
   * @param floatvalue = value in float 
   */
  handleChange = (event, maskedvalue, floatvalue) => {
    this.setState({value: floatvalue, error: '' })
  }

  /**
   * handle reset button
   */
   handleReset = () => {
     this.setState({
       value: '',
       left: 0,
       fraction: []
    })
   }

  render() {
    const {
      fraction, denomination, left, value, error
    } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img className="header-logo" src={logo} alt='' />
        </div>
        <CurrencyInput
          className="fractionInput"
          decimalSeparator=","
          thousandSeparator="."
          prefix="Rp"
          precision="0"
          onChangeEvent={this.handleChange}
          onKeyUp={this.handleKeyUp}
          allowEmpty
          value={value}
        />
        <div>
          <button onClick={this.fraction}>
            Calculate
          </button>
          <button onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <div>
          <table>
            <tbody>
              {fraction.length > 0
                && fraction.map((item, key) => {
                  if (item > 0) {
                    return (
                      <tr key={key.toString()}>
                        <td>{item}</td>
                        <td> x </td>
                        <td> Rp</td>
                        <td>{denomination[key]}</td>
                      </tr>
                    )
                  }
                  return null
                })
              }
            </tbody>
          </table>
          {left > 0 && (
          <div>
            Left Rp
            &nbsp;
            {left}
            &nbsp;
            no available fraction
          </div>
          )}
          {error !== '' && (
            <div> {error} </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
