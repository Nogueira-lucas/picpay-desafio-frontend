export const authValidate = () => {
  const hasPermition = localStorage.getItem('hasPermition')
  if (hasPermition !== 'true') {
    localStorage.removeItem('hasPermition')
    window.location.assign('/') 
  }
}