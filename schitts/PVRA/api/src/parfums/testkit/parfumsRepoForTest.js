const parfumsRepoForTest = () => {
  const parfums = []

  const addParfum = (p) => {
    parfums.push(p)
  }

  const getParfums = () => {
    return parfums
  }

  return { addParfum, getParfums }
}

export default parfumsRepoForTest
