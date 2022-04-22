import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Script from "next/script";
import { convertMathType } from "../../../../../helper/convertMathType";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const ListMCExercise = () => {
  const [listMCExercise, setListMCExercise] = useState([]);
  const [listCategory, setListCategory] = useState();
  const [exerciseID, setExerciseID] = useState("");
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

  const [comfirmDeleteExer, setConfirmDeleteExer] = useState(false);
  // hadle modal on off
  const handleCloseComfirmDeleteExer = () => setConfirmDeleteExer(false);
  const handleShowConfirmDeleteExer = () => setConfirmDeleteExer(true);

  async function getListMCExercise() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/mcexercise/list/" + lessionID
      );
      console.log("list exercise: ", res.data);
      setListMCExercise(res.data.listMCExercise);
      setListCategory(res.data.categoryOfExercise);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleDeleteExercise() {
    console.log("xóa câu hỏi:", exerciseID);
    if (exerciseID) {
      try {
        const res = await axios.delete(
          "http://localhost:8000/api/mcexercise/delete/" + exerciseID
        );
        toast.success("xóa thành công bài tập");
        getListMCExercise();
        handleCloseComfirmDeleteExer();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    getListMCExercise();
    const script = document.createElement("script");
    script.src =
      "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
  }, []);

  const config = {
    loader: { load: ["input/asciimath"] },
  };
  return (
    <>
      <Head>
        <>
          <title>Danh sách bài tập</title>
          {/* add img in title bar */}
          <link
            rel="shortcut icon"
            href="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21"
          ></link>
        </>
      </Head>
      <MathJaxContext config={config}>
        <div className="admin-subjects-page">
          <div className="admin-subjects-title">
            <span>Danh sách các câu hỏi</span>
          </div>
          <div className="admin-subjects-header">
            <div style={{ display: "flex" }}>
              <InputGroup className="mb-3 admin-subjects-header-find ">
                <FormControl
                  placeholder="nội dung câu hỏi"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button letiant="primary">Tìm kiếm</Button>
              </InputGroup>
              <Link href={`/admin/subjects/exercise/create/${lessionID}`}>
                <Button
                  className="admin-subjects-header-add-user"
                  letiant="outline-info"
                >
                  Thêm mới
                </Button>
              </Link>
            </div>
            <Button
              className="admin-subjects-header-add-user"
              variant="outline-warning"
              onClick={() => {
                window.history.back();
              }}
            >
              quay lại
            </Button>
          </div>
          <div className="admin-subjects-list">
            <Table bordered className="admin-subjects-list-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Nội dung câu hỏi</th>
                  <th>Thể loại câu hỏi</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {listMCExercise.map(function (exerItem, index) {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <MathJax>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: exerItem?.question,
                              }}
                            />
                          </MathJax>
                        </td>
                        <td>
                          {listCategory?.map((cateItem, index) => {
                            return (
                              <>
                                {cateItem._id == exerItem.catExeID
                                  ? cateItem.description
                                  : ""}
                              </>
                            );
                          })}
                        </td>
                        <td>
                          <Link
                            href={`/admin/subjects/exercise/detail/${exerItem._id}`}
                          >
                            <Button
                              className="admin-subjects-header-add-user"
                              variant="outline-info"
                            >
                              Chi tiết
                            </Button>
                          </Link>
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="outline-danger"
                            onClick={() => {
                              setExerciseID(exerItem._id);
                              handleShowConfirmDeleteExer();
                            }}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <div className="main-subjects-list-pagination">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </div>
      </MathJaxContext>
      {/* start modal comfirm delete lesssion */}
      <Modal show={comfirmDeleteExer} onHide={handleCloseComfirmDeleteExer}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Xóa môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bạn có chắc chắn muốn xóa bài tập này</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button letiant="secondary" onClick={handleCloseComfirmDeleteExer}>
            Hủy bỏ
          </Button>
          <Button letiant="danger" onClick={handleDeleteExercise}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal comfirm delete lesssion */}
    </>
  );
};

ListMCExercise.layout = "adminLayout";
export default ListMCExercise;
