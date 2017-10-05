import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Header from './header';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#5B9BD5',
    },
    fontFamily: 'Lato',
    appBar: {
        height: 50,
    }
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    };
  }
    static childContextTypes= {
        muiTheme: React.PropTypes.object
    }

    getChildContext() {
    return {
        muiTheme:  muiTheme
    };
}


  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children && React.cloneElement(this.props.children, {})}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps, { })(App);
