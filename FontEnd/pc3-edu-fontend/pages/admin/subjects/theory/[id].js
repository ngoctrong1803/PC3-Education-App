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
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../redux/authSlice";
import useTeacherAuth from "../../../../hooks/authTeacherHook";

const Theory = () => {
  console.log("editer:", typeof Editor);
  if (typeof Editor !== "function") {
    window.location.reload();
  }
  const isTeacher = useTeacherAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
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
    const url = "/api/lession/" + lessionID;
    const res = await axiosJWT.get(url);
    setTheory(res.data.theory);
    if (res.data.theory) {
      setContent(res.data.theory.content);
    }
    setLession(res.data.lession);
    setUnit(res.data.unitOfLession);
    setSubject(res.data.subjectOfUnit);
  }

  useEffect(() => {
    if (isTeacher) {
      setEditorLoaded(true);
      getContentOfLession();
    }
  }, []);

  async function handleAddTheory() {
    if (lession._id && content != null) {
      try {
        const newTheory = {
          lessionID: lession._id,
          content,
        };
        const res = await axiosJWT.post("/api/theory/create", newTheory);

        toast.success("th??m m???i l?? thuy???t th??nh c??ng");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    } else {
      toast.error("l???i th??m m???i l?? thuy???t");
    }
  }
  async function handleUpdateTheory() {
    if (theory != null) {
      const theoryUpdate = {
        content: content,
        lessionID: lession._id,
      };
      try {
        const url = "/api/theory/update/" + theory._id;
        const res = await axiosJWT.put(url, theoryUpdate);
        toast.success("c???p nh???t l?? thuy???t th??nh c??ng");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    } else {
      alert("l?? thuy???t m??n h???c kh??ng t???n t???i");
    }
  }

  const onChangeEditor = () => {};

  return (
    <div className="admin-subject-theory-page">
      <div className="admin-subject-theory-header">
        <span>Th??m m???i l?? thuy???t</span>
        <Button
          variant="outline-warning"
          onClick={() => {
            window.history.back();
          }}
        >
          quay l???i
        </Button>
      </div>
      <div className="admin-subject-theory-title">
        <span>
          {subject?.name} l???p {subject?.gradeID} - {unit?.unitName}
        </span>
        <br></br>
        <span>{lession?.lessionName}</span>
      </div>
      <div className="admin-subject-theory-content">
        <span>n???i dung l?? thuy???t b??i h???c</span>

        {theory != null ? (
          <Editor
            name="description"
            onChange={(data) => {
              //console.log("data:", data); khi n???i dung ckeditor thay ?????i data thay ?????i
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
          L??u
        </Button>
        <Button variant="primary">H???y b???</Button>
      </div>
    </div>
  );
};
Theory.layout = "adminLayout";
export default Theory;
