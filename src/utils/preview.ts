// 浏览功能模板
const buildPreviewHtml = (content: string) => {
  const host = window.location.protocol + '//' + window.location.host;
  return `<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <base href="${host}/">
                <link type="text/css" rel="stylesheet" href="tinymce/skins/ui/oxide/content.min.css">
                <link type="text/css" rel="stylesheet" href="prism/prism.css">
            </head>
            <body id="tinymce" class="mce-content-body ">
                ${content}
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
