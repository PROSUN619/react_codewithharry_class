import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 3,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //apiKey = '39c2a666d3ed4d2fba719c84a8ed178f'; //hotmail
  //apiKey = '6dcdadbc546a431c83ff219a0e73afb8'; //gmail

  defaultImageUrl = 'https://images.hindustantimes.com/img/2022/09/02/1600x900/d6849b9e-2ab0-11ed-9b13-2e13773bcef4_1662118296534.jpg';
  constructor(props) {
    // console.log('I am from constructor');
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 0,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(props.category)} - News Monkey`
  }

  getData = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //debugger
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page + 1
    });
    this.props.setProgress(100);
  }


  async componentDidMount() {
    await this.getData();
  }

  fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //debugger
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page + 1
    });

  }



  render() {

    return (
      <>
        <h2 className="text-center">News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headline</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {
                this.state.articles.map((element) => {
                  return <div className="col-md-4 my-2" key={element.url}>
                    <Newsitem
                      title={element.title?.slice(0, 40)} description={element.description?.slice(0, 80)}
                      imageUrl={!element.urlToImage ? this.defaultImageUrl : element.urlToImage} newsUrl={element.url}
                      author={element.author} date={new Date(element.publishedAt).toGMTString()} sourceName={element.source.name}
                    />
                  </div>
                })
              }
            </div>
          </div>
        </InfiniteScroll>
      </>

    );
  }
}

export default News;
