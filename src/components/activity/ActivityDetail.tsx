import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../../PageInfoContext';
import apiFetch from '../../api';



export const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [detail, setDetail] = React.useState<any | undefined>(undefined);
    const [content, setContent] = React.useState<string>('');
    const [msg, setMsg] = React.useState<string>('Loading');
    React.useEffect(() => {
        if (id ) {
            const fetchData = async () => {
            try {
                const data = await apiFetch('activity/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'id': id}),
                });
                if(data.length === 0){
                    setMsg('No data available');
                }else{
                    setDetail(data[0]);
                    setContent(data[0].content);
                }
            } catch (error) {
                console.error('Error fetching activity data:', error);
                setMsg('Error fetching activity data');
            }
            };
            fetchData();
            
        } else {
            setDetail(undefined);
        }
    }, [id]); 
    React.useEffect(() => {
        if (detail) {
            setPageInfo(detail.name);
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
                {/* 使用 react-quill 渲染富文本内容 */}
                    <ReactQuill ref={quillRef} value={content} readOnly={true}   onChange={setContent}
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