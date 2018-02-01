import React, { Component } from 'react';
import './App.css';
import PubSub from 'pubsub-js';
import { Col, Card, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class NewPost extends Component{

        constructor(){
          super();
      }
        envia(event){
          event.preventDefault();
          console.log(this.title.value);
          const requestInfo = {
            method:'POST',
            body:JSON.stringify({title:this.title.value, body:this.body.value}),
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
                'Accept': 'application/json',
                'Content-type': "application/json"
            }),
        };

        fetch('http://127.0.0.1:8000/api/post/new',requestInfo)
            .then(response => {
                console.log(response)
                if(response.ok){
                    PubSub.publish('post-created', 'Post Created');
                    this.props.history.push('/timeline');
                } else {
                    this.setState({msg:'não foi possível enviar o post'});
                    console.log(response.text())
                }
            })
        }
    
        render(){
          return (
            <div>
            <h1 className="my-4">New Post
            </h1>
            <Form onSubmit={this.envia.bind(this)} method="post">
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col sm={10}>
                <input type="text" name="title" className="form-control" id="title" placeholder="Your Title" required ref={(input) => this.title = input} autoFocus />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="body" sm={2}>Body</Label>
              <Col sm={10}>
                <textarea className="form-control" name="body" id="body" ref={(input) => this.body = input} />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          </div>
          );
        }
    }