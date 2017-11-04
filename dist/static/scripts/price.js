import React from 'react';
export class FruitSelector extends React.Component {
  constructor () {
  	super();
    this.state = {selectValue: null};
  }
  handleChange (e) {
    this.setState({selectValue: e.target.value});
  }
  render () {
    return (
      <div className='priceSelector'>
        <select className='input form-control'
          onChange={e => this.setState({ selected: e.target.value || null })}
          value={this.state.selected || ''}>
          <option value='' />
          <option value='1'>$</option>
          <option value='2'>$$</option>
          <option value='3'>$$$</option>
          <option value='4'>$$$$</option>
        </select>
      </div>
    );
  }
}
// ReactDOM.render(<FruitSelector name="World" />, document.getElementById('root'));
// export default FruitSelector;
