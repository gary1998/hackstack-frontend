import React from 'react';
import { Loading, ToastNotification } from 'carbon-components-react';
import { connect } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Splash from './pages/Splash';
import ManageEvents from './pages/ManageEvents';
import ManageRegistrations from './pages/ManageRegistrations';

class App extends React.Component {
  render(){
    return (
      <div className="App">
          {this.props.busy?<Loading description={"Loading, please wait..."} active={true} withOverlay={true}/>:<></>}
          <AppLayout >
            <HashRouter>
                <Route exact path="/" render={() => <Splash />}></Route>
                <Route exact path="/home" render={() => <Splash />}></Route>
                <Route path="/adminEvents" render={() => <ManageEvents />}></Route>
                <Route path="/adminRegistrations" render={() => <ManageRegistrations/>}></Route>
            </HashRouter>
          </AppLayout>
          {this.props.message?<div className="toast"><ToastNotification timeout={5000} kind={this.props.message.kind} caption={new Date().toLocaleString()} title={this.props.message.title} subtitle={<span>{this.props.message.text}</span>} /></div>:<></>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    busy: state.busy,
    message: state.message
  }
}

export default connect(mapStateToProps)(App);
