import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class Projects extends Component {

  deleteProject(id){
    this.props.onDelete(id);
  }

  render() {
    let projectItems;
    if (this.props.projects) {
      projectItems = this.props.projects.map((project, index) => {
        // console.log(project);
        return (
          <ProjectItem onDelete={this.deleteProject.bind(this)} key={index} project={project} />
        );
      });
    }

    return (
      <div className='Projects'>
        <h4>Projects</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {projectItems}
          </tbody>
        </table>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.array,
  onDelete: React.PropTypes.func
}

export default Projects;
