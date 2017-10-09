import React, { Component } from 'react';
import Photo from './Photo';
import Comments from './Comments';

class Single extends Component {
  render() {
  	const { postId } = this.props.params;
  	const photoIndex = this.props.posts.findIndex((post) => post.code === postId)
  	const post = this.props.posts[photoIndex];
  	const postComments = this.props.comments[postId] || [];

    return (
      <div>
        <h1>Single Photo!</h1>
        <div className='single-photo'>
        	<Photo {...this.props} i={photoIndex} post={post} />
        	<Comments {...this.props.actions} postId={postId} postComments={postComments}/>
        </div>
      </div>
    );
  }
}

export default Single;
