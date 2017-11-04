import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  constructor () {
 	super();
    this.state = {
      priceQuery: '',
      searchQuery: '',
      results: []
    };
    this.handlePrice = this.handlePrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    let url;
    if (this.state.priceQuery === '') {
    	url = `http://0.0.0.0:5000/search/${this.state.searchQuery}`;
    } else {
    	url = `http://0.0.0.0:5000/search/${this.state.searchQuery}/${this.state.priceQuery}`;
    }
    axios.get(url)
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

  handlePrice (e) {
    this.setState({
      priceQuery: e.target.value
    });
  }

  handleChange (e) { // sends the input value to the main
    this.setState({
      searchQuery: e.target.value
    });
  }

  render () {
	  console.log('PQ', this.state.priceQuery);
    return (
      <div className='price-search-results'>
        <Price priceQuery={this.state.priceQuery}
          handlePrice={this.handlePrice} />
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
        <div className='search-send'>
          <input className='search-input'
            type='text'
            value={this.props.searchQuery} // inverser dataflow
            onChange={this.props.handleChange} />
          <button className='search-button' onClick={this.props.handleClick}><i className='fa fa-search' /></button>
        </div>
      </div>
    );
  }
}

class Price extends React.Component {
  render () {
	  console.log('PriceQuery', this.props.priceQuery);
    return (
      <div className='price-div'>
        <select className='input form-control' value={this.props.priceQuery} onChange={this.props.handlePrice}>
          <option value=''>All</option>
          <option value='1'>$ 1 - 10</option>
          <option value='2'>$$ 11 - 20</option>
          <option value='3'>$$$ 21 - 35</option>
          <option value='4'>$$$$ 36+</option>
        </select>
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
