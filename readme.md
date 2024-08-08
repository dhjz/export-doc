### 介绍
纯前端js将html导出word文档doc文档(含样式、图片、canvas等元素), 没有其他依赖，支持排除指定样式

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
	fileName: '剑来.doc',
	exclude: ['.not-export', '.not-export1']
})
</script>
```