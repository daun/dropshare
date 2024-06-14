import hljs from 'highlight.js/lib/core'
import markdown from 'highlight.js/lib/languages/markdown'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import php from 'highlight.js/lib/languages/php'

hljs.registerLanguage("markdown", markdown)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("php", php)

const codeTypes = [
  "public.plain-text",
  "public.html",
  "public.css",
  "public.javascript-source",
  "com.netscape.javascript-source",
  "net.daringfireball.markdown"
]

const codeLanguages = {
  "public.plain-text": "plaintext",
  "net.daringfireball.markdown": "markdown",
  "public.html": "html",
  "public.css": "css",
  "public.javascript-source": "javascript",
  "com.netscape.javascript-source": "javascript",
  "public.mpeg-2-transport-stream": "typescript",
  "public.php-script": "php",
}

const fallbackLanguage = "plaintext"

export function isCodeMimetype(type) {
  return codeTypes.includes(type)
}

function getCodeLanguage(type) {
  return codeLanguages[type] || type || fallbackLanguage
}

// async function loadHighlightJs() {
//   await Promise.all([
//     import("highlight.js/lib/languages/markdown"),
//     import("highlight.js/lib/languages/xml"),
//     import("highlight.js/lib/languages/css"),
//     import("highlight.js/lib/languages/javascript"),
//     import("highlight.js/lib/languages/typescript"),
//     import("highlight.js/lib/languages/php"),
//   ])
// }

export async function createCodeBlock(url, fileType = null) {
  const language = getCodeLanguage(fileType)
  const { content } = await loadFile(url)

  const text = document.createTextNode(content)
  const code = document.createElement("code")
  code.appendChild(text)
  code.classList.add(`language-${language}`)

  const pre = document.createElement("pre")
  pre.appendChild(code)

  return pre
}

export function highlightCodeBlocks() {
  hljs.highlightAll()
}

async function loadFile(url) {
  const response = await fetch(url)
  const content = await response.text()
  const type = response.headers.get("Content-Type")
  return { content, type }
}
