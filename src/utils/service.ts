export const base64ToHex = (str: string) => {
  const raw = window.atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

export const hexToBase64 = (hexstring: string) => {
  return window.btoa(hexstring.match(/\w{2}/g).map(function(a) {
      return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}
