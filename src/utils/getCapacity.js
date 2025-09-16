const getCapacity = (cacpacity) => {
  if (cacpacity < 13) {
    return cacpacity + 2
  } else if (cacpacity < 21) {
    return cacpacity + 4
  } else {
    return cacpacity + 5
  }
}

export { getCapacity }
