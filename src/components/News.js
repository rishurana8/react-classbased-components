import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
   constructor(){
        super();
        console.log('hi this is from constructor!');
        this.state = {
            articles: [],
            loading: false
        }
  }
  async componentDidMount(){
    //  yeh method render ke baad mai run hota hai 
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b74ac0d09949435cb22470e5f8274d8b";
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles});
  }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsFeeder - Top headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
      </div>
    );
  }
}

export default News;
