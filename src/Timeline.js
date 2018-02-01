import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import { Link } from 'react-router-dom'
import Pusher from 'pusher-js';
import PubSub from 'pubsub-js';
import { Alert } from 'reactstrap';

export default class Timeline extends Component{
    constructor() {
        super();
        this.state = {
          posts:[], 
          msg:[],
          visible: false
        };
        
        this.onDismiss = this.onDismiss.bind(this);
        
      }
    
      onDismiss() {
        this.setState({ visible: false });
      }
    
      componentDidMount(){
        PubSub.subscribe('post-created', (msg) => this.setState({msg:msg, visible:true}));
        const requestInfo = {
          method:'GET',
          headers: new Headers({
              'Authorization': 'Bearer '+ localStorage.getItem('auth-token'),
              'Accept': 'application/json',
              'Content-type': "application/json"
          }),
      };
        fetch('http://127.0.0.1:8000/api/post', requestInfo)
        .then(response => response.json())
        .then(posts => {
            this.setState({posts:posts});
        });
    
      }
    
      componentWillMount(){
        Pusher.logToConsole = true;
        
        var pusher = new Pusher('729464d8a57c2ba5b519', {
          cluster: 'us2',
          encrypted: true
        });
        
        var channel = pusher.subscribe('my-channel');
        channel.bind('App\\Events\\HelloPusherEvent', (data) =>{
          this.setState({msg:data.message});
          this.componentDidMount();
          this.setState({visible:true});
          setInterval(() => {
            this.onDismiss();
          }, 5000);
        }).bind();
      }

    render(){

        return(
          
            <div>
              <h1 className="my-4">Bem vindo, 
                <small> {JSON.parse(localStorage.getItem('user')).success.name}</small>
              </h1>
              <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.state.msg}
              </Alert>
              {
                
                this.state.posts.map(post => <Post post={post} key={post.id}/>)
              }
              {/* Pagination */}
              <ul className="pagination justify-content-center mb-4">
                <li className="page-item">
                  <a className="page-link" href="/">← Older</a>
                </li>
                <li className="page-item disabled">
                  <a className="page-link" href="/">Newer →</a>
                </li>
              </ul>
            </div>
          
        );
    }

}