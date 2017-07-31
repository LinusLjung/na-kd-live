import React, { Component } from 'react';
import Screen from './screen.jsx';
import data from '../data.json';

const baseMediaUrl = "https://d21vejvoh8fjtd.cloudfront.net/static/NA-KD/shopdrop-stream/";

console.log(data);

class App extends Component {
  constructor() {
    super();

    this.renderGroup = this.renderGroup.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      screenSrc: localStorage.getItem('screenSrc') && baseMediaUrl + localStorage.getItem('screenSrc'),
      itemIndex: Number(localStorage.getItem('itemIndex')),
      groupIndex: Number(localStorage.getItem('groupIndex'))
    };
  }

  handleItemClick(e, src, itemIndex, groupIndex) {
    e.preventDefault();
    localStorage.setItem('itemIndex', itemIndex);
    localStorage.setItem('groupIndex', groupIndex);

    if (e.button === 0) {
      localStorage.setItem('screenSrc', src);
    } else {
      localStorage.setItem('previewSrc', src);
    }

    this.setState(Object.assign({}, e.button === 0 ? {
      itemIndex,
      groupIndex,
      screenSrc: baseMediaUrl + src,
    } : {
      previewSrc: baseMediaUrl + src,
    }));
  }

  renderGroup({ title, items }, groupIndex) {
    return (
      <div
        key={ title }
        style={ {
          marginLeft: '20px',
          marginBottom: '40px'
        } }
      >
        <div
          style={ {
            fontWeight: 'bold'
          } }
        >
          { title }
        </div>

        <div>
          { items.map(function (item, itemIndex) {
            return this.renderItem(item, itemIndex, groupIndex);
          }.bind(this)) }
        </div>
      </div>
    );
  }

  renderItem({ title, src }, itemIndex, groupIndex) {
    return (
      <div
        key={ src }
        onClick={ function (e) {
          this.handleItemClick(e, src, itemIndex, groupIndex);
        }.bind(this) }
        onContextMenu={ function (e) {
          this.handleItemClick(e, src, itemIndex, groupIndex);
        }.bind(this) }
        style={ Object.assign({
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #000',
          borderRadius: '5px',
          marginTop: '10px'
        }, this.state.itemIndex === itemIndex && this.state.groupIndex === groupIndex ? {
          backgroundColor: '#000',
          color: '#fff'
        } : null) }
      >
        { title || src }
      </div>
    );
  };

  render() {
    return (
      <div>
        <div style={ {
          float: 'left'
        } }>
          <Screen
            style={ {
              marginBottom: '15px',
              cursor: 'none'
            } }
            src={ this.state.screenSrc }
          />

          <Screen
            src={ this.state.previewSrc }
          />
        </div>

        <div
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
            overflowY: 'auto',
            height: '100vh'
          } }
        >
          { data.map(this.renderGroup) }
        </div>
      </div>
    );
  }
}

export default App;
