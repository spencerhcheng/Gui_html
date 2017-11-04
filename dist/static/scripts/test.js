import React from 'react';
import ReactDOM from 'react-dom';

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
	  if (this.state.price) {
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
  }

  handleChange (e) {
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

// class Price extends React.Component {
//  render () {
//    return (
//      <form id='myForm'>
//        <select>
//          <option value='1'>$</option>
//          <option value='2'>$$</option>
//          <option value='3'>$$$</option>
//          <option value='4'>$$$$</option>
//        </select>
//      </form>
//    );
//  }
// }
//
class Search extends React.Component {
  render () {
    return (
      <div className='search'>
        <FruitSelector />
        <input
          type='text'
          value={this.props.searchQuery}
          onChange={this.props.handleChange} />
        <button onClick={this.props.handleClick}>Send</button>
      </div>
    );
  }
}

class Results extends React.Component {
  render () {
    return (
      <article>
        {
          this.props.results.map((item, i) => <ResultItem item={item} key={i} />)
        }
      </article>
    );
  }
}

class ResultItem extends React.Component {
  render () {
    return (
      <li key={this.props.key}>{this.props.item}</li>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
