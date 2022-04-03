const month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const formatDate = date => {
  const format = new Date(date)
  const day = format.getDate()
  const monthNumber = format.getMonth()
  const formatedMonth = month[monthNumber]
  const year = format.getFullYear()

  return `${day} ${formatedMonth} ${year}`
}

export default formatDate
