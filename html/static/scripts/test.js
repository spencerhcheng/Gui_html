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
    axios.get('http://0.0.0.0:5000/search/' + this.state.searchQuery)
	    .then(response => {
      const restaurants = response.data.map(item => item.name);
      this.setState({
	     	results: restaurants
	  });
    });
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

class Search extends React.Component {
  render () {
    return (
      <div>
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
	  console.log('this.props.results: ', this.props.results);
    return (
      <ul>
        {
          this.props.results.map((item, i) => <ResultItem item={item} key={i} />)
        }
      </ul>
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

// function actionClick () {
//  x = document.getElementById('myForm').elements[0].value;
//
//  console.log('Hi there', x);
//  document.getElementById('zip').innerHTML = x;
// }
//
// axios.get('http://0.0.0.0:5000/search/94118')
//	.then(function (response) {
//  console.log(response.data);
// })
//	.catch(function (error) {
//  console.log(error);
// });
