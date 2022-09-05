import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, sourceName} = this.props;
    return (
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="image"/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By - {!author ? 'Unknown' : author} On - {date}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%'}}>
          {sourceName}
          <span className="visually-hidden">unread messages</span>
        </span>
      </div>
    )
  }
}

export default Newsitem