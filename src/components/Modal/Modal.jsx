import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    imgData: PropTypes.objectOf(PropTypes.string),
  }

  handleOverlayClick = (evt) => {
    const overlay = evt.currentTarget;
    if (evt.target === overlay) {
      this.props.closeModal();
    }
  }

  handleEcsapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.props.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEcsapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEcsapeKey);
  }
  
  render() {
    const {overlay, modal} = styles;
    const {imgData} = this.props;
    const {src, alt} = imgData;

    return (
      <div className={overlay} onClick={this.handleOverlayClick}>
        <div className={modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    )
  }
}

export default Modal;