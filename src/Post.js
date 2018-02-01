import React, { Component } from 'react';
import Moment from 'moment';


export default class Post extends Component {
    render (){
        return (
            <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{this.props.post.title}</h2>
              <p className="card-text">{this.props.post.body}</p>
              <a href="#" className="btn btn-primary">Read More →</a>
            </div>
            <div className="card-footer text-muted">
              Posted on {Moment(this.props.post.created_at).format('lll')} by
              <a href="#"> {JSON.parse(localStorage.getItem('user')).success.name ===  this.props.post.user.name ? 'Você' : this.props.post.user.name }</a>
            </div>
          </div>

        );
    }
}