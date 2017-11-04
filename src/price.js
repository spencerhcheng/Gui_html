import React from 'react';
export class PriceSelector extends React.Component {
  constructor () {
  	super();
    this.state = {
      selectValue: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
	  console.log(e);
    this.setState({
      selectValue: e.target.value
    });
  }
  render () {
	  console.log(this.state.selectValue);
    return (
      <div className='priceSelector'>
        <select className='input form-control'
          onChange={e => this.setState({ selected: e.target.value || null })}
          value={this.state.selected || ''}>
          <option value='' />
          <option value='1'>$ 1 - 10</option>
          <option value='2'>$$ 11 - 20</option>
          <option value='3'>$$$ 21 - 35</option>
          <option value='4'>$$$$ 36+</option>
        </select>
      </div>
    );
  }
}
