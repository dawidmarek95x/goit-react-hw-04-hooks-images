import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.scss';

const INITIAL_STATE = {
  searchQuery: '',
}

export class Searchbar extends Component {
  state = {...INITIAL_STATE}

  handleChange = (evt) => {
    const {name, value} = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({...INITIAL_STATE});
  }

  render() {
    const {searchQuery} = this.state;
    const {searchbar, form, form_btn, form_label, form_input} = styles;

    return (
      <header className={searchbar}>
        <form className={form} onSubmit={this.handleSubmit}>
          <button type="submit" className={form_btn}>
            <span className={form_label}>Search</span>
          </button>

          <input
            className={form_input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
 
export default Searchbar;