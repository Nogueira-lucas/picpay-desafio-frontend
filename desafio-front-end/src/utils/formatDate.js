const month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const formatDate = date => {
  console.log(date)
  const format = new Date(date)
  const day = format.getDate()
  const monthNumber = format.getMonth()
  const formatedMonth = month[monthNumber]
  const year = format.getFullYear()

  return `${day} ${formatedMonth} ${year}`
}

export default formatDate

// const DDMMYYYY = 'DD/MM/YYYY'

// export const DATE_FORMAT = {
//   DDMMYYYY
// }

// const dateMask = period => {
//   switch (period) {
//     case 1:
//       return {
//         regex: /.T(.):.*/,
//         repl: '$1'
//       }
//     case 2:
//       return {
//         regex: /.-(.\d)-(.\d)T./,
//         repl: '$2/$1'
//       }
//     case 3:
//       return {
//         regex: /(.[\d])-(.\d)-./,
//         repl: '$2/$1'
//       }
//     case 4:
//       return {
//         regex: /(.[\d])-.\d-./,
//         repl: '$1'
//       }
//     case DDMMYYYY:
//       return {
//         regex: /^(\d{4})-(\d{2})-(\d{2}).*/,
//         repl: '$3/$2/$1'
//       }
//     case 5:
//     default:
//       return {
//         regex: /.-(.\d)-(.\d)T(.):.*/,
//         repl: '$2/$1 - $3'
//       }
//   }
// }
// export default (value, period) => {
//   if (!value) return
//   const { regex, repl } = dateMask(period)
//   return value.replace(regex, repl)
// }