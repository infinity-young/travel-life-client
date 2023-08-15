import React, { PureComponent } from 'react';
interface SearchBoxProps{
    search:(searchValue:string)=>void;
}
interface SearchBoxState{
    searchValue:string;
}
class SearchBox extends PureComponent<SearchBoxProps,SearchBoxState>{
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSearch = () => {
    const { searchValue } = this.state;
    this.props.search(searchValue);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <input type="text" value={searchValue} onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>搜索</button>
      </div>
    );
  }
}

export default SearchBox;