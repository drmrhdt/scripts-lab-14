import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import { telephoneReg, seriesReg, numberReg } from "../../regex/regex";
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
  };

  deletePerson = () => {
    this.props.deletePerson(this.props.id);
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
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex justify-content-between w-75">
            <div>{this.state.id}</div>
            <div>{this.state.firstName}</div>
            <div>{this.state.secondName}</div>
            <div>{this.state.middleName}</div>
            <div>{this.state.series}</div>
            <div>{this.state.number}</div>
            <div>{this.state.email}</div>
            <div>{this.state.telephone}</div>
          </div>
          <div className="d-flex justify-content-end w-25">
            <button className="btn btn-warning" onClick={this.changeMode}>
              Сохранить
            </button>
            <button className="btn btn-danger ml-4" onClick={this.deletePerson}>
              Удалить
            </button>
          </div>
        </div>
      );
    } else if (this.state.mode === "edit") {
      return (
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex justify-content-between w-75">
            <input
              className="form-control"
              type="number"
              name="id"
              value={this.state.id}
              onChange={this.handleInput}
            />
            <input
              className="form-control"
              type="text"
              name="firstName"
              placeholder="Введите имя"
              value={this.state.firstName}
              onChange={this.handleInput}
            />
            <input
              className="form-control"
              type="text"
              name="secondName"
              placeholder="Введите фамилию"
              value={this.state.secondName}
              onChange={this.handleInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Введите отчество"
              value={this.state.middleName}
              name="middleName"
              onChange={this.handleInput}
            />
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control"
              placeholder="0000"
              value={this.state.series}
              name="series"
              onChange={this.handleInput}
            />
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control"
              placeholder="000000"
              value={this.state.number}
              name="number"
              onChange={this.handleInput}
            />
            <input
              type="email"
              className="form-control"
              placeholder="example@mail.com"
              value={this.state.email}
              name="email"
              onChange={this.handleInput}
              required
            />
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
              className="form-control"
              id="inputTelephone"
              placeholder="+7(999)999-99-99"
              value={this.state.telephone}
              name="telephone"
              onChange={this.handleInput}
              required
            />
          </div>
          <div className="d-flex justify-content-end w-25">
            {disabled ? (
              <button className="disabled btn btn-primary" disabled>
                Сохранить
              </button>
            ) : (
              <button className="btn btn-primary" onClick={this.saveChanges}>
                Сохранить
              </button>
            )}
            <button className="btn btn-danger ml-4" onClick={this.deletePerson}>
              Удалить
            </button>
          </div>
        </div>
      );
    }
  }
}
