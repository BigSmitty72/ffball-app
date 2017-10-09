import React, { Component } from 'react';
import Photo from './Photo';
import './styles/Photo.css';

class PhotoGrid extends Component {
  render() {
    return (
      <div>
        <h1>Photo Grid!</h1>
      	<div className='photo-grid'>
          	{this.props.posts.map((post, index) => {
          		return (<Photo {...this.props} key={index} i={index} post={post} />)
      		})}
      	</div>
      </div>
    );
  }
}

export default PhotoGrid;
