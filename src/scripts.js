import React from 'react';
import ReactDOM from 'react-dom';
import { PriceSelector } from './price.js';

class Main extends React.Component {
  constructor () {
 	super();
    this.state = {
      searchQuery: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    axios.get(`http://0.0.0.0:5000/search/${this.state.searchQuery}`)
	    .then(response => {
                // console.log('response', response);
      const restaurants = response.data.map(place => place); // array of dicts or rest
		// console.log("RET", restaurants);
      this.setState({
		    results: restaurants
	        });
    });
    // console.log('handleCLick');
  }

  handleChange (e) { // sends the input value to the main
    this.setState({
      searchQuery: e.target.value
    });
  }

  render () {
    return (
      <div>
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
	  // console.log('inside props', this.props.searchQuery);
    return (
      <div className='search'>
        <div>
          <PriceSelector />
        </div>
        <div className='search-send'>
          <input
            type='text'
            value={this.props.searchQuery} // inverser dataflow
            onChange={this.props.handleChange} />
          <button onClick={this.props.handleClick}>Send</button>
        </div>
      </div>
    );
  }
}

class Results extends React.Component {
  render () {
	  // console.log('props.results:', this.props.results); //array of dicts
	  // console.log('MAPPING', this.props.results.map((item, i) => <ResultItem item={item} key={i} />));
//	  for (let i = 0; i < this.props.results.length; i++) {
//	  	console.log(this.props.results[i]);
//	  }
	  this.props.results.sort(function (firstComposite, secondComposite) { // sorts composite score
	  	return secondComposite.composite - firstComposite.composite;
	  });
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
        <ul className='restaurant-list'>
          <li>{this.props.item['name']}</li>
          <li>Address: {this.props.item['location']}</li>
          <li>Composite: {this.props.item['composite']}</li>
          <li>Total Reviews: {this.props.item['total_reviews']}</li>
          <li>Price: {this.props.item['price_range']}</li>
        </ul>
      </article>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
