export const authValidate = () => {
  const hasPermition = localStorage.getItem('hasPermition')
  console.log(hasPermition)

  if (hasPermition !== 'true') {
    localStorage.removeItem('hasPermition')
    window.location.assign('/') 
  }
}