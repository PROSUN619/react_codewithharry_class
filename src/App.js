// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress, setProgress] = useState(0)
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;


  return (
    <div>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      // onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        {/* Since we are using same component in each route so it is necessary to use key
            to remount the component use key */}
        <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} category='general' country='in' />} />
        <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category='business' country='in' />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category='entertainment' country='in' />} />
        <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} category='general' country='in' />} />
        <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} category='health' country='in' />} />
        <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} category='science' country='in' />} />
        <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} category='sports' country='in' />} />
        <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} category='technology' country='in' />} />
      </Routes>

    </div>

  )
}

export default App;