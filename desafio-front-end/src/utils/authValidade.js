export const authValidate = () => {
  const hasPermition = localStorage.getItem('hasPermition')
  console.log(hasPermition)

  if (hasPermition === 'false') {
    localStorage.removeItem('hasPermition')
    window.location.assign('/') 
  }
}