import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'; //, NavItem, NavLink
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        {/* <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light> */}
        <Navbar color="dark" className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3" >
          <Container>
            <img src={process.env.PUBLIC_URL + '/assets/wow-logo.png'} height="55" alt="logo"/>
            <NavbarBrand className="banner-text" tag={Link} to="/">World of Warcraft Character Info</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
