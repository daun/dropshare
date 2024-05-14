import { createElement, FileCode, FileDown, FileText, FileType, PackageOpen } from 'lucide'

const previewTypes = [
  "com.compuserve.gif",
  "public.plain-text",
  "public.png",
  "public.jpeg",
  "public.svg-image",
]

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

const icons = {
  "public.plain-text": FileText,
  "public.rtf": FileText,
  "net.daringfireball.markdown": FileText,

  "public.html": FileCode,
  "public.css": FileCode,
  "public.javascript-source": FileCode,
  "com.netscape.javascript-source": FileCode,

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

function updatePreview() {
  const preview = document.getElementById("preview")
  const fileType = document.body.getAttribute("data-file-type")
  const hasPreview = previewTypes.indexOf(fileType) >= 0 || videoTypes.indexOf(fileType) >= 0
  const isVideoFile = videoTypes.indexOf(fileType) >= 0

  if (isVideoFile) {
    preview.innerHTML = '<video controls src="__PREVIEWURL__"></video>'
    return
  }

  if (!hasPreview) {
    const icon = createIcon(getIconForType(fileType))
    preview.innerHTML = ""
    preview.appendChild(icon)
  }
}

updatePreview()
