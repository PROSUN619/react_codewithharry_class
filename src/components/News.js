import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  render() {
    return (
      <div className="container">
        <h2>News Monkey - Top Headline</h2>
        <div className="row">
          <div className="col-md-4">
              <Newsitem title='my title' description = 'my description' />
          </div><div className="col-md-4">
              <Newsitem title='my title' description = 'my description' />
          </div>
          <div className="col-md-4">
              <Newsitem title='my title' description = 'my description' />
          </div>

        </div>
        
      </div>
    );
  }
}

export default News;
