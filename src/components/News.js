import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom"

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
     country: PropTypes.string,
     pageSize: PropTypes.number,
     category: PropTypes.string,
  }
   constructor(props){
        super(props);
        console.log('hi this is from constructor!');
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        document.title = this.props.category;
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading: false});
  }
  async componentDidMount(){ 
    this.updateNews();
  }
   handlePrevClick = async()=>{
     this.setState({page: this.state.page-1});
     this.updateNews();
  }
   handleNextClick = async()=>{
    this.setState({page: this.state.page+1});
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      { articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading:false,
      }
    );
  };


  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsFeeder - Top headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date = {element.publishedAt}/>
            </div>
        })}
         </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
