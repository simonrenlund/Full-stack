import React from 'react'
import { connect } from 'react-redux'
import {
  setSuccessMessage,
  setErrorMessage,
  removeMessage,
} from '../reducers/notificationReducer'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const Notification = (props) => {
  if (props.notification[0] === '') {
    return <div></div>
  } else if (props.notification[1] === 'SUCCESS') {
    return <div style={success}>{props.notification[0]}</div>
  } else {
    return <div style={error}>{props.notification[0]}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  setSuccessMessage,
  setErrorMessage,
  removeMessage,
}

/* const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage) {
    return (
      <div id="success" style={success}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div id="error" style={error}>
        {errorMessage}
      </div>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
} */

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
