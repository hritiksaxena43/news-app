import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)}-NewsApp`
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     }
        
    // }

    const fetchMoreData = async() => {
        // this.setState({
        //     page: this.state.page + 1,
        // })
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        setLoading(true)
        let data = await fetch(url)
        let parseData = await data.json()
        setArticles(parseData.articles)
        settotalResults(parseData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: this.state.articles.concat(parseData.articles),
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })
    }

    useEffect(() => {
      newsUpdate();
    },  [])
    

    // async componentDidMount() {
    //     // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true})
    //     // let data = await fetch(url)
    //     // let parseData = await data.json()
    //     // this.setState({
    //     //     articles: parseData.articles,
    //     //     totalResults: parseData.totalResults,
    //     //     loading: false
    //     // })
    //     this.newsUpdate();
    // }

    const newsUpdate = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(50)
        let parseData = await data.json()
        props.setProgress(70)
        setArticles(parseData.articles)
        settotalResults(parseData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })
        props.setProgress(100)

    }

    // const previouspage = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}`;
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url)
    //     // let parseData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parseData.articles,
    //     //     loading: false
    //     // })
    //     // this.setState({ page: this.state.page - 1 });
    //     setPage(page - 1)
    //     newsUpdate();
    // }

    // const nextpage = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     //     this.setState({ loading: true })
    //     //     let data = await fetch(url)
    //     //     let parseData = await data.json()
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parseData.articles,
    //     //         loading: false
    //     //     })
    //     // this.setState({ page: this.state.page + 1 });
    //     setPage(page + 1)
    //     newsUpdate();
    // }

        return (
            <>
                
                    <h1 style={{ textAlign: "center", margin: '30px 0px' }}>NewsApp-Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
                    {loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader= {loading && <Spinner />}
                    >   
                        <div className="container">

                        <div className="row">
                            {articles.map((elements) => {
                                return <div className="col my-2" key={elements.index}>
                                    <NewsItem title={elements.title ? elements.title.slice(0, 45) : ""} publishedAt={elements.publishedAt} author={elements.author ? elements.author : "Anonymous"} description={elements.description ? elements.description.slice(0, 83) : ""} imgUrl={elements.urlToImage} newsUrl={elements.url} />
                                </div>
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className="btn btn-primary" onClick={this.previouspage}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type='button' className="btn btn-primary" onClick={this.nextpage}>Next &rarr;</button>
                </div> */}
            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News