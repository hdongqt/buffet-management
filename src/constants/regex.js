const REGEX = {
  PHONE_VN: /^(0[3|5|7|8|9])[0-9]{8}$/,
  PRICE: /\B(?=(\d{3})+(?!\d))/g,
  NUMBER: /\D/g,
}

export default REGEX
