import React, { Component , contextTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

class Header extends Component {

  constructor (props, context) {
    super(props, context);

    this.state = {
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {

    let isHomepage = this.context.router.isActive('/', true);

    let brand =  <span><i className="fa fa-home fa-lg"></i></span>;


    return (
      <nav className={"mainNav navbar navbar-fixed-top bg-inverse"}>
        <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to="/">{brand}</Link>
          </div>
        </div>
        <ul className="nav navbar-nav  pull-xs-right">
        </ul>
        </div>
      </nav>
  );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {  })(Header);
