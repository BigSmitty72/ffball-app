import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    categories: ['Web Design', 'Web Dev', 'Mobile Dev', 'Research']
  }

  handleSubmit(e){
    if (this.refs.title.value === '') {
      alert('Title is required!')
    } else {
      this.setState({newProject:{
        id: uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value
      }}, function(){
        // console.log(this.state);
        this.props.addProject(this.state.newProject);
      })
    }
    // console.log(this.refs.category.value);
    e.preventDefault();
  }

  render() {
    // var { name } = this.props;
    let categoryOptions = this.props.categories.map((category, index) => {
      return <option key={index} value={category}>{category}</option>
    })

    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>
                  <div>
                    <label>Title</label><br />
                    <input type='text' ref='title' />
                  </div><br />
                </td>
                <td>
                  <div>
                    <label>Category</label><br />
                    <select ref='category'>
                      {categoryOptions}
                    </select><br />
                    <input type='submit' value='Submit' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

AddProject.PropTypes = {
  categories: React.PropTypes.array,
  addProject: React.PropTypes.func
}

export default AddProject;
