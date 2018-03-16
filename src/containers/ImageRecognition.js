import React, { Component } from 'react';

class ImageRecognition extends Component {
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
      didTakePicture: false
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
  }

  componentDidMount() {
    const constraints = this.state.constraints;
    const getUserMedia = (params) => (
      new Promise((success, error) => {
        navigator.webkitGetUserMedia.call(navigator, params, success, error);
      })
    );

    getUserMedia(constraints)
    .then(stream => {
      const video = document.querySelector('video');
      const vendorURL = window.URL || window.webkitURL;

      video.src = vendorURL.createObjectURL(stream);
      video.play();

      // if (this.state.didTakePicture === true) {
      //   const track = stream.getTracks()[0];
      //   track.stop();
      // }
    })
    .catch(err => {
      console.log(err);
    });

    this.clearPhoto();
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

    const data = canvas.toDataURL('image/png');
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

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    this.setState({ didTakePicture: true });
  }

  render() {
    return (
      <div className="capture">
        <video id="video"></video>
        <button onClick={ this.handleStartClick }>Capture</button>
        <canvas id="canvas" hidden></canvas>
        <div className="output">
          <img id="photo" />
        </div>
      </div>
    )
  }
}

export default ImageRecognition;