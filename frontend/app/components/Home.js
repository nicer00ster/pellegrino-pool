import React from 'react';
import Spinner from 'react-spinkit';
import Modal from 'react-modal';
import { verifyToken, setToken } from '../utils/storage';
import { titleCase } from '../utils/helpers';
import { FiLogOut, FiXSquare } from 'react-icons/fi';
import { NotificationManager } from 'react-notifications';
import 'whatwg-fetch';

import Register from './Register';
import Login from './Login';

Modal.setAppElement('#app');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      loading: true,
      token: '',
      name: '',
      error: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gameTitle: '',
      modalOpen: false,
      opponent: 'Player Two',
      users: null
    };
  }

  componentDidMount() {
    const value = verifyToken('app');
    if(value && value.token) {
      const { token } = value;
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(data => {
          if(data.success) {
            this.setState({
              token,
              loading: false,
              name: data.firstName,
              email: data.email
            })
          } else {
            this.setState({ loading: false })
          }
        })
    } else {
      this.setState({ loading: false })
    };
  };

  createNotification = () => {
    const { error } = this.state;
    return () => NotificationManager.error(this.state.error, 'Uh oh... 😭', 2000)
  };

  handleError = error => this.setState({ error });
  handleUser = (token, name) => this.setState({ token, name });
  handleLoad = () => this.setState({ loading: !this.state.loading });
  handleEmail = e => this.setState({ email: e.target.value });
  handlePassword = e => this.setState({ password: e.target.value });
  handleFirstName = e => this.setState({ firstName: titleCase(e.target.value) });
  handleLastName = e => this.setState({ lastName: titleCase(e.target.value) });
  handleGameTitle = e => this.setState({ gameTitle: e.target.value });

  openModal = () => this.setState({ modalOpen: true });
  afterOpenModal = () => this.populateUsers();
  closeModal = () => this.setState({ modalOpen: false, users: '' });

  onLogin = () => {
    const { email, password } = this.state;
    fetch('/api/account/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        this.handleError(data.error)
        this.createNotification()()
      }
      if(data.success) {
        setToken('app', { token: data.token })
        this.handleLoad()
        this.handleUser(data.token, data.name)
        setTimeout(() => {
          this.handleLoad()
        }, 1250);
      }
    })
  };

  onRegister = () => {
    const { firstName, lastName, email, password } = this.state;
    fetch('/api/account/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setToken('app', { token: data.token })
        this.handleLoad()
        setTimeout(async () => {
          await this.handleLoad()
          await this.onLogin()
          await this.props.history.push('/')
          await window.location.reload()
        }, 1500)
      }
      if(data.error) {
        this.handleError(data.error)
        this.createNotification()()
      }
    })
  }

  populateUsers = () => {
    fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      let users = [];
      for(let user in data) {
        users.push(data[user]);
      }
      this.setState({ users })
    })
  }

  createGame = e => {
    const { gameTitle, email, opponent } = this.state;
    e.preventDefault();
    fetch('/api/game/create', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        owner: email,
        title: gameTitle,
        email,
        opponent
      })
    })
    .then(() => {
      this.closeModal();
    });
  };

  render() {
    const { loading, token, name, users, opponent } = this.state;
    if(loading) {
      return <Spinner color="white" fadeIn="quarter" name="cube-grid" />
    }
    if(this.props.location.pathname === '/register') {
      return <Register
        history={this.props.history}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleFirstName={this.handleFirstName}
        handleLastName={this.handleLastName}
        onLogin={this.onLogin}
        onRegister={this.onRegister} />
    }
    if(!token) {
      return <Login
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        onLogin={this.onLogin} />
    }
    return (
      <React.Fragment>
        <h4>
          WELCOME, {name.toUpperCase()}.
        </h4>
        <h1>PELLEGRINO & POOL</h1>
        <button onClick={this.openModal}>START NEW GAME!</button>
        <Modal
          className="modal"
          overlayClassName="modal__overlay"
          shouldCloseOnOverlayClick={true}
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={250}
          contentLabel="Create a Game">
          <h2 ref={subtitle => this.subtitle = subtitle}>CREATE A GAME</h2>
          <input onChange={e => this.handleGameTitle(e)} type="text" placeholder="Match Title"/>
          <form className="modal__players">
            <h4>CHOOSE PLAYERS</h4>
            <label>Player 1</label>
            <select disabled>
              <option label={titleCase(name)} value="AuthedUser">{name}</option>
            </select>
            <label>Player 2</label>
            <select defaultValue={opponent} onChange={e => this.setState({ opponent: e.target.value })}>
            <option value={opponent} disabled>Player Two</option>
             { users
                ? users.map((user, key) => {
                  return <option key={key}>
                          {user.firstName}{' '}{user.lastName}
                         </option>
                  })
                : null
              }
            </select>
            <button onClick={(e) => this.createGame(e)}>START!</button>
          </form>
          <FiXSquare className="modal__close" size={35} onClick={this.closeModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Home;
