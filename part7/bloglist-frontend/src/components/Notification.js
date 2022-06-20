import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.notification === '') {
        return <div></div>
    } else {
        return <div>{props.notification}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps)(Notification)
