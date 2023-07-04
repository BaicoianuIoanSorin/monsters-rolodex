import { Component } from "react";

import './search-box.styles.css';

class SearchBox extends Component {
  render() {
    // it can be also done directly where the value is set as f.e. this.props.className
    const { onChangeHandler, placeholder, className } = this.props;
    return (
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    );
  }
}

export default SearchBox;
