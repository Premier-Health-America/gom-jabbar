const retoursRepoForTest = () => {
  const retours = []

  const addRetour = (r) => {
    retours.push(r)
  }

  const getRetours = () => {
    return retours
  }

  return { addRetour, getRetours }
}

export default retoursRepoForTest
