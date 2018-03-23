import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderLinks(){
        if(this.props.authenticated){
            return(
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
                );
        }
        else{
            return[
                <div key={"nav"}>
                    <li className="nav-item" key={1}>
                        <Link className="nav-link" to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item" key={2}>
                        <Link className="nav-link" to="/signout">Sign Out</Link>
                    </li>
                </div>
            ];
        }
    }
    render(){
        console.log(this.props.authenticated);
        return(
            <nav className="navbar navbar-light bg-faded">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <div className="">
                    <ul className="navbar-nav">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Header);