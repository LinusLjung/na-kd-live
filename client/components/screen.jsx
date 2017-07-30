import React, { Component } from 'react';

class Screen extends Component {
  constructor() {
    super();

    this.setVideo = this.setVideo.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.video && this.video.load();
    }
  }

  isVideo(src) {
    return src.match(/\.mp4$/);
  }

  setVideo(video) {
    this.video = video;
  }

  render() {
    return (
      <div
        style={ Object.assign({}, this.props.style, {
          width: '189px',
          height: '288px',
          backgroundColor: 'black'
        }) }
      >
        { this.props.src && this.isVideo(this.props.src) ?
          (
            <video autoPlay loop muted
              style={ {
                width: '100%',
                height: '100%',
                objectFit: 'fill'
              } }
              ref={ this.setVideo }
            >
              <source src={ this.props.src } type="video/mp4" />
            </video>
          ) :
          <img
            src={ this.props.src }
            style={ {
              width: '100%',
              height: '100%'
            } }
          />
        }
      </div>
    );
  }
}

export default Screen;
