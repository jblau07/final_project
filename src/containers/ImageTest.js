import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendImage } from '../actions/ImageCaptureAction';

class ImageTest extends Component {
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
    this.handleSend = this.handleSend.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
  
    // event listener for input field on mobile
    const input = document.getElementById('input');
    input.addEventListener('change', this.handleFile);

  //   const constraints = this.state.constraints;
  //   const userMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  //   const getUserMedia = (params) => (
  //     new Promise((success, error) => {
  //       userMedia.call(navigator, params, success, error);
  //     })
  //   );

  //   getUserMedia(constraints)
  //   .then(stream => {
  //     const video = document.querySelector('video');
  //     const vendorURL = window.URL || window.webkitURL;

  //     if (window.webkitURL) {
  //       video.src = vendorURL.createObjectURL(stream);
  //     } else {
  //       video.src = stream;
  //     }
  //     video.play();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  //   this.clearPhoto();
  }

  handleFile(event) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = new Image();
      img.src = reader.result;
      img.addEventListener('load', () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    });
    reader.readAsDataURL(event.target.files[0]);
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

    const submit = document.getElementById('submit');
    submit.style.display = "block";
  }

  handleSend() {
    const image = document.getElementById('photo');
    const base64 = image.src;
    console.log(base64);

    this.props.sendImage(base64);
  }

  render() {
    const submitStyle = {
      display: "none"
    };

    if (/Mobi/.test(navigator.userAgent)) {
      return (
        <div className="capture">
          <input type="file" name="image" id="input" accept="image/*" />
          <canvas id="canvas"></canvas>
          <div className="output">
            <img id="photo" alt="Your mobile capture"/>
          </div>
        </div>
      )
    }
    else {  
      return (
        <div className="capture">
          <video id="video"></video>
          <button onClick={ this.handleStartClick }>Capture</button>
          <canvas id="canvas" hidden></canvas>
          <div className="output">
            <img id="photo" alt="Your capture"/>
          </div>
          <button id="submit" onClick={ this.handleSend } style={ submitStyle }>Submit</button>
        </div>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendImage: image => {
      dispatch(sendImage(image));
    }
  }
}

export default connect(null, mapDispatchToProps)(ImageTest);