import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  defaultImageUrl = 'https://images.hindustantimes.com/img/2022/09/02/1600x900/d6849b9e-2ab0-11ed-9b13-2e13773bcef4_1662118296534.jpg';
  constructor() {
    console.log('I am from constructor');
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    console.log('component did mount');
    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=1&pageSize=3';
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
  }

  handlePreviousClick = async () => {
    //console.log('Handle previous click called');    
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=${this.state.page - 1}&pageSize=3`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ 
        articles: parsedData.articles,
        page: this.state.page - 1,
        totalResults: parsedData.totalResults
       });
  }

  handleNextClick = async () => {
    //console.log('Handle Next click called');
    debugger;
    if (this.state.page+1 > Math.ceil(this.state.totalResults/3)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=${this.state.page + 1}&pageSize=3`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ 
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalResults: parsedData.totalResults
      });
    }
  }


  render() {
    console.log('I am from return');
    return (
      <div className="container">
        <h2>News Monkey - Top Headline</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title?.slice(0, 20)} description={element.description?.slice(0, 40)}
                imageUrl={!element.urlToImage ? this.defaultImageUrl : element.urlToImage} newsUrl={element.url}
              />
            </div>
          })}
          <div className="container d-flex justify-content-between mb-3">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-danger" onClick={this.handlePreviousClick}>&laquo; Previous</button>
            Page No :- {this.state.page}
            <button type="button" disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/3))} className="btn btn-danger" onClick={this.handleNextClick}>Next &raquo;</button>
          </div>
        </div>        
      </div>
    );
  }
}

export default News;
