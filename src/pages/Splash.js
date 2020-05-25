import React from 'react';
import { loginUser, setBusy } from '../Actions';
import AppLayout from '../components/AppLayout';
import { connect } from 'react-redux';
import { Button, Modal, TextInput } from 'carbon-components-react';
import { Login32, Event32 } from '@carbon/icons-react';
class Splash extends React.Component {
    state = {
        loginModalShow: false,
        email: "",
        password: ""
    }

    _handleLoginBtn = () => {
        this.setState({loginModalShow: true});
    }

    _handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    _handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    _handleLoginSubmit = async() => {
        this.setState({loginModalShow: false, email: "", password: ""});
        await this.props.login(this.state.email, this.state.password);
    }

    render(){
        return(
            <div style={{textAlign: 'center'}}>
            <Modal 
                    open={this.state.loginModalShow}
                    primaryButtonText="Login"
                    secondaryButtonText="Close"
                    onRequestClose={() => this.setState({loginModalShow: false})}
                    onRequestSubmit={this._handleLoginSubmit}
                    onSecondarySubmit={() => this.setState({loginModalShow: false})}
                    disabled={true}
                >
                    <TextInput
                        id="email"
                        disabled={false}
                        labelText="Your Email:"
                        light={false}
                        placeholder="mark@example.com"
                        value={this.state.email}
                        type="text"
                        onChange={this._handleEmailChange}
                    />
                    <br/>
                    <TextInput
                        id="password"
                        disabled={false}
                        labelText="Your Password:"
                        light={false}
                        placeholder="**********"
                        value={this.state.password}
                        type="password"
                        onChange={this._handlePasswordChange}
                    />
                </Modal>
                <div style={{textAlign: 'center'}}>
                    <div>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/StackHack1.0%20Themes-021837f1c.png" alt="poster" width="30%"></img>
                    </div>
                    {
                        (this.props.user && this.props.user.isAdmin)?
                        <div style={{marginLeft: 'auto', marginRight: 'auto'}} className="bx--form__helper-text">Admin Priveleges: <strong>ACTIVATED</strong></div>:
                        <></>
                    }
                    <br />
                    {
                        !this.props.user?
                        <Button renderIcon={Login32} onClick={this._handleLoginBtn}>Login</Button>:
                        <Button renderIcon={Event32} href="#/adminRegistrations">Event Registration</Button>
                    }
                </div>
            </div>
        )   
    }
}

function mapStateToProps(state){
    return {
      busy: state.busy,
      user: state.user
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: async(email, password) => {
            dispatch(await setBusy());
            dispatch(await loginUser(email, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);