### 介绍
纯前端js将html导出word文档doc文档(含样式、图片、canvas等元素), 没有其他依赖，支持排除指定样式

### 示例
[http://199311.xyz/export-doc/example/index.html](http://199311.xyz/export-doc/example/index.html)

### 构建
```shell
npm run build
```

### 使用
- 详见`example/index.html`
``` html
<script src="../dist/export-doc.js"></script>
<script>
ExportDoc.toWord('#test-word', {
	title: '关于导出王麻子这件事情',
	time: '2024年8月15日 上午10点',
	fileName: '剑来.doc', // 导出文件名
	maxWidth: 550, // 正文图片最大宽度,
    	blob: false, // 返回结果为blob
	exclude: ['.not-export', '.not-export1'] // // 排除元素选择器
})
</script>
```
