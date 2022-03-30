import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import Editor from "../../../comps/Ckeditor";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Theory = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onChangeEditor = () => {};

  return (
    <div className="admin-subject-theory-page">
      <div className="admin-subject-theory-header">
        <span>Thêm mới lý thuyết</span>
      </div>
      <div className="admin-subject-theory-title">
        <span>Toán học lớp 10 - Chương 1: Hàm số</span>
        <br></br>
        <span>Bài 1. Đồng biến nghịch biến của hàm số</span>
      </div>
      <div className="admin-subject-theory-content">
        <span>nội dung lý thuyết bài học</span>

        <Editor
          name="description"
          onChange={(data) => {
            console.log(data);
          }}
          editorLoaded={editorLoaded}
        />
      </div>
      <div className="admin-function-theory">
        <Button variant="primary">Lưu</Button>
        <Button variant="primary">Hủy bỏ</Button>
      </div>
    </div>
  );
};
Theory.layout = "adminLayout";
export default Theory;
