import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import NewPost from './NewPost';
import Timeline from './Timeline';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(   
    <BrowserRouter>
        <Switch>
            <App>
                <Switch>            
                    <Route path="/timeline" component={Timeline}/>
                    <Route path="/post/new" component={NewPost}/>              
                </Switch>            
            </App>
            <Route exact path="/" component={Login} />
            <Route path="/logout" component={Logout} />
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
