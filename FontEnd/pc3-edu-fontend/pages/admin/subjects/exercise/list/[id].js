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
import { Helmet } from "react-helmet";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ListMCExercise = () => {
  const [listMCExercise, setListMCExercise] = useState([]);
  const [listCategory, setListCategory] = useState();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

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
  useEffect(() => {
    getListMCExercise();
  }, []);
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
      <div className="admin-subjects-page">
        <div className="admin-subjects-title">
          <span>Danh sách các câu hỏi</span>
        </div>
        <div className="admin-subjects-header">
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="nội dung câu hỏi"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
          <Link href={`/admin/subjects/exercise/create/${lessionID}`}>
            <Button
              className="admin-subjects-header-add-user"
              variant="outline-info"
            >
              Thêm mới
            </Button>
          </Link>
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: exerItem?.question,
                          }}
                        />
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
                        <Link href={`subjects/content}`}>
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="primary"
                          >
                            Chi tiết
                          </Button>
                        </Link>

                        <Link href="subjects/update">
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="warning"
                          >
                            Sửa
                          </Button>
                        </Link>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="danger"
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
    </>
  );
};

ListMCExercise.layout = "adminLayout";
export default ListMCExercise;
