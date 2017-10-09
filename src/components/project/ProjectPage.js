import React from 'react';
import uuid from 'uuid';
import AddProject from './AddProject';
import Projects from './Projects';

export default class ProjectPage extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      categories: ['Power Rankings', 'Teams', 'Bench Points']
    }
  }

  componentWillMount() {
    this.getProjects();
  }

  componentDidMount() {
    //fetchApi('http://localhost:9000/powerRankings/season/2016/leagueId/70928');
  }

  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Dev'
      },
      {
        id: uuid.v4(),
        title: 'ECommerce',
        category: 'Web Design'
      }
    ]});
  }

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects})
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(project => project.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects})
  }

  render() {
    var { projects } = this.state;

    return (
      <div className="Project">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <hr />
        <Projects onDelete={this.handleDeleteProject.bind(this)} name='BigSmitGames' projects={projects} />
      </div>
    );
  }
}
