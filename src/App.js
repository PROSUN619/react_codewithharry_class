// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
 pageSize = 6; 

  render() {
    return (
      <div>
          <Navbar/>
          <Routes>
            {/* Since we are using same component in each route so it is necessary to use key
            to remount the component use key */}
            <Route path="/" element={<News key="general" pageSize={this.pageSize} category='general' country='in'/>} />
            <Route path="/business" element={<News  key="business" pageSize={this.pageSize} category='business' country='in'/>} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} category='entertainment' country='in'/>} />
            <Route path="/general" element={<News key="general" pageSize={this.pageSize} category='general' country='in'/>} />
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} category='health' country='in'/>} />
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} category='science' country='in'/>} />
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} category='sports' country='in'/>} />
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} category='technology' country='in'/>} />
          </Routes>
          
      </div>
      
    )
  }
}
