import React from 'react';
import { titleCase } from '../utils/helpers';

class Rankings extends React.Component {
  state = {
    users: []
  }
  async componentDidMount() {
    await fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        let users = [];
        Object.keys(data).forEach(key => {
          users.push(data[key]);
          this.setState({ users })
        });
      });
  };

  determineRank(gamesWon) {
    let className = 'noobie';
    switch(gamesWon) {
      case 1:
      case 2:
      case 3:
      case 4:
        return className = 'bronze';
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return className = 'silver';
        break;
      case 10:
        return className = 'gold';
        break;
      default:
        return className;
    };
  };

  render() {
    return (
      <div className="rankings">
        <h2>RANKINGS</h2>
        <ul>
          {this.state.users.map((data, key) => {
            return (
              <li key={key}><span className={this.determineRank(data.gamesWon)}>
                {data.firstName} {data.lastName}
                </span> has {data.gamesWon} wins.
                <hr/>
              </li>
            )
          })}
        </ul>
        <ul className="legend">
          <li><span className="noobie"></span>Noobie</li>
          <li><span className="bronze"></span>Bronze</li>
          <li><span className="silver"></span>Silver</li>
          <li><span className="gold"></span>Gold</li>
        </ul>
      </div>
    )
  }
}

export default Rankings;
