import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, Prompt } from 'umi';
import { Modal, Input, Form, Select, Tag } from 'antd';

declare global {
  interface Window {
    previewWindow: any;
    tinymce: any;
  }
}

let editorContent = '';

export default () => {
  const [value, setValue] = useState('');
  const [formIsHalfFilledOut, setFormIsHalfFilledOut] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const { id } = useParams();

  if (id !== undefined) {
    useEffect(() => {
      setModelTitle('编辑文章');
    }, []);
  } else {
    useEffect(() => {
      setModelTitle('发布文章');
    }, []);
  }

  const { tinymce } = window;

  const handleEditorChange = (content: any, editor: any) => {
    setValue(content);
    editorContent = content;
    setFormIsHalfFilledOut(
      content !== '' && content !== '<p></p>' ? true : false,
    );
    //console.log('Content was updated:', editorContent);
  };

  const buildPreviewHtml = () => {
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
                ${editorContent}
                <script>document.addEventListener && document.addEventListener("click", function (e) { for (var elm = e.target; elm; elm = elm.parentNode) { if (elm.nodeName === "A" && !(e.metaKey)) { e.preventDefault(); } } }, false);</script>
            </body>
        </html>`;
  };

  const preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(buildPreviewHtml());
    window.previewWindow.document.close();
  };

  const editorObj = {
    height: 'calc(100vh - 64px)',
    language: 'zh_CN',
    plugins:
      'print paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save publish print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    mobile: {
      menubar: true,
      toolbar_mode: 'sliding', // 'floating'，'sliding'，'scrolling'，或者'wrap'
    },
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    importcss_append: true,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'React JSX', value: 'jsx' },
      { text: 'React TSX', value: 'tsx' },
    ],
    codesample_global_prismjs: true, // 使用本地全局prismjs
    save_enablewhendirty: false, // 保存按钮是否禁用 直到用户有修改行为后启动
    content_css: ['/prism/prism.css'],
    setup: (editor: any) => {
      // 新增自定义浏览按钮
      editor.ui.registry.addButton('preview', {
        tooltip: '预览',
        icon: 'preview',
        onAction: preview,
      });
    },
    // templates: [
    //     {
    //         title: "Editor Details",
    //         url: "/editor_details.html",
    //         description: "Adds Editor Name and Staff ID"
    //     },
    //     {
    //         title: "Timestamp",
    //         url: "/time.htm",
    //         description: "Adds an editing timestamp."
    //     }
    // ],
    relative_urls: false, // 相对url
    file_picker_types: 'file', // 文件选取器内容
    image_uploadtab: true, // 图片上传选项卡
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
      //这里写你上传图片的方法
    },
    save_onsavecallback: function() {
      // 保存回调

      if (editorContent !== '' && editorContent !== '<p></p>') {
        console.log(editorContent);

        setVisible(true);
      }

      //tinymce.activeEditor.execCommand('mceCancel');
    },
    save_oncancelcallback: function() {
      console.log('Save canceled');
    },
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  // 根据后端返回的数据生成颜色对象
  const colors:any = {
    'docker': 'red'
  }

  const tagRender = (optionProps: any) => {
    const { label, value, closable, onClose } = optionProps;
    const color = colors[value] ?? '#000000';
    return (
      <Tag
        color={color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const model = (
    <Modal
      title={modelTitle}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item
          name="title"
          label="标题"
          hasFeedback
          rules={[{ required: true, message: '请输入标题!' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item
          name="tag"
          label="标签"
          hasFeedback
          rules={[{ required: true, message: '请选择标签!' }]}
        >
          <Select
            mode="multiple"
            size="large"
            placeholder="select one country"
            //defaultValue={['china']}
            //optionLabelProp="label"
            labelInValue={true}
            options={[{ label: 'docker', value: 'docker' }]}
            tagRender={tagRender}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <div>
      <Prompt when={formIsHalfFilledOut} message="你确定要离开么？" />
      {model}
      <Editor
        inline={false}
        initialValue={value}
        init={{ ...editorObj }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
