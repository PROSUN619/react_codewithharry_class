import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  defaultImageUrl = 'https://images.hindustantimes.com/img/2022/09/02/1600x900/d6849b9e-2ab0-11ed-9b13-2e13773bcef4_1662118296534.jpg';
  constructor() {
    console.log('I am from constructor');
    super();
    this.state = {
      articles: [],
      loading :false
    }
  }

  async componentDidMount(){
    console.log('component did mount');
    let url =  'https://newsapi.org/v2/top-headlines?country=in&apiKey=6dcdadbc546a431c83ff219a0e73afb8';
    let data = await fetch(url);
    let parsedData = await data.json(); 
    console.log(parsedData);
    this.setState({articles : parsedData.articles});
  }

  render() {
    console.log('I am from return');
    return (
      <div className="container">
        <h2>News Monkey - Top Headline</h2>
        <div className="row">
        {this.state.articles.map((element) => {
           return  <div className="col-md-4" key={element.url}>
            <Newsitem
              title={element.title?.slice(0,20)} description={element.description?.slice(0,40)} 
              imageUrl={!element.urlToImage ? this.defaultImageUrl : element.urlToImage} newsUrl = {element.url}
            />
          </div>
        })}          
        </div>
      </div>
    );
  }
}

export default News;
