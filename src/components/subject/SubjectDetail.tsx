import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../../PageInfoContext';
import { Alert } from '@mui/material';

const mockData = [
    {
      id: '001',
      title: 'React 入门课程',
      description: '学习 React 的基础知识和应用。',
      content: `<h1>活动一简介</h1>
                <p>这是一个关于如何组织和参与社区服务活动的详细指南。活动包括了从准备到执行的每一个步骤。</p>`
    },
    {
      id: '002',
      title: '高级 JavaScript',
      description: '深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。',
      content: `<h1>活动二简介</h1>
      <p>本次活动旨在提高公众对环境保护重要性的认识。</p>
      <img src="https://picsum.photos/200/300" alt="活动二图片" width="1200px"/>`
    },
    {
      id: '003',
      title: '全栈开发',
      description: '掌握前端和后端开发技能。',
      content: `<h1>活动二简介</h1>
      <p>本次活动旨在提高公众对环境保护重要性的认识。</p>
      <img src="https://picsum.photos/200/300" alt="活动二图片" width="1200px"/>`
    },
  ];

export const SubjectDetail: React.FC = () => {
    const { sid } = useParams<{ sid: string }>();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    
    
    const [detail, setDetail] = React.useState<any | undefined>(undefined);
    const [content, setContent] = React.useState<string>('');
    React.useEffect(() => {
        const subj = mockData.find(subj => subj.id === sid);
        if (subj) {
            setDetail(subj);
            setContent(subj.content);
        } else {
            setDetail(undefined);
        }
    }, [sid]);
    React.useEffect(() => {
       console.log(content);
    }, [content]);
    React.useEffect(() => {
        if (detail) {
            setPageInfo(detail.title);
        }
    }, [detail, setPageInfo]);
    const quillRef = React.useRef<any>(null);
    const modules = {
        toolbar:false
        //  [
        //   [{ 'header': [1, 2, false] }],
        //   ['bold', 'italic', 'underline','strike', 'blockquote'],
        //   [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        //   ['link', 'image'], // 这里添加了'image'按钮
        //   ['clean']
        // ],
      };
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
    return (
        <div style={{ padding: '0px' }}>
            {detail ? (
                <>
                <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
                    {detail.description}
                </Alert>
                {
                /* 使用 react-quill 渲染富文本内容 */}
                    <ReactQuill ref={quillRef} value={content} readOnly={true}   onChange={setContent}
                        theme="snow" 
                        modules={modules}
                        formats={formats}
                        />
                </>
            ) : (
                <p>活动未找到。</p>
            )}
        </div>
    );
};