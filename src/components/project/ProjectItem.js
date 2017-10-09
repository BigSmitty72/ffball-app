import React, { Component } from 'react';

class ProjectItem extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }

  render() {
    var { id, title, category } = this.props.project;
    // console.log(title);
    return (
      // <li className='Project'>
      //   {title}
      // </li>
      <tr>
        <td>
          {category}
        </td>
        <td>
          {title}
        </td>
        <td>
          <a href='#' onClick={this.deleteProject.bind(this, id)}>X</a>
        </td>
      </tr>
    );
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object
}

export default ProjectItem;
