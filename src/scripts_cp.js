import React from 'react';
import ReactDOM from 'react-dom';
import { FruitSelector } from './price.js';
// import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.css';

class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      price: '',
      searchQuery: '',
      priceResults: [],
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
	  if (this.state.price != null) {
	 	console.log(this.state.price);
	 }
    axios.get('http://0.0.0.0:5000/search/' + this.state.searchQuery)
	    .then(response => {
      const name = response.data.map(item => item['name']);
      const addressLocation = response.data.map(item => item['location']);
      const composite = response.data.map(item => item['composite']);
      const totalReviews = response.data.map(item => item['total_reviews']);
      this.setState({
	     results: name
	  });
    });
  }

  handleChange (e) {
    this.setState({
      price: e.target.value,
      searchQuery: e.target.value
    });
  }

  render () {
    return (
      <div className='main-div'>
        <Search
          searchQuery={this.state.searchQuery}
          handleChange={this.handleChange}
          handleClick={this.handleClick} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

class Search extends React.Component {
  render () {
    return (
      <div className='search'>
        <div className='price'>
          <FruitSelector />
        </div>
        <div className='search-send'>
          <input
            type='text'
            value={this.props.searchQuery}
            onChange={this.props.handleChange} />
          <button onClick={this.props.handleClick}>Send</button>
        </div>
      </div>
    );
  }
}

class Results extends React.Component {
  render () {
    return (
      <div className='results'>
        {
          this.props.results.map((item, i) => <ResultItem item={item} key={i} />)
          }
      </div>
    );
  }
}

class ResultItem extends React.Component {
  render () {
    return (
      <article className='one-restaurant'>
        <li key={this.props.key}>{this.props.item}</li>
      </article>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
