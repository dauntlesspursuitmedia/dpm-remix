import parsePhoneNumberFromString from 'libphonenumber-js/min'

export const formatPhone = (phone: string) => {
  const number = parsePhoneNumberFromString(phone, 'US')
  if (!number) {
    return
  }
  return number.format('NATIONAL')
}
