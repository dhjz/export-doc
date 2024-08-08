import { saveAs } from 'file-saver';
import { formatDate } from './util';
// import JSZip from 'jszip';

export function setStyle(ele) {
  if (ele.nodeName.toLowerCase() != 'img') {
    let sty = getComputedStyle(ele)
    ele.setAttribute('style', (ele.getAttribute('style') || '') + `;font-size: ${sty.fontSize};color: ${sty.color};font-style: ${sty.fontStyle};line-height: ${sty.lineHeight};font-weight: ${sty.fontWeight};
      font-family: ${sty.fontFamily};text-align: ${sty.textAlign};text-indent: ${sty.textIndent}; margin: ${sty.margin}; padding: ${sty.padding};`);
  }
}

export async function toWord(contEl, option) {
  // maxWidth?: number, title?:string, fileName?: string, isZip?: boolean, proxyHost?: string
  if (!contEl) return console.warn('未传入导出元素')
  if (typeof contEl === 'string') contEl = document.getElementById(contEl) || document.querySelector(contEl)
  let options = Object.assign({
    fileName: `word_${formatDate('yyyyMMddhhmmss')}`,
    maxWidth: 550,
    isZip: false
  }, option || {})
  // if (!window.contIframe) {
  //   window.contIframe = document.createElement('iframe');
  //   window.contIframe.style = 'display: none;width:100%;'
  //   document.body.appendChild(window.contIframe);
  // }
  // window.contIframe.contentDocument.body.appendChild(contEl);
  let result = {
    title: '',
    size: 0,
    imgs: []
  }
  let topstr = 'xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"'
  let headstr = '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val=\"Cambria Math\"/><m:brkBin m:val=\"before\"/><m:brkBinSub m:val=\"--\"/><m:smallFrac m:val=\"off\"/><m:dispDef/><m:lMargin m:val=\"0\"/> <m:rMargin m:val=\"0\"/><m:defJc m:val=\"centerGroup\"/><m:wrapIndent m:val=\"1440\"/><m:intLim m:val=\"subSup\"/><m:naryLim m:val=\"undOvr\"/></m:mathPr></w:WordDocument></xml><![endif]-->'
  let mhtml = {
    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + `\n\n<!DOCTYPE html>\n<html ${topstr}>\n_html_</html>`,
    head: `<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n${headstr}\n<style>\n_styles_\n</style>\n</head>\n`,
    body: "<body>_body_</body>"
  };
  let domWrap = contEl // .cloneNode(true);

  // Remove hidden elements from the output  
  Array.from(domWrap.querySelectorAll('*')).forEach((item) => {
    if (getComputedStyle(item).display == 'none') return item.remove()
    setStyle(item)
  });

  let imgs = domWrap.querySelectorAll('img');
  console.log('加载图片数量: ', imgs.length, options.title || options.fileName);
  await Promise.all(Array.from(imgs).filter(x => !x.src.startsWith('data')).map(tempimg => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = options.proxyHost ? tempimg.src.replace(location.host, options.proxyHost) : tempimg.src
    // console.log('**********', tempimg.src, img.src);
    return new Promise((resolve, reject) => {
      try {
        img.onload = function () {
          // if (img.getAttribute('loaded')) return resolve(1)
          img.onload = null
          const cw = Math.min(img.width, options.maxWidth);
          const ch = img.height * (cw / img.width);
          const canvas = document.createElement("CANVAS");
          canvas.width = cw;
          canvas.height = ch;
          const context = canvas.getContext('2d');
          context?.drawImage(img, 0, 0, cw, ch);
          const uri = canvas.toDataURL("image/jpg", 0.8);
          tempimg.src = uri
          const w = Math.min(img.width, 550, options.maxWidth); // word图片最大宽度
          tempimg.width = w;
          tempimg.height = img.height * (w / img.width);
          console.log('onload...', options.fileName, img.src, img.width, img.height, cw, ch, w, tempimg.height);
          canvas.remove()
          result.imgs.push({
            src: img.src,
            width: cw.toFixed(0),
            height: ch.toFixed(0),
            size: uri.split('base64,')[1].length * 0.75
          })
          resolve(img.src)
        }
        img.onerror = function() {
          console.log('img load error, ', img.src)
          result.imgs.push({
            src: '请求失败: '+ img.src,
            width: 0,
            height: 0
          })
          resolve('')
        }
      } catch (e) { console.log(e);resolve('') }
    })
  }))

  let canvasList = domWrap.querySelectorAll('canvas');
  console.log('加载canvas数量: ', canvasList.length, options.title || options.fileName);
  await Promise.all(Array.from(canvasList).map(tempCanvas => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    return new Promise((resolve, reject) => {
      try {
        img.src = tempCanvas.toDataURL("image/jpg", 0.8)
        img.style = `width: ${tempCanvas.width}px;height:${tempCanvas.height}px;display:inline-block;`
        var parent = tempCanvas.parentNode;
        if (tempCanvas.nextSibling) {
            parent.insertBefore(img, tempCanvas.nextSibling);
        } else {
            parent.appendChild(img);
        }
        tempCanvas.remove()
        resolve('')
      } catch (e) { console.log(e);resolve('') }
    })
  }))

  let exthtml = (options.title ? `<h1 style="text-align:center">${options.title}</h1>` : '') + (options.time ? `<p style="text-align:center">${options.time}</p>` : '')
  let styles = "";
  let fileContent = mhtml.top.replace("_html_", mhtml.head.replace("_styles_", styles) + mhtml.body.replace("_body_", exthtml + domWrap.innerHTML));
  let blob = new Blob([fileContent], { type: "application/msword;charset=utf-8" });
  console.log('即将生成文件大小: ', blob.size, (blob.size / 1024 / 1024).toFixed(2) + 'M');
  result.size = blob.size
  result.title = options.title || options.fileName
  // if (options.isZip && JSZip) {
  //   if (!window.zipFile) window.zipFile = new JSZip();
  //   window.zipFile.file(options.fileName + ".doc", blob);
  //   return result
  // }
  saveAs(blob, options.fileName + ".doc");
  return result
}

// export function delZip() {
//   window.zipFile = null
//   if (window.contIframe) window.contIframe.contentDocument.body.innerHTML = ''
// }

// export function downZip() {
//   if (window.zipFile) {
//     window.zipFile.generateAsync({type:'blob'}).then(function(content) {
//       saveAs(content, 'files_' + formatDate(new Date(), 'hhmmss') + '.zip');
//     })
//   }
//   if (window.contIframe) window.contIframe.contentDocument.body.innerHTML = ''
// }