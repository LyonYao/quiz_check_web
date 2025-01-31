import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../PageInfoContext';
import { Alert } from '@mui/material';


export const ContentEdit: React.FC = () => {
    const { sid } = useParams<{ sid: string }>();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [content, setContent] = React.useState<string>('');

    React.useEffect(() => {
       console.log(content);
    }, [content]);
    React.useEffect(() => {
        setPageInfo("内容编辑页面");
    }, [ setPageInfo]);
    const quillRef = React.useRef<any>(null);
    const modules = {
        toolbar:
         [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'], // 这里添加了'image'按钮
          ['clean']
        ],
      };
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
    return (
        <div style={{ padding: '0px' }}>
            <ReactQuill ref={quillRef} value={content} readOnly={false}   onChange={setContent}
                        theme="snow" 
                        modules={modules}
                        formats={formats}
                        />
        </div>
    );
};