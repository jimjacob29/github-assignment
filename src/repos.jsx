import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class Repos extends Component {

  constructor() {
    super();
    this.state= {
      repos: []
    }
  }

  handleClick = (name) => {
      this.props.history.push(`/repos/${this.props.match.params.username}/${name}`);
  }

  async componentDidMount() {
    const {data} = await axios.get(`https://api.github.com/users/${this.props.match.params.username}/repos`);
    this.setState({repos: data});
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.match.params.username === this.props.match.params.username) {
      return;
    }
    const {data} = await axios.get(`https://api.github.com/users/${this.props.match.params.username}/repos`);
    this.setState({repos: data});
  }
  
  render() { 
    return (
      <>
        {this.state.repos.map(repo => (
        <div onClick={() => this.handleClick(repo.name)}>
          <img src={repo.owner.avatar_url} className={'my-custom-image'} alt={"Repo image"}/>
          {repo.name}
          {repo.description}
        </div>
        ))}
      </>
    )
  }
}
 
export default Repos;
