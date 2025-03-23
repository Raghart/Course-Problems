const Notification = ({ message, isError }) => {
    if (message === '' ) {
      return null
    }
  
    return (
      <div className={isError ? 'message error' : 'message sucess'}>
        <p>{message}</p>
      </div>
    )
};

export default Notification