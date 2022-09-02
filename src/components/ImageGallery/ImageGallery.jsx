import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

const ImageGallery = ({items, openModal}) => {
  const {gallery} = styles;

  return (
    <ul className={gallery}>
      {items.map(item => <ImageGalleryItem key={nanoid()} itemData={item} openModal={openModal}/>)}
    </ul>
  )
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default ImageGallery;