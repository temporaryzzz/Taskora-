export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name:string, value: string) {
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 2)
  let updatedCookie = ''
  if(name == 'token') {
    updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + `; HttpOnly; path=/; expires=${expirationDate.toUTCString()}`
    console.log('updatedCookie:', updatedCookie)
  }
  else {
    updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + `; path=/; expires=${expirationDate.toUTCString()}`
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent("") + "; path=/; max-age=-1"
}