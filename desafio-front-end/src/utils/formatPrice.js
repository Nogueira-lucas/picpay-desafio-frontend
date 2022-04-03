const formatPrice = (price, currency) => {
  const formatedPrice = price 
    ? price.toFixed(2).toString()
    .replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : '0,00'
    return `${currency} ${formatedPrice}`.trim()
}

export default formatPrice