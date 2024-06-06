import React, { PureComponent } from 'react';
import style from './index.module.scss'
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
      <div className={style.searchContainer}>
        <input type="text" value={searchValue} onChange={this.handleInputChange} className={style.inputBox} placeholder='请输入酒店名称' />
        <button onClick={this.handleSearch} >搜索</button>
      </div>
    );
  }
}

export default SearchBox;