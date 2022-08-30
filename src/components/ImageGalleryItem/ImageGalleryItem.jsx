import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({itemData, openModal}) => {
  const {item,  item_image} = styles;
  const {webformatURL, tags, largeImageURL} = itemData;

  return (
    <li className={item}>
      <img className={item_image} src={webformatURL} alt={tags} onClick={() => openModal(largeImageURL, tags)}/>
    </li>
  )
}

ImageGalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default ImageGalleryItem;