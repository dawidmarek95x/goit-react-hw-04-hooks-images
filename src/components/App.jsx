import React, { Component } from 'react';
import styles from './App.module.scss';
import * as api from 'services/fetchImagesWithQuery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    foundImages: null,
    currentLargeImg: null,
  }

  setInitialParams = (searchQuery) => {
    if (searchQuery === '') {
      return alert('Enter the search value!')
    }

    if (searchQuery === this.state.searchQuery) {
      return;
    }

    this.setState({
      images: [],
      searchQuery,
      page: 1,
    });
  }

  loadMore = () => {
    this.setState(({page}) => ({page: page + 1}));
  }

  addImages = async (searchQuery, page) => {
    this.setState({ isLoading: true });

    try {
      const data = await api.fetchImagesWithQuery(searchQuery, page);
      const {hits: newImages, totalHits: foundImages} = data;

      this.setState(oldState => ({
        images: [...oldState.images, ...newImages],
      }));

      if (foundImages !== this.state.foundImages) {
        this.setState({ foundImages });
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false });
    }
  }

  openModal = (src, alt) => {
    this.setState(state => ({...state, currentLargeImg: {src, alt}}));
  }

  closeModal = (evt) => {
    this.setState({currentLargeImg: null});
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
      const {searchQuery, page} = this.state;
      this.addImages(searchQuery, page);
    }
  }

  render() {
    const {app} = styles;
    const {images, isLoading, error, foundImages, currentLargeImg} = this.state;

    return (
      <div className={app}>
        <Searchbar onSubmit={this.setInitialParams}/>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && 
          <>
            <ImageGallery 
              items={images} 
              openModal={this.openModal} 
            />
            {images.length < foundImages && 
              <Button loadMore={this.loadMore} />
            }
          </>
        }
        {currentLargeImg && <Modal closeModal={this.closeModal} imgData={currentLargeImg}/>}
      </div>
    );
  }
};

export default App;