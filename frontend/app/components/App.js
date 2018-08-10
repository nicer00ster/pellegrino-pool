import React from 'react';
import Spinner from 'react-spinkit';

import Header from './Header';
import Footer from './Footer';
import { verifyToken, setToken } from '../utils/storage';
import { NotificationContainer } from 'react-notifications';
import { FiLogOut } from 'react-icons/fi';
import 'whatwg-fetch';

export default class App extends React.Component {
  state = {
    loading: false,
  }
  onLogout = () => {
    const value = verifyToken('app');
    if(value && value.token) {
      const { token } = value;
      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.success) {
          this.setState({ loading: true }, () => {
            setTimeout(() => {
              this.setState({ loading: false })
            }, 1500)
          })
        } else {
          this.setState({ loading: false })
        }
      })
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="root_wrapper">
        <NotificationContainer />
        <Header onLogout={this.onLogout.bind(this)}/>
        <main>
        {
          loading
          ? <Spinner color="white" fadeIn="quarter" name="cube-grid" />
          : this.props.children
        }
        </main>
        <Footer />
      </div>
    )
  }
};
