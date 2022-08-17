import React from 'react'

export default function NewsItem (props) {
        let { title, description, imgUrl, newsUrl, publishedAt, author } = props;
        return (
            <div style={{textAlign: '-webkit-center'}}>
                <div className="card border-warning mb-3" style={{ width: "18rem" }}>
                    <img src={imgUrl ? imgUrl : "https://www.precintia.com/wp-content/uploads/2018/06/etiquetas-void.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">By {author} Updated at {new Date(publishedAt).toGMTString()}</p>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        )

}
