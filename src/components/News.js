import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps={
    country : 'in',
    pageSize : 3,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }


  defaultImageUrl = 'https://images.hindustantimes.com/img/2022/09/02/1600x900/d6849b9e-2ab0-11ed-9b13-2e13773bcef4_1662118296534.jpg';
  constructor() {
   // console.log('I am from constructor');
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }

  getData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
   // console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false 
    });
  }


  async componentDidMount() {
    await this.getData();
  //   //console.log('component did mount');
  //   let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=1&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //  // console.log(parsedData);
  //   this.setState({ 
  //     articles: parsedData.articles, 
  //     totalResults: parsedData.totalResults,
  //     loading:false 
  //   });
  }

  handlePreviousClick = async () => {
    this.setState({page: this.state.page - 1, loading: true});
    await this.getData();
    // //console.log('Handle previous click called');    
    // this.setState({loading : true});
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1, loading: true});
    await this.getData();
    //console.log('Handle Next click called');
    //debugger;
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // }
    // else {
    // }
    // this.setState({loading : true});
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6dcdadbc546a431c83ff219a0e73afb8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page + 1,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
  }


  render() {
   // console.log('I am from return');
    return (
      <div className="container">
        <h2 className="text-center my-3">News Monkey - Top Headline</h2>
        {this.state.loading && <Spinner/>}
        
          <div className="row">
            { !this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title?.slice(0, 40)} description={element.description?.slice(0, 80)}
                  imageUrl={!element.urlToImage ? this.defaultImageUrl : element.urlToImage} newsUrl={element.url}
                  author={element.author} date={new Date(element.publishedAt).toGMTString()} sourceName={element.source.name}
                />
              </div>
            })}
            
            <div className="container d-flex justify-content-between my-3">
              <button type="button" disabled={this.state.page <= 1} className="btn btn-danger" onClick={this.handlePreviousClick}>&laquo; Previous</button>
              <p><strong>Page No {this.state.page}/{Math.ceil(this.state.totalResults / this.props.pageSize)}</strong></p>
              <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} className="btn btn-danger" onClick={this.handleNextClick}>Next &raquo;</button>
            </div>
          </div>
      </div>
        
    );
  }
}

export default News;
