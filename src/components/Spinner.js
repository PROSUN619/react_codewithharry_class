import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src='Spinner.gif' alt='Loading...'  />
      </div>
    )
  }
} 

export default Spinner