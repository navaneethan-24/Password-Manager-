import {Component} from 'react'

import './index.css'

import {v4 as idv4} from 'uuid'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
    showPassword: false,
    passwordRecords: [],
  }

  // Statemanagement functions
  onInputUrlChange = event => {
    this.setState({inputUrl: event.target.value})
  }

  onInputNameChange = event => {
    this.setState({inputName: event.target.value})
  }

  onInputPasswordChange = event => {
    this.setState({inputPassword: event.target.value})
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  // crud funcation
  addPasswordToRecord = event => {
    event.preventDefault()

    const {inputUrl, inputName, inputPassword} = this.state
    if (inputUrl === '' || inputName === '' || inputPassword === '') {
      alert('Please fill in all fields.')
      return
    }

    const newPasswordRecord = {
      id: idv4(),
      url: inputUrl,
      name: inputName,
      password: inputPassword,
    }

    this.setState(prevState => ({
      passwordRecords: [...prevState.passwordRecords, newPasswordRecord],
      inputUrl: '',
      inputPassword: '',
      inputName: '',
    }))
  }

  deletePasswordRecord = id => {
    const {passwordRecords} = this.state
    const filteredPasswordRecords = passwordRecords.filter(
      eachRecord => eachRecord.id !== id,
    )
    this.setState({passwordRecords: filteredPasswordRecords})
  }

  // utility function
  getSearchResult = () => {
    const {passwordRecords, searchInput} = this.state
    return passwordRecords.filter(eachRecord =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {showPassword, inputName, inputPassword, inputUrl} = this.state
    const searchResult = this.getSearchResult()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              className="header-image"
              alt="app logo"
            />
          </div>
          <div className="manager-container ">
            <div className="card-container">
              <form
                className="form-container"
                onSubmit={this.addPasswordToRecord}
              >
                <h1 className="card-heading">Add New Password</h1>
                <div className="input-container">
                  <img
                    className="input-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <hr className="horizontal-line" />
                  <input
                    className="input"
                    type="text"
                    value={inputUrl}
                    placeholder="Enter Website"
                    onChange={this.onInputUrlChange}
                  />
                </div>
                <div className="input-container">
                  <img
                    className="input-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <hr className="horizontal-line" />
                  <input
                    className="input"
                    type="text"
                    value={inputName}
                    placeholder="Enter Username"
                    onChange={this.onInputNameChange}
                  />
                </div>
                <div className="input-container">
                  <img
                    className="input-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <hr className="horizontal-line" />
                  <input
                    className="input"
                    type="password"
                    value={inputPassword}
                    placeholder="Enter Password"
                    onChange={this.onInputPasswordChange}
                  />
                </div>
                <div className="button-container">
                  <button className="button" type="submit">
                    {' '}
                    Add
                  </button>
                </div>
              </form>
            </div>

            <img
              className="card-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
          </div>
          <div className="password-container">
            <div className="password-header-container">
              <div className="header-counter">
                <h1 className="password-heading">Your Passwords </h1>
                <div className="password-count">
                  <p className="count">{searchResult.length}</p>{' '}
                </div>
              </div>
              <div className="search-bar">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <hr className="horizontal-line" />

                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onSearchInputChange}
                />
              </div>
            </div>
            <hr className="horizontal-bar" />
            <div className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                id="checkbox"
                onChange={this.onCheckChange}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {searchResult.length !== 0 ? (
              <ul className="password-list-container">
                {searchResult.map(eachRecord => (
                  <PasswordItem
                    key={eachRecord.id}
                    record={eachRecord}
                    deletePasswordRecord={this.deletePasswordRecord}
                    showPassword={showPassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png  "
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords-title">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
