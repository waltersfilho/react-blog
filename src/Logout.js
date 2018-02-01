import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount(){
        const requestInfo = {
            method:'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+ localStorage.getItem('auth-token'),
                'Accept': 'application/json',
                'Content-type': "application/json"
            }),
        };
        fetch('http://127.0.0.1:8000/api/logout', requestInfo)
            .then(response => {
                if(response.ok){
                    localStorage.removeItem('user');
                    localStorage.removeItem('auth-token');
                    this.props.history.push('/');
                    return response.text();
                } else {
                    this.setState({msg:'não foi possível fazer o logout'});
                    console.log(response.text())
                }
            })

        
    }
    
    render(){
        return null;
    }
}