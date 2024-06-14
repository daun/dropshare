let hljs = null

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

const languageImports = {
  "markdown": () => import("highlight.js/lib/languages/markdown"),
  "html": () => import("highlight.js/lib/languages/xml"),
  "css": () => import("highlight.js/lib/languages/css"),
  "javascript": () => import("highlight.js/lib/languages/javascript"),
  "typescript": () => import("highlight.js/lib/languages/typescript"),
  "php": () => import("highlight.js/lib/languages/php"),
}

export function isCodeMimetype(fileType) {
  return (fileType in codeLanguages)
}

function getCodeLanguage(fileType) {
  return codeLanguages[fileType] || fileType || fallbackLanguage
}

export async function createCodeBlock(url, fileType = null) {
  const language = getCodeLanguage(fileType)
  const { content } = await loadFile(url)

  await loadHighlightJs()
  await loadHighlightJsLanguage(language)

  const text = document.createTextNode(content)
  const code = document.createElement("code")
  code.appendChild(text)
  code.classList.add(`language-${language}`)

  const pre = document.createElement("pre")
  pre.appendChild(code)

  return pre
}

export function highlightCodeBlocks() {
  hljs?.highlightAll()
}

async function loadHighlightJs() {
  ({ default: hljs} = await import("highlight.js"))
}

async function loadHighlightJsLanguage(language) {
  const importFn = languageImports[language]
  if (!importFn) return

  const { default: languageMode } = await importFn()
  hljs.registerLanguage(language, languageMode)
}

async function loadFile(url) {
  const response = await fetch(url)
  const content = await response.text()
  const type = response.headers.get("Content-Type")
  return { content, type }
}
