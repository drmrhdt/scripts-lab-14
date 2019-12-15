import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import { telephoneReg, seriesReg, numberReg } from "../../regex/regex";
import { deletePerson, changePerson } from "../../utilities/fetch";
import validator from "email-validator";

export default class Person extends Component {
  state = {
    id: 0,
    firstName: "",
    secondName: "",
    middleName: "",
    series: null,
    number: null,
    email: "",
    telephone: "",
    mode: "read"
  };

  changeMode = () => {
    this.setState(prevState => ({
      mode: prevState.mode === "read" ? "edit" : "read"
    }));
  };

  saveChanges = () => {
    this.props.changePerson(
      this.state.id,
      this.state.firstName,
      this.state.secondName,
      this.state.middleName,
      this.state.series,
      this.state.number,
      this.state.email,
      this.state.telephone
    );
    this.changeMode();
    changePerson(
      {
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        middleName: this.state.middleName,
        series: this.state.series,
        number: this.state.number,
        email: this.state.email,
        telephone: this.state.telephone
      },
      this.props.id
    );
  };

  deletePerson = () => {
    this.props.deletePerson(this.props.id);
    deletePerson(this.props.id);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isDisabled = () => {
    return (
      validator.validate(this.state.email) &&
      this.state.telephone.match(telephoneReg) &&
      this.state.series.match(seriesReg) &&
      this.state.number.match(numberReg) &&
      this.state.firstName &&
      this.state.secondName
    );
  };

  componentDidMount() {
    this.setState({
      ...this.props.person
    });
  }

  render() {
    const disabled = !this.isDisabled();

    if (this.state.mode === "read") {
      return (
        <tr>
          <th>{this.props.id}</th>
          <td>{this.state.firstName}</td>
          <td>{this.state.secondName}</td>
          <td>{this.state.middleName}</td>
          <td>{this.state.series}</td>
          <td>{this.state.number}</td>
          <td>{this.state.email}</td>
          <td>{this.state.telephone}</td>
          <td>
            <button className="btn btn-warning" onClick={this.changeMode}>
              Изменить
            </button>
          </td>
          <td>
            <button className="btn btn-danger ml-4" onClick={this.deletePerson}>
              Удалить
            </button>
          </td>
        </tr>
      );
    } else if (this.state.mode === "edit") {
      return (
        <tr>
          <th>{this.props.id}</th>
          <td>
            <input
              className="form-control bg-secondary text-light w-100"
              type="text"
              name="firstName"
              placeholder="Введите имя"
              value={this.state.firstName}
              onChange={this.handleInput}
            />
          </td>
          <td>
            <input
              className="form-control bg-secondary text-light w-100"
              type="text"
              name="secondName"
              placeholder="Введите фамилию"
              value={this.state.secondName}
              onChange={this.handleInput}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control bg-secondary text-light w-100"
              placeholder="Введите отчество"
              value={this.state.middleName}
              name="middleName"
              onChange={this.handleInput}
            />
          </td>
          <td>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light w-100"
              placeholder="0000"
              value={this.state.series}
              name="series"
              onChange={this.handleInput}
            />
          </td>
          <td>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light w-100"
              placeholder="000000"
              value={this.state.number}
              name="number"
              onChange={this.handleInput}
            />
          </td>
          <td>
            <input
              type="email"
              className="form-control bg-secondary text-light w-100"
              placeholder="example@mail.com"
              value={this.state.email}
              name="email"
              onChange={this.handleInput}
              required
            />
          </td>
          <td>
            <MaskedInput
              mask={[
                "+",
                /[7]/,
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/
              ]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light w-100"
              id="inputTelephone"
              placeholder="+7(999)999-99-99"
              value={this.state.telephone}
              name="telephone"
              onChange={this.handleInput}
              required
            />
          </td>
          <td>
            {disabled ? (
              <button className="disabled btn btn-primary" disabled>
                Сохранить
              </button>
            ) : (
              <button className="btn btn-primary" onClick={this.saveChanges}>
                Сохранить
              </button>
            )}
          </td>
          <td>
            <button className="btn btn-danger ml-4" onClick={this.deletePerson}>
              Удалить
            </button>
          </td>
        </tr>
      );
    }
  }
}
