import { createElement, FileCode, FileDown, FileText, PackageOpen } from 'lucide'

const videoTypes = [
  "public.movie",
  "public.video",
  "com.apple.quicktime-movie",
  "public.mpeg-4",
]

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

const icons = {
  "public.plain-text": FileText,
  "public.rtf": FileText,
  "net.daringfireball.markdown": FileText,

  "public.html": FileCode,
  "public.css": FileCode,
  "public.javascript-source": FileCode,
  "com.netscape.javascript-source": FileCode,
  "public.mpeg-2-transport-stream": FileCode, // *.ts
  "public.php-script": FileCode,

  "public.zip-archive": PackageOpen,
}

const fallbackIcon = FileDown

function getIconForType(type) {
  return icons[type] || fallbackIcon
}

function createIcon(icon) {
  const el = createElement(icon)
  el.classList.add("icon")
  return el
}

function createVideo(url) {
  const video = document.createElement("video")
  video.controls = true
  video.src = url
  return video
}

function getCodeLanguage(type) {
  return codeLanguages[type] || "plaintext"
}

async function updatePreview() {
  const preview = document.querySelector("#preview")

  const fileType = document.body.getAttribute("data-file-type")
  const filePath = document.body.getAttribute("data-file-path")

  const hasPreview = !!preview.querySelector('img, video, iframe')
  const isVideoFile = videoTypes.indexOf(fileType) >= 0
  const isCodeFile = codeTypes.indexOf(fileType) >= 0

  if (hasPreview && !isCodeFile) return

  preview.innerHTML = ""

  if (isCodeFile) {
    const { createCodeBlock, highlightCodeBlocks } = await import("./code.js")
    const language = getCodeLanguage(fileType)
    const codeBlock = await createCodeBlock(filePath, language)
    preview.appendChild(codeBlock)
    highlightCodeBlocks()
  } else if (isVideoFile) {
    const video = createVideo(filePath)
    preview.appendChild(video)
  } else {
    const icon = createIcon(getIconForType(fileType))
    preview.appendChild(icon)
  }
}

updatePreview()
