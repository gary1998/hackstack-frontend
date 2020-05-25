import React from 'react';
import {
  Link,
  HashRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Header,
  HeaderMenuButton,  
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  Content
} from "carbon-components-react/lib/components/UIShell";
import { Modal } from 'carbon-components-react';
import { Event20, Home20, Catalog20, Notebook20, User20 } from '@carbon/icons-react';
import { logoutUser, setBusy } from '../Actions';
 
class AppLayout extends React.Component {

  state = {
    sideNav: false,
    profileModalShow: false
  }

  _handleLogout = async() => {
    window.location.href = "/";
    await this.props.logout();
  }

  render(){
    return(
      <div className="container" >
        <HashRouter>
          <Header aria-label="Platform">
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={() => this.setState({sideNav: !this.state.sideNav})}
              isActive={this.state.sideNav}
            />
              <HeaderName href="#home" prefix="">
                StackHack v1
              </HeaderName>
            <HeaderGlobalBar>
              {
                this.props.user?
                <>
                  <HeaderGlobalAction onClick={() => this.setState({profileModalShow: true})} aria-label="User">
                    <User20 />
                  </HeaderGlobalAction>
                  <Modal 
                    open={this.state.profileModalShow}
                    primaryButtonText="Close"
                    secondaryButtonText="Logout"
                    onRequestClose={() => this.setState({profileModalShow: false})}
                    onRequestSubmit={() => this.setState({profileModalShow: false})}
                    onSecondarySubmit={this._handleLogout}
                  >
                    <>
                      <div style={{textAlign: 'center'}}>
                        Logged in as <strong>{this.props.user.email}</strong>
                      </div>
                    </>
                  </Modal>
                </>:
                <></>
              }
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" isRail={true} defaultExpanded={false} expanded={this.state.sideNav}>
              <SideNavItems>
                  <Link to="/home">
                    <SideNavLink renderIcon={Home20}>
                      Home
                    </SideNavLink>
                  </Link>
                  {
                    this.props.user?
                    !this.props.user.isAdmin?
                      <>
                        <SideNavLink href="#adminRegistrations" renderIcon={Event20}>
                          Event Registration
                        </SideNavLink>
                        <SideNavLink href="#adminEvents" renderIcon={Notebook20}>
                          All Events
                        </SideNavLink>
                      </>:
                      <>
                        <SideNavLink href="#adminEvents" renderIcon={Event20}>
                          Manage All Events
                        </SideNavLink>
                        <SideNavLink href="#adminRegistrations" renderIcon={Catalog20}>
                          Manage All Event Registrations
                        </SideNavLink>
                      </>:
                    <></>
                  }
              </SideNavItems>
            </SideNav>
          </Header>
        </HashRouter>
        <Content>
          {this.props.children}
        </Content>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    busy: state.busy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout: async() => {
          dispatch(await setBusy());
          dispatch(await logoutUser());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);