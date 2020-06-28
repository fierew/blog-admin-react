import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, Prompt } from 'umi';
import { Modal, Input, Form, Select, Tag, Spin } from 'antd';
import { preview } from '@/utils/preview';

declare global {
  interface Window {
    previewWindow: any;
    tinymce: any;
    publicPath: string;
  }
}

// 富文本框内容
let editorContent = '';

export default () => {
  const [value, setValue] = useState('');
  const [formIsHalfFilledOut, setFormIsHalfFilledOut] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { tinymce } = window;

  // 初始化模态框的标题
  if (id !== undefined) {
    useEffect(() => {
      setModelTitle('编辑文章');
    }, []);
  } else {
    useEffect(() => {
      setModelTitle('发布文章');
    }, []);
  }

  // 富文本框输入内容时的回调
  const handleEditorChange = (content: any, editor: any) => {
    setValue(content);
    editorContent = content;
    setFormIsHalfFilledOut(
      content !== '' && content !== '<p></p>' ? true : false,
    );
    //console.log('Content was updated:', editorContent);
  };

  // 初始化富文本
  const editorObj = {
    height: 'calc(100vh - 64px)',
    language: 'zh_CN',
    plugins:
      'print importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    mobile: {
      plugins:
        'print importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
      menubar: true,
      toolbar_mode: 'sliding', // 'floating'，'sliding'，'scrolling'，或者'wrap'
    },
    menu: {
      tc: {
        title: 'TinyComments',
        items: 'addcomment showcomments deleteallconversations',
      },
    },
    menubar: 'file edit view insert format tools table tc help',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen mypreview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
    autosave_ask_before_unload: true,
    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'http://www.tinymce.com' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' },
    ],
    image_list: [
      { title: 'My page 1', value: 'http://www.tinymce.com' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' },
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' },
    ],
    importcss_append: true,
    templates: [
      {
        title: 'New Table',
        description: 'creates a new table',
        content:
          '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...',
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content:
          '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
      },
    ],
    template_cdate_format: '[创建时间: %Y-%m-%d %H:%M:%S]',
    template_mdate_format: '[修改时间: %Y-%m-%d %H:%M:%S]',
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    spellchecker_whitelist: ['Ephox', 'Moxiecode'],
    tinycomments_mode: 'embedded',
    content_style: '.mymention{ color: gray; }',
    contextmenu: 'link image imagetools table configurepermanentpen',
    a11y_advanced_options: true,
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
    content_css: [window.publicPath + 'prism/prism.css'],
    setup: (editor: any) => {
      // 新增自定义浏览按钮
      editor.ui.registry.addButton('mypreview', {
        tooltip: '预览',
        icon: 'preview',
        onAction: () => {
          preview(editorContent);
        },
      });
    },
    relative_urls: false, // 相对url
    file_picker_types: 'file', // 文件选取器内容
    image_uploadtab: true, // 图片上传选项卡
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
      //这里写你上传图片的方法
    },
    save_onsavecallback: function() {
      // 保存回调

      if (editorContent !== '' && editorContent !== '<p></p>') {
        //console.log(editorContent);

        setVisible(true);
      }

      //tinymce.activeEditor.execCommand('mceCancel');
    },
    save_oncancelcallback: function() {
      console.log('Save canceled');
    },
  };

  // 编辑框确定
  const handleOk = (e: any) => {
    setVisible(false);
  };

  // 编辑框取消
  const handleCancel = (e: any) => {
    setVisible(false);
  };

  // 根据后端返回的数据生成颜色对象
  const colors: any = {
    docker: 'red',
  };

  // 多选框显示标签
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

  // 模态框
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

  const onInit = () => {
    setLoading(false);
  };

  return (
    <div>
      <Prompt when={formIsHalfFilledOut} message="你确定要离开么？" />
      <div style={{ textAlign: 'center' }}>
        <Spin
          style={{
            borderRadius: 4,
            marginBottom: 20,
            paddingTop: 100,
          }}
          size="large"
          spinning={loading}
        />
      </div>
      {model}
      <Editor
        inline={false}
        initialValue={value}
        init={{ ...editorObj }}
        onEditorChange={handleEditorChange}
        onInit={onInit}
      />
    </div>
  );
};
