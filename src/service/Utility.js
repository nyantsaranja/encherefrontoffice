export function formatDate(date) {
    if (date === undefined) return "";
    let dateValidation = date;
    dateValidation = dateValidation.split("T")
    dateValidation = dateValidation[0] + ' ' + dateValidation[1];
    return dateValidation.slice(0, 19)
}

export const varToString = varObj => Object.keys(varObj)[0]

export const redirectNotConnected = () => {
  if(sessionStorage.getItem("user")===undefined || sessionStorage.getItem("user")==="" || sessionStorage.getItem("user")===null){
      window.location.href=""
  }
}
