import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

export default class App extends Component {

  render() {
    return (
      <div>
        <p> Bem vindo, {JSON.parse(localStorage.getItem('user')).success.name} </p>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">Start Bootstrap</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/timeline">Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Services</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Sair</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
        {/* Page Content */}
        <div className="container">
        <div className="row">
            {/* Blog Entries Column */}
            
            <div className="col-md-8">
              
              {this.props.children}
            </div>
            {/* Sidebar Widgets Column */}
            <div className="col-md-4">
              {/* Search Widget */}
              <div className="card my-4">
                <h5 className="card-header">Search</h5>
                <div className="card-body">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button">Go!</button>
                    </span>
                  </div>
                </div>
              </div>
              {/* Categories Widget */}
              <div className="card my-4">
                <h5 className="card-header">Categories</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="/">Web Design</a>
                        </li>
                        <li>
                          <a href="/">HTML</a>
                        </li>
                        <li>
                          <a href="/">Freebies</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="/">JavaScript</a>
                        </li>
                        <li>
                          <a href="/">CSS</a>
                        </li>
                        <li>
                          <a href="/">Tutorials</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Side Widget */}
              <div className="card my-4">
                <h5 className="card-header">Side Widget</h5>
                <div className="card-body">
                <Link to="/post/new"> New Post </Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        {/* /.container */}
        {/* Footer */}
        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">Copyright © Your Website 2018</p>
          </div>
          {/* /.container */}
        </footer>
        {/* Bootstrap core JavaScript */}
        
      </div>
        
    );
  }
}




