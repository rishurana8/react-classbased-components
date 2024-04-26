import React, { useEffect , useState} from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom"

const News =(props)=> {
 const[articles,setArticles] = useState([]);
 const[loading,setLoading] = useState(true);
 const[page,setPage] = useState(1);
 const[totalResults,setTotalResults] = useState(0);
   const updateNews = async() =>{
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    setLoading(true);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
   const handlePrevClick = async()=>{
     setPage(page-1);
     updateNews();
  }
   const handleNextClick = async()=>{
    setPage(page+1);
    updateNews();
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  };


  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsFeeder - Top headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
        
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date = {element.publishedAt}/>
            </div>
        })}
         </div>
         </div>
        </InfiniteScroll>
       </>
    );

}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string,
}



export default News;
