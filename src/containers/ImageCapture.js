import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendImage, sendIngredient, clearImageResults } from '../actions/ImageCaptureAction';

class ImageCapture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      constraints: {
        audio: false,
        video: {
          width: 400,
          height: 300
        }
      },
      didTakePicture: false,
      selectedIngredient: ''
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleMobile = this.handleMobile.bind(this);
    this.selectIngredient = this.selectIngredient.bind(this);
  }

  componentDidMount() {

    if(!localStorage.getItem('id')){
      this.props.history.push("/")
    }

    // handling mobile image capture
    if (/Mobi/.test(navigator.userAgent)) {
      const input = document.getElementById('input');
      const mobileButton = document.getElementById('mobile-capture__button');

      mobileButton.addEventListener('click', () => {
        input.click();
      });

      input.addEventListener('change', this.handleMobile);
    }

    // handling desktop image capture
    else {
      const constraints = this.state.constraints;
      const userMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      const getUserMedia = (params) => (
        new Promise((success, error) => {
          userMedia.call(navigator, params, success, error);
        })
      );

      getUserMedia(constraints)
      .then(stream => {
        const video = document.querySelector('video');
        const vendorURL = window.URL || window.webkitURL;

        if (window.webkitURL) {
          video.src = vendorURL.createObjectURL(stream);
        } else {
          video.src = stream;
        }
        video.play();
      })
      .catch(err => {
        console.log(err);
      });

      // this.clearPhoto();
    }
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePicture();
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL('image/jpeg', 1.0);
    photo.setAttribute('src', data);
  }

  takePicture() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const video = document.querySelector('video');
    const photo = document.getElementById('photo');
    const { width, height } = this.state.constraints.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/jpeg', 1.0);
    photo.setAttribute('src', data);

    this.setState({ didTakePicture: true });

    video.srcObject.getVideoTracks().forEach(track => track.stop());
    video.style.display = "none";
    photo.style.display = "inline";

    const captureButton = document.getElementById('capture-photo');
    captureButton.style.display = "none";

    const submit = document.getElementById('submit');
    submit.style.display = "block";
  }

  handleMobile(event) {

    if (/Mobi/.test(navigator.userAgent)) {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const output = document.getElementById('output');
      const mobileButton = document.getElementById('mobile-capture__button');

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const img = new Image();
        img.src = reader.result;
        img.id = 'photo';
        img.setAttribute('alt', 'Your mobile capture');
        img.addEventListener('load', () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
        output.appendChild(img);
        mobileButton.style.display = 'none';
      });
      reader.readAsDataURL(event.target.files[0]);

      const submit = document.getElementById('submit');
      submit.style.display = "block";
    }
  }

  handleSend() {
    const image = document.getElementById('photo');
    const base64 = image.src;

    this.props.sendImage(base64);
    const submit = document.getElementById('submit');
    submit.style.display = "none";

    const select = document.getElementById('image-results__header');
    select.style.display = "block";
  }

  selectIngredient(event) {
    event.preventDefault();
    const history = this.props.history;
    this.setState({ selectedIngredient: event.target.value }, () => {
      this.props.sendIngredient(this.state.selectedIngredient, (redirectCallback) => {
        this.props.clearImageResults();
        history.push('/fridge');
      });
    });
  }

  componentWillUnmount() {
    const video = document.querySelector('video');
    video.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  render() {
    const submitStyle = {
      display: "none"
    };
    const results = this.props.imageResults;

    if (/Mobi/.test(navigator.userAgent)) {
      return (
        <div className="image-capture">
          <header className="view-title">
            <h2>Image Capture</h2>
          </header>
          <div className="capture">
            <button id="mobile-capture__button">Choose Photo</button>
            <input type="file" name="image" id="input" accept="image/*" />
            <canvas id="canvas" hidden></canvas>
            <div id="output"></div>
            <button id="submit" onClick={ this.handleSend } style={ submitStyle }>Find Ingredient</button>
          </div>
          <ul className="image-results">
            <header id="image-results__header">
              <h3>Please select from these ingredients:</h3>
            </header>
              {results.map((element, idx) => {
                return (
                  <li key={idx} className="image-results__item"><input type="button" value={element.class} name={element.class} onClick={ this.selectIngredient } /></li>
                )
              })}
          </ul>
          <div className="image-capture__desc">
              <div className="desc-container">
                <i className="fas fa-exclamation-circle fa-2x" />
                <p>Click to upload a photo or capture a new photo of your ingredient.</p>
              </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="image-capture">
          <header className="view-title">
              <h2>Image Capture</h2>
            </header>
          <div className="capture">
            <video id="video"></video>
            <button id="capture-photo" onClick={ this.handleStartClick }>Capture</button>
            <canvas id="canvas" hidden></canvas>
            <div className="output">
              <img id="photo" alt="Your capture"/>
            </div>
            <button id="submit" onClick={ this.handleSend } style={ submitStyle }>Find Ingredient</button>
          </div>
          <ul className="image-results">
            <header id="image-results__header">
              <h3>Please select from these ingredients:</h3>
            </header>
              {results.map((element, idx) => {
                return (
                  <li key={idx} className="image-results__item"><input type="button" value={element.class} name={element.class} onClick={ this.selectIngredient } /></li>
                )
              })}
          </ul>
          <div className="image-capture__desc">
              <div className="desc-container">
                <i className="fas fa-exclamation-circle fa-2x" />
                <p>Click to upload a photo or capture a new photo of your ingredient.</p>
              </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    imageResults: state.imageCapture.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendImage: image => {
      dispatch(sendImage(image));
    },
    sendIngredient: (ingr, redirectCallback) => {
      dispatch(sendIngredient(ingr, redirectCallback));
    },
    clearImageResults: () => {
      dispatch(clearImageResults());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageCapture));