import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, sourceName } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="image" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By - {!author ? 'Unknown' : author} On - {date}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
          </div>
          <div style={{display: 'flex', justifyContent: 'right', position: 'absolute', right: '0px'}}>
          <span className="badge rounded-pill bg-danger">
            {sourceName}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      </div>
      </div >

    )
  }
}

export default Newsitem