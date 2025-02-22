import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../../PageInfoContext';
import { Alert } from '@mui/material';
import apiFetch from '../../api';


export const SubjectDetail: React.FC = () => {
    const { sid } = useParams<{ sid: string }>();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [msg, setMsg] = React.useState<string>('Loading');


    const [detail, setDetail] = React.useState<any | undefined>(undefined);
    const [content, setContent] = React.useState<string>('');

    React.useEffect(() => {

        const fetchSubject = async () => {
            try {
                const data = await apiFetch('subject/content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: sid }),
                });
                if (data.length === 0) {
                    setMsg('No data available');
                } else {
                    setDetail(data[0]);
                }
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };
        fetchSubject();
    }, [sid]);
    React.useEffect(() => {
        if (detail) {
            setPageInfo(detail.title);
            setContent(detail.content);
        }
    }, [detail, setPageInfo]);
    const quillRef = React.useRef<any>(null);
    const modules = {
        toolbar: false
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
                    <ReactQuill ref={quillRef} value={content} readOnly={true} onChange={setContent}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                    />
                </>
            ) : (
                <p>{msg}</p>
            )}
        </div>
    );
};