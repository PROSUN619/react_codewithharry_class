// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
 pageSize = 6; 
 apiKey = process.env.REACT_APP_NEWS_API;
 
 state = {
  progress : 0
 }

 setProgress = (progress) =>{
  this.setState({progress : progress});
 }

  render() {
    console.log('My api key is ' + this.apiKey);
    
    return (
      <div>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            {/* Since we are using same component in each route so it is necessary to use key
            to remount the component use key */}
            <Route path="/" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} category='general' country='in'/>} />
            <Route path="/business" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} category='business' country='in'/>} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} category='entertainment' country='in'/>} />
            <Route path="/general" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} category='general' country='in'/>} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} category='health' country='in'/>} />
            <Route path="/science" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} category='science' country='in'/>} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} category='sports' country='in'/>} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} category='technology' country='in'/>} />
          </Routes>
          
      </div>
      
    )
  }
}
