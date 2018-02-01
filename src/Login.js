import React, { Component } from 'react';

class Login extends Component {

    constructor(){
        super();
        this.state = {msg:''};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email:this.login.value, password:this.senha.value}),
            headers: new Headers({
                'Authorization': 'Bearer 6WbQpBsp2EnGt5HwF4QEOWsQfxssl88dKa09fmG2',
                'Accept': 'application/json',
                'Content-type': "application/json"
            }),
        };

        fetch('http://127.0.0.1:8000/api/login',requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                } else {
                    this.setState({msg:'não foi possível fazer o login'});
                    console.log(response.text())
                }
            })
            .then(token => {
                if (token !== undefined){
                  const tokenizer = JSON.parse(token);
                  const requestInfo = {
                      method:'POST',
                      body:JSON.stringify({email:this.login.value, password:this.senha.value}),
                      headers: new Headers({
                          'Authorization': 'Bearer '+ tokenizer.success.token,
                          'Accept': 'application/json',
                          'Content-type': "application/json"
                      }),
                  };
                  localStorage.setItem('auth-token', tokenizer.success.token);
                  fetch('http://127.0.0.1:8000/api/details',requestInfo)
                  .then(response => {
                      if(response.ok){
                          return response.text();
                      } else {
                          this.setState({msg:'não foi possível fazer o login'});
                          console.log(response.text());
                      }
                  })
                  .then(details => {
                    localStorage.setItem('user', details);
                  })
                  
                  this.props.history.push('/blog');
                }
            })
            
    }

  render() {
    return (
      <div className="container">
        <form className="form-horizontal" onSubmit={this.envia.bind(this)}>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h2>Please Login</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="form-group has-danger">
                <label className="sr-only" htmlFor="email">E-Mail Address</label>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at" /></div>
                  <input type="text" name="email" className="form-control" id="email" placeholder="you@example.com" required ref={(input) => this.login = input} autoFocus />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-control-feedback">
                <span className="text-danger align-middle">
                  <i className="fa fa-close" /> {this.state.msg}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="form-group">
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key" /></div>
                  <input type="password" name="password" className="form-control" id="password" placeholder="Password" ref={(input) => this.senha = input} required />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-control-feedback">
                <span className="text-danger align-middle">
                  {/* Put password error message here */}    
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6" style={{paddingTop: '.35rem'}}>
              <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                <label className="form-check-label">
                  <input className="form-check-input" name="remember" type="checkbox" />
                  <span style={{paddingBottom: '.15rem'}}>Remember me</span>
                </label>
              </div>
            </div>
          </div>
          <div className="row" style={{paddingTop: '1rem'}}>
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success"><i className="fa fa-sign-in" /> Login</button>
              <a className="btn btn-link" href="/password/reset">Forgot Your Password?</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
