import { formatDate, setStyle, saveAs } from './util';

// maxWidth?: number, title?: string, fileName?: string, time?: string, proxyHost?: string, exclude?: array
export async function toWord(contEl, option) {
  let options = Object.assign({
    fileName: `word_${formatDate('yyyyMMddhhmmss')}`, // 导出文件名
    maxWidth: 550, // 图片最大宽度,
    title: '', // 导出添加一级标题
    time: '', // 导出添加文章时间
    blob: false, // 返回结果为blob
    exclude: [] // 排除元素选择器
  }, option || {})

  if (!contEl) return console.warn('未传入导出元素')
  if (typeof contEl === 'string') contEl = document.getElementById(contEl) || document.querySelector(contEl)

  // 设置标记, 方便复制样式
  Array.from(contEl.querySelectorAll('*')).forEach((item) => {
    item.setAttribute('data-toword', Math.random().toString(32).slice(-5))
  })

  if (!window.contIframe) {
    window.contIframe = document.createElement('iframe')
    window.contIframe.style = 'display: none; width:100%;'
    document.body.appendChild(window.contIframe)
  }
  let cloneEl = contEl.cloneNode(true)
  cloneEl.style.width = getComputedStyle(contEl).width
  window.contIframe.contentDocument.body.appendChild(cloneEl)
  let domWrap = cloneEl // .cloneNode(true)

  // 1. 删除隐藏的元素, 并且将元素样式设置为行内样式, 方便word识别
  Array.from(domWrap.querySelectorAll('*')).forEach((item) => {
    let attr = item.getAttribute('data-toword')
    let originItem = contEl.querySelector('[data-toword="' + attr +  '"]')
    if (originItem) {
      let sty = getComputedStyle(originItem)
      if (sty.display == 'none ') return item.remove()
      setStyle(item, sty)
    }
  })
  // 1.1 删除排除的元素
  if (Array.isArray(options.exclude) && options.exclude.length) {
    options.exclude.forEach(ext => {
      Array.from(domWrap.querySelectorAll(ext)).forEach((item) => item.remove())
    })
  }

  // 2. 将图片转为Base64编码, 方便word保存
  let imgList = domWrap.querySelectorAll('img')
  console.log('加载图片数量: ', imgList.length)
  await Promise.all(Array.from(imgList).filter(x => !x.src.startsWith('data')).map(tempimg => {
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = options.proxyHost ? tempimg.src.replace(location.host, options.proxyHost) : tempimg.src
    return new Promise((resolve, reject) => {
      try {
        img.onload = function () {
          img.onload = null
          const cw = Math.min(img.width, options.maxWidth)
          const ch = img.height * (cw / img.width)
          const canvas = document.createElement("CANVAS")
          canvas.width = cw
          canvas.height = ch
          const context = canvas.getContext('2d')
          context?.drawImage(img, 0, 0, cw, ch)
          const uri = canvas.toDataURL("image/jpg", 0.8)
          tempimg.src = uri
          const w = Math.min(img.width, 550, options.maxWidth) // word图片最大宽度
          tempimg.width = w
          tempimg.height = img.height * (w / img.width)
          console.log('img onload...', options.fileName, img.src, img.width, img.height, cw, ch, w, tempimg.height)
          canvas.remove()
          resolve(img.src)
        }
        img.onerror = function() {
          console.log('img load error, ', img.src)
          resolve('')
        }
      } catch (e) { console.log(e);resolve('') }
    })
  }))

  // 3. 将canvas转为Base64编码, 方便word保存
  let canvasList = domWrap.querySelectorAll('canvas')
  console.log('加载canvas数量: ', canvasList.length)
  await Promise.all(Array.from(canvasList).map(tempCanvas => {
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous');
    return new Promise((resolve, reject) => {
      try {
        let attr = tempCanvas.getAttribute('data-toword')
        let cvs = contEl.querySelector('[data-toword="' + attr +  '"]')
        console.log(cvs, attr);
        if (!cvs) return resolve()
        img.src = cvs.toDataURL("image/jpg", 0.8)
        const w = Math.min(cvs.width, options.maxWidth)
        const h = cvs.height * (w / cvs.width)
        img.width = w
        img.height = h
        const parent = tempCanvas.parentNode
        if (tempCanvas.nextSibling) {
            parent.insertBefore(img, tempCanvas.nextSibling)
        } else {
            parent.appendChild(img)
        }
        tempCanvas.remove()
        resolve('')
      } catch (e) { console.log(e);resolve('') }
    })
  }))

  Array.from(contEl.querySelectorAll('*')).forEach((item) => {
    item.removeAttribute('data-toword')
  })

  // 4. 将html内容写入word模版中
  let topstr = 'xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"'
  let headstr = '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val=\"Cambria Math\"/><m:brkBin m:val=\"before\"/><m:brkBinSub m:val=\"--\"/><m:smallFrac m:val=\"off\"/><m:dispDef/><m:lMargin m:val=\"0\"/> <m:rMargin m:val=\"0\"/><m:defJc m:val=\"centerGroup\"/><m:wrapIndent m:val=\"1440\"/><m:intLim m:val=\"subSup\"/><m:naryLim m:val=\"undOvr\"/></m:mathPr></w:WordDocument></xml><![endif]-->'
  let mhtml = {
    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + `\n\n<!DOCTYPE html>\n<html ${topstr}>\n_html_</html>`,
    head: `<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n${headstr}\n<style>\n_styles_\n</style>\n</head>\n`,
    body: "<body>_body_</body>"
  };

  let exthtml = (options.title ? `<h1 style="text-align:center">${options.title}</h1>` : '') + (options.time ? `<p style="text-align:center">${options.time}</p>` : '')
  let styles = "";
  let fileContent = mhtml.top.replace("_html_", mhtml.head.replace("_styles_", styles) + mhtml.body.replace("_body_", exthtml + domWrap.innerHTML));
  let blob = new Blob([fileContent], { type: "application/msword;charset=utf-8" });
  console.log('即将生成文件大小: ', blob.size, (blob.size / 1024 / 1024).toFixed(2) + 'M');
  if (options.blob) return blob
  saveAs(blob, options.fileName + ".doc");
}