export function formatDate(fmt, date) {
  if (!date) date = new Date()
  if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}

export function setStyle(ele, sty) {
  if (ele.nodeName.toLowerCase() != 'img') {
    // let sty = getComputedStyle(ele)
    ele.setAttribute('style', (ele.getAttribute('style') || '') + `;font-size: ${sty.fontSize};color: ${sty.color};font-style: ${sty.fontStyle};line-height: ${sty.lineHeight};font-weight: ${sty.fontWeight};
      font-family: ${sty.fontFamily};text-align: ${sty.textAlign};text-indent: ${sty.textIndent}; margin: ${sty.margin}; padding: ${sty.padding};`);
  }
}

export function saveAs(blob, fileName) {
    var URL = window.URL || window.webkitURL;
    var a = document.createElement('a');
    fileName = fileName || blob.name || 'download';
    a.download = fileName;
    a.rel = 'noopener';
    a.target = '_blank'

    if (typeof blob === 'string') {
      a.href = blob;
      a.click()
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(() => a.click(), 0);
      setTimeout(() => URL.revokeObjectURL(a.href), 2E4); // 20s
    }
}