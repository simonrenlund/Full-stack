import React from 'react'

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (store.getState().notification === '') {
    return(<div></div>)
  } else {
    return (
      <div style={style}>
        {store.getState().notification}
      </div>
    )
  }
}

export default Notification
