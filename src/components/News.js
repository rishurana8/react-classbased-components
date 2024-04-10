import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
   constructor(){
        super();
        console.log('hi this is from constructor!');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
  }
  async componentDidMount(){
    //  yeh method render ke baad mai run hota hai 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }
   handlePrevClick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({articles: parsedData.articles});
       this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles
       })
  }
   handleNextClick = async()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        
    }else{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b74ac0d09949435cb22470e5f8274d8b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        // console.log(data);
        let parsedData = await data.json();
        console.log(parsedData);
        // this.setState({articles: parsedData.articles});
          this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles
          })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsFeeder - Top headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        {/* so what it will do is jab next last page pe hoga toh woh disable ho jaega */}
        </div>
      </div>
    );
  }
}

export default News;
