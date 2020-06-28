// 浏览功能模板
const buildPreviewHtml = (content: string) => {
  const host = window.location.protocol + '//' + window.location.host;

  const ua = navigator.userAgent;
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;

  let tempCss = 'content.min.css';

  if (isMobile) {
    tempCss = 'content.mobile.min.css';
  }

  return `<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <base href="${host}/article/">
                <link type="text/css" rel="stylesheet" href="${host}/tinymce/skins/ui/oxide/${tempCss}">
                <link type="text/css" rel="stylesheet" href="${host}/prism/prism.css">
                <script src="${host}/prism/prism.js"  ></script>
            </head>
            
            <body id="tinymce" class="mce-content-body ">
                ${content}
                <script>document.addEventListener && document.addEventListener("click", function (e) { for (var elm = e.target; elm; elm = elm.parentNode) { if (elm.nodeName === "A" && !(e.metaKey)) { e.preventDefault(); } } }, false);</script>
            </body>
        </html>`;
};

const preview = (content: string) => {
  if (window.previewWindow) {
    window.previewWindow.close();
  }

  window.previewWindow = window.open();
  window.previewWindow.document.write(buildPreviewHtml(content));
  window.previewWindow.document.close();
};

export { preview };
