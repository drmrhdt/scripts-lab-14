import React, { Component } from "react";
import Person from "components/Person";

export default class List extends Component {
  render() {
    return (
      <ul className="mb-4">
        {this.props.people.map(person => (
          <Person
            key={Math.random()}
            id={person.id}
            person={person}
            deletePerson={this.props.deletePerson}
            changePerson={this.props.changePerson}
          />
        ))}
      </ul>
    );
  }
}
