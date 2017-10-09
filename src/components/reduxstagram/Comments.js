import React from 'react';

const Comments = React.createClass({
  renderComment(comment, index) {
    return (
      <div className='comment' key={index}>
        <p className='commentsp'>
          <strong>{comment.user}</strong>
          {comment.text}
          <button onClick={this.props.photoActions.removeComment.bind(null, this.props.postId, index)} className='remove-comment'>&times;</button>
        </p>
      </div>
    )
  },
  handleSubmit(e) {
    e.preventDefault();
    const { postId } = this.props;
    const { author, comment } = this.refs;

    this.props.photoActions.addComment(postId, author.value, comment.value);
    this.refs.commentForm.reset();
  },
  render() {
    const { postComments } = this.props;

    return (
      <div className='comments'>
        {postComments.map(this.renderComment)}
        <form ref='commentForm' className='comment-form' onSubmit={this.handleSubmit}>
          <input type='text' ref='author' placeholder='author' />
          <input type='text' ref='comment' placeholder='comment' />
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
});

export default Comments;
