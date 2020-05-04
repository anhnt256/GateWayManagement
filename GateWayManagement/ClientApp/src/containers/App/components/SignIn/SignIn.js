import React from 'react';
import { Button, Input, message } from 'antd';
import { connect } from 'react-redux';

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userTwitterSignIn,
  userSignIn,
  checkUser,
} from '../../../../general/Auth/actions';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '../../../../components/CircularProgress/index';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  state = {
    username: '',
  };

  componentDidMount() {
    this.props.checkUser();
  }

  onChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = () => {
    const { username } = this.state;
    if (username !== '') {
      this.props.showAuthLoader();
      this.props.userSignIn(username);
    } else {
      message.error('Vui lòng nhập UserName trước khi sử dụng');
    }
  };

  render() {
    const { username } = this.state;
    const { showMessage, loader, alertMessage, userName } = this.props;
    if (userName !== '' && userName !== null) {
      return <Redirect to={'/main/dashboard/crypto'} />;
    }
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.signIn" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.bySigning" />
                </p>
                <p>
                  <IntlMessages id="app.userAuth.getAccount" />
                </p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require('assets/images/logo.png')} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <div className="gx-signin-form gx-form-row0">
                <Input placeholder="UserName" value={username} onChange={this.onChange} />
                <div style={{ marginTop: '15px' }}>
                  <span style={{ color: 'red' }}>
                    Vui lòng nhập đúng tài khoản đăng nhập. The GateWay sẽ trao thưởng thông qua tài khoản đã đăng ký.
                    Mọi khiếu nại về sai tài khoản sẽ không được xử lý. Xin cảm ơn.
                  </span>
                </div>
                <Button style={{ marginTop: '15px' }} type="primary" className="gx-mb-0" onClick={this.handleSubmit}>
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
              </div>
            </div>

            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : null}
            {showMessage ? message.error(alertMessage.toString()) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser, userName } = auth;
  return { loader, alertMessage, showMessage, authUser, userName };
};

export default connect(mapStateToProps, {
  userSignIn,
  checkUser,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn,
})(SignIn);
