import React from 'react';
import { titleCase } from '../utils/helpers';

class Matches extends React.Component {
  state = {
    ongoing: [],
    finished: []
  }
  componentDidMount() {
    fetch('/api/game/matches')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let ongoing = [];
        let finished = [];
        for(let match in data) {
          if(data[match].winner === '') {
            ongoing.push(data[match])
          } else {
            finished.push(data[match])
          }
        };
        this.setState({ ongoing, finished })
      });
  };

  render() {
    const { ongoing, finished } = this.state;
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
            {ongoing.map(data => {
              return (
                <tr key={data.uid}>
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
                <tr key={data.uid}>
                  <td>{data.title}</td>
                  <td>{data.players[0]}</td>
                  <td>{data.players[1]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Matches;
