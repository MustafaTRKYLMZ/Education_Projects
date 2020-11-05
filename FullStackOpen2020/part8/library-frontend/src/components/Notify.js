const Notify = ({setErrorMessage}) => {

    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  export default Notify