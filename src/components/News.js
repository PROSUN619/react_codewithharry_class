import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totatResults, setTotatResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const defaultImageUrl = 'https://images.hindustantimes.com/img/2022/09/02/1600x900/d6849b9e-2ab0-11ed-9b13-2e13773bcef4_1662118296534.jpg';




  const getData = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotatResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
    props.setProgress(100);
  }

  useEffect(() => {
    getData();
    document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;
    // eslint-disable-next-line max-len
  }, [])


  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotatResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);

  }

  return (
    <>
      <h2 className="text-center" style={{marginTop: '70px'}}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headline</h2>
      {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totatResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {
               articles.map((element) => {
                return <div className="col-md-4 my-2" key={element.url}>
                  <Newsitem
                    title={element.title?.slice(0, 40)} description={element.description?.slice(0, 80)}
                    imageUrl={!element.urlToImage ? defaultImageUrl : element.urlToImage} newsUrl={element.url}
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

News.defaultProps = {
  country: 'in',
  pageSize: 3,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;


