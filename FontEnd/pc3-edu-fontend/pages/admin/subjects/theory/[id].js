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
import Editor from "../../../../comps/Ckeditor";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { toast } from "react-toastify";

const Theory = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

  const [theory, setTheory] = useState();
  const [lession, setLession] = useState();
  const [unit, setUnit] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();

  async function getContentOfLession() {
    const url = "http://localhost:8000/api/lession/" + lessionID;
    const res = await axios.get(url);
    setTheory(res.data.theory);
    if (res.data.theory) {
      setContent(res.data.theory.content);
    }
    setLession(res.data.lession);
    setUnit(res.data.unitOfLession);
    setSubject(res.data.subjectOfUnit);
  }

  useEffect(() => {
    setEditorLoaded(true);
    getContentOfLession();
  }, []);

  async function handleAddTheory() {
    if (lession._id && content != null) {
      try {
        const newTheory = {
          lessionID: lession._id,
          content,
        };
        const res = await axios.post(
          "http://localhost:8000/api/theory/create",
          newTheory
        );

        toast.success("thêm mới lý thuyết thành công");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    } else {
      alert("lỗi thêm mới lý thuyết");
    }
  }
  async function handleUpdateTheory() {
    if (theory != null) {
      const theoryUpdate = {
        content: content,
        lessionID: lession._id,
      };
      try {
        const url = "http://localhost:8000/api/theory/update/" + theory._id;
        const res = await axios.put(url, theoryUpdate);
        toast.success("cập nhật lý thuyết thành công");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    } else {
      alert("lý thuyết môn học không tồn tại");
    }
  }

  const onChangeEditor = () => {};

  return (
    <div className="admin-subject-theory-page">
      <div className="admin-subject-theory-header">
        <span>Thêm mới lý thuyết</span>
      </div>
      <div className="admin-subject-theory-title">
        <span>
          {subject?.name} lớp {subject?.gradeID} - {unit?.unitName}
        </span>
        <br></br>
        <span>{lession?.lessionName}</span>
      </div>
      <div className="admin-subject-theory-content">
        <span>nội dung lý thuyết bài học</span>

        {theory != null ? (
          <Editor
            name="description"
            onChange={(data) => {
              //console.log("data:", data); khi nội dung ckeditor thay đổi data thay đổi
              setContent(data);
            }}
            editorLoaded={editorLoaded}
            value={`${theory?.content}`}
          />
        ) : (
          <Editor
            name="description"
            onChange={(data) => {
              //console.log(data);
              setContent(data);
            }}
            editorLoaded={editorLoaded}
            value
          />
        )}
      </div>
      <div className="admin-function-theory">
        <Button
          variant="primary"
          onClick={() => {
            if (theory != null) {
              handleUpdateTheory();
            } else {
              handleAddTheory();
            }
          }}
        >
          Lưu
        </Button>
        <Button variant="primary">Hủy bỏ</Button>
      </div>
    </div>
  );
};
Theory.layout = "adminLayout";
export default Theory;
