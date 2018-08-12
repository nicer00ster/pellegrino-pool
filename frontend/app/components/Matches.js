import React from 'react';
import Modal from 'react-modal';
import { titleCase } from '../utils/helpers';
import { verifyToken } from '../utils/storage';

class Matches extends React.Component {
  state = {
    ongoing: [],
    finished: [],
    editable: [],
    email: '',
    uid: '',
    selectedGame: {},
    modalOpen: false
  }
  async componentDidMount() {
    const value = verifyToken('app');
    if(value && value.token) {
      const { token } = value;
      await fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.success) this.setState({
            uid: data.uid,
            email: data.email
          })
        })
        await fetch('/api/game/matches')
        .then(res => res.json())
        .then(data => {
          let ongoing = [];
          let finished = [];
          let editable = [];
          for(let match in data.info) {
            if(data.info[match].winner === '') {
              ongoing.push(data.info[match]);
            } else {
              finished.push(data.info[match]);
            };
          };
          this.setState({ ongoing, finished });
          data.info.map(results => {
            if(results.owner !== this.state.uid) {
              return null;
            } else {
              editable.push(results);
            };
            this.setState({ editable });
          })
        });
    };
  };

  // componentDidUpdate(prevState) {
  //   console.log('hi');
  // };

  openModal = data => {
    const { uid, ongoing } = this.state;
    if(data.owner === uid) {
      this.setState({ selectedGame: data, modalOpen: true  }, () => {
        console.log(this.state.selectedGame);
      });
      // console.log('Works');
      console.log(data._id);
      // console.log(data.players);
      // this.openModal();
    } else {
      return null;
    }
  };
  // afterOpenModal = () => this.populateUsers();
  closeModal = () => this.setState({ modalOpen: false, selectedGame: [] });

  declareWinner = (e, data) => {
    // console.log(e.currentTarget.textContent);
    console.log(data);
    let winner = e.currentTarget.textContent;
    fetch('/api/game/matches', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        _id: data._id,
        winner
      })
    })
    .then(res => res.json())
    .then(results => {
      console.log(results);
      const newFinished = {
        ...results.info,
        winner
      };


      this.setState(prevState => ({
        finished: [...prevState.finished, newFinished],
        ongoing: [...prevState.ongoing.filter(index => index._id != results.info._id)]
      }))
      this.closeModal()
    })
  };

  render() {
    const { ongoing, finished, selectedGame, modalOpen } = this.state;
    return (
      <div>
        <h2>ONGOING MATCHES</h2>
        <hr/>
        <table>
          <tbody>
            <tr>
              <th>Match Title</th>
              <th>Player One</th>
              <th>Player Two</th>
            </tr>
            {ongoing.map((data) => {
              return (
                <tr onClick={() => this.openModal(data)} className="select" key={data._id} value={data._id}>
                  <td>{data.title}</td>
                  <td>{data.players[0]}</td>
                  <td>{data.players[1]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h2>FINISHED MATCHES</h2>
        <hr/>
        <table>
          <tbody>
            <tr>
              <th>Match Title</th>
              <th>Player One</th>
              <th>Player Two</th>
            </tr>
            {finished.map((data, key) => {
              return (
                <tr key={data._id}>
                  <td className='title'>{data.title}</td>
                  <td className={data.winner === data.players[0] ? 'winner' : 'loser'}>{data.players[0]}</td>
                  <td className={data.winner === data.players[1] ? 'winner' : 'loser'}>{data.players[1]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal
          className="modal"
          overlayClassName="modal__overlay"
          shouldCloseOnOverlayClick={true}
          isOpen={modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={250}
          contentLabel="Create a Game">
          <h2 ref={subtitle => this.subtitle = subtitle}>CHOOSE A WINNER</h2>
          <form className="modal__players">
            <table>
              <tbody>
                <tr>
                  <th>Player One</th>
                  <th>Player Two</th>
                </tr>
                <tr>
                  {selectedGame.hasOwnProperty('title')
                  ?
                    <React.Fragment>
                    <td className="select" onClick={(e) => this.declareWinner(e, selectedGame)}>{selectedGame.players[0]}</td>
                    <td className="select" onClick={(e) => this.declareWinner(e, selectedGame)}>{selectedGame.players[1]}</td>
                    </React.Fragment>

                  :  null
                  }
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Matches;
