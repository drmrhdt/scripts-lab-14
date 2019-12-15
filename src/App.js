import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import List from "components/List";
import validator from "email-validator";
import { telephoneReg, seriesReg, numberReg } from "./regex/regex";
import "./App.css";

class App extends Component {
  state = {
    people: [],
    firstName: "",
    secondName: "",
    middleName: "",
    series: null,
    number: null,
    email: "",
    telephone: ""
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changePerson = (
    id,
    firstName,
    secondName,
    middleName,
    series,
    number,
    email,
    telephone
  ) => {
    this.setState(prevState => ({
      people: prevState.people.map(person =>
        person.id === id
          ? {
              id: id,
              firstName: firstName,
              secondName: secondName,
              middleName: middleName,
              series: series,
              number: number,
              email: email,
              telephone: telephone
            }
          : person
      )
    }));
  };

  addPerson = () => {
    const id = Math.floor(Math.random() * 10000);
    this.setState(prevState => ({
      people: prevState.people.concat({
        id: id,
        ...this.state
      })
    }));
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      firstName: "",
      secondName: "",
      middleName: "",
      series: null,
      number: null,
      email: "",
      telephone: ""
    });
  };

  deletePerson = id => {
    this.setState(prevState => ({
      people: prevState.people.filter(person => person.id !== id)
    }));
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

  render() {
    const disabled = !this.isDisabled();

    return (
      <div className="App w-75 mx-auto pt-4">
        {this.state.people.length ? (
          <List
            people={this.state.people}
            deletePerson={this.deletePerson}
            changePerson={this.changePerson}
          />
        ) : null}
        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">
            Имя<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="Введите имя"
              value={this.state.firstName}
              name="firstName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputSecondName" className="col-sm-2 col-form-label">
            Фамилия<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputSecondName"
              placeholder="Введите фамилию"
              value={this.state.secondName}
              name="secondName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputMiddleName" className="col-sm-2 col-form-label">
            Отчество
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputMiddleName"
              placeholder="Введите отчество"
              value={this.state.middleName}
              name="middleName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Паспорт</label>
          <div className="col-sm-10">
            <label htmlFor="inputSeries" className="col-sm-2 col-form-label">
              Серия<span className="red">*</span>
            </label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control"
              id="inputSeries"
              placeholder="0000"
              value={this.state.series}
              name="series"
              onChange={this.onChangeInput}
            />
            <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
              Номер<span className="red">*</span>
            </label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control"
              id="inputNumber"
              placeholder="000000"
              value={this.state.number}
              name="number"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="example@mail.com"
              value={this.state.email}
              name="email"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputTelephone" className="col-sm-2 col-form-label">
            Telephone<span className="red">*</span>
          </label>
          <div className="col-sm-10">
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
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        {disabled ? (
          <button className="disabled disabled-btn btn btn-primary" disabled>
            Добавить
          </button>
        ) : (
          <button className="btn btn-primary" onClick={this.addPerson}>
            Добавить
          </button>
        )}
      </div>
    );
  }
}

export default App;
