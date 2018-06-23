import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


class App extends Component {
state = {
  manager : '',
  players :[],
  balance: '',
  value :'',
  message:''
};


async componentDidMount() {
const manager =  await lottery.methods.manager().call();
const players = await lottery.methods.getPlayers().call();
const balance = await web3.eth.getBalance(lottery.options.address);
this.setState({manager, players, balance});
}

onSubmit = async event => {
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();

this.setState({message: 'Waiting on transaction success...'});
  await lottery.methods.enter().send({
    from: accounts[0],
    value: web3.utils.toWei(this.state.value,'ether')
  });
  this.setState({message: 'You have been entered! Best of luck!'});
};

onClick = async event => {
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();

this.setState({message: 'Waiting on transaction success...'});
  await lottery.methods.pickWinner().send({
    from: accounts[0],
  });
  this.setState({message: 'The Amount has been transferred to the winner! '});
};
  render() {
    return (
<div>
<h2>Lottery</h2>
<p>
This contract is managed by {this.state.manager} .
There are currently {this.state.players.length} people competing to win a price pool of {web3.utils.fromWei(this.state.balance,'ether')} ether.
</p>
<hr />
<form onSubmit={this.onSubmit}>
<p>Try your luck!</p>
<div>
<label>Enter: </label>
<input
value = {this.state.value}
onChange = {event => this.setState({value : event.target.value})}
 />
</div>
<button>Enter</button>
</form>
<hr />
<h2>Pick a Winner!</h2>
<button onClick={this.onClick}>Pick Winner</button>
<hr />
<h2>{this.state.message}</h2>
</div>
);
}
}
export default App;
