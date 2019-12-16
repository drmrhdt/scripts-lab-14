import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import List from "components/List";
import validator from "email-validator";
import { telephoneReg, seriesReg, numberReg } from "./regex/regex";
import { getPeople, addPerson } from "./utilities/fetch";
import "./App.css";

class App extends Component {
  state = {
    people: [],
    filteredPeople: [],
    filterInput: "",
    firstName: "",
    secondName: "",
    middleName: "",
    series: null,
    number: null,
    email: "",
    telephone: ""
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state.filterInput)
    );
  };

  onChangeInputFilter = e => {
    this.setState({ filterInput: e.target.value }, () =>
      this.filterPeople(this.state.filterInput)
    );
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

  addPerson = async () => {
    await this.setState(prevState => ({
      people: prevState.people.concat({
        id: prevState.people[prevState.people.length - 1].id + 1,
        ...this.state
      })
    }));
    await addPerson({
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      middleName: this.state.middleName,
      series: this.state.series,
      number: this.state.number,
      email: this.state.email,
      telephone: this.state.telephone
    });
    this.clearInputs();
  };

  async componentDidMount() {
    const people = await getPeople();
    this.setState({ people: people });
  }

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

  filterPeople = input => {
    let filteredPeople = this.state.people.filter(
      person =>
        person.firstName.toLowerCase().startsWith(input) ||
        person.secondName.toLowerCase().startsWith(input)
    );
    this.setState({ filteredPeople: filteredPeople });
  };

  render() {
    const disabled = !this.isDisabled();
    let { people } = this.state;
    if (this.state.filteredPeople.length) {
      people = this.state.filteredPeople;
    }

    return (
      <div className="App py-3 bg-dark text-light">
        <input
          type="text"
          className="form-control bg-secondary text-light w-75 mx-auto mb-4"
          id="inputFilter"
          placeholder="Введите первые буквы имени или фамилии..."
          value={this.state.filterInput}
          name="firstName"
          onChange={this.onChangeInputFilter}
        />
        <table className="table table-hover table-striped w-75 mx-auto table-dark">
          <thead className="text-light">
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Серия</th>
              <th>Номер</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th colSpan="2">Управление</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {this.state.people.length ? (
              <List
                people={people}
                deletePerson={this.deletePerson}
                changePerson={this.changePerson}
              />
            ) : (
              <tr>
                <td>Пока что не записей.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-75 mx-auto pt-4">
          <div className="form-group row">
            <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">
              Имя<span className="red">*</span>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control bg-secondary text-light"
                id="inputFirstName"
                placeholder="Введите имя"
                value={this.state.firstName}
                name="firstName"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSecondName"
              className="col-sm-2 col-form-label"
            >
              Фамилия<span className="red">*</span>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control bg-secondary text-light"
                id="inputSecondName"
                placeholder="Введите фамилию"
                value={this.state.secondName}
                name="secondName"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputMiddleName"
              className="col-sm-2 col-form-label"
            >
              Отчество
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control bg-secondary text-light"
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
                className="form-control bg-secondary text-light "
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
                className="form-control bg-secondary text-light"
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
                className="form-control bg-secondary text-light"
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
                className="form-control bg-secondary text-light"
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
      </div>
    );
  }
}

export default App;
