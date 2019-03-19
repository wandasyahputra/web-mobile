import React, { Component } from 'react'
import CurrencyInput from 'react-currency-input'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      denomination: [100000, 50000, 20000, 10000, 5000, 1000, 100, 50],
      fraction: [],
      left: 0,
      value: ''
    }
    this.handle = this.handle.bind(this)
  }

  handle(e) {
    console.log(e.key)
    console.log(e.target.value)
    const { denomination } = this.state
    if (e.key === 'Enter') {
      let temp = e.target.value
      temp = temp.replace('Rp', '')
      temp = temp.replace(/\./g, '')
      temp = temp.replace(',', '.')
      const fraction = []
      temp = parseFloat(temp)
      for (let i = 0; i < denomination.length; i += 1) {
        let count = 0
        while (temp >= denomination[i]) {
          temp -= denomination[i]
          count += 1
        }
        fraction.push(count)
      }
      console.log(fraction)
      window.temp = temp
      this.setState({ fraction, left: temp.toFixed(2), value: e.target.value })
    }
  }

  render() {
    const {
      fraction, denomination, left, value
    } = this.state
    return (
      <div className="App">
        <CurrencyInput
          decimalSeparator=","
          thousandSeparator="."
          prefix="Rp"
          onKeyUp={e => this.handle(e)}
          allowEmpty
          value={value}
        />
        <div>
          {value && (
          <div>
            {value}
            {' '}
=
          </div>
          )}
          <table>
            {fraction.length > 0
              && fraction.map((item, key) => {
                if (item > 0) {
                  return (
                    <tr>
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
        </div>
      </div>
    )
  }
}

export default App
