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
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { createAxios } from "../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../redux/authSlice";
import useTeacherAuth from "../../../../hooks/authTeacherHook";
const Flashcard = () => {
  const isTeacher = useTeacherAuth();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const topicID = arrayTemp[position];

  const [listFlashcard, setListFlashcard] = useState([]);
  const [topic, setTopic] = useState({});
  const [listUser, setListUser] = useState([]);
  const curentAdmin = useSelector((state) => state.auth.login.currentUser);

  const [showAddFlashcard, setShowAddFlashcard] = useState(false);
  const [showUpdateFlashcard, setShowUpdateFlashcard] = useState(false);
  const [showConfirmDeleteFlashcard, setShowConfirmDeleteFlashcard] =
    useState(false);

  const [flashcardID, setFlashcardID] = useState("");
  const [meaningInEnglish, setMeaningInEnglish] = useState("");
  const [meaningInVietnamese, setMeaningInVietnamese] = useState("");
  const [explain, setExplain] = useState("");
  const [example, setExample] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  function handleCloseAddFlashcard() {
    setShowAddFlashcard(false);
  }
  function handleShowAddFlashcard() {
    setShowAddFlashcard(true);
  }
  function handleCloseUpdateFlashcard() {
    setShowUpdateFlashcard(false);
  }
  function handleShowUpdateFlashcard(
    flashcardID,
    meaningInVietnamese,
    meaningInEnglish,
    example,
    explain
  ) {
    setShowUpdateFlashcard(true);
    setFlashcardID(flashcardID);
    setMeaningInVietnamese(meaningInVietnamese);
    setMeaningInEnglish(meaningInEnglish);
    setExample(example);
    setExplain(explain);
  }
  function handleCloseConfirmDeleteFlashcard() {
    setShowConfirmDeleteFlashcard(false);
  }
  function handleShowConfirmDeleteFlashcard(flashcardID) {
    setShowConfirmDeleteFlashcard(true);
    setFlashcardID(flashcardID);
  }

  // handle pagination
  const [totalPage, setTotalPage] = useState([]);
  const [nameToFind, setNameToFind] = useState("");
  async function getFlashcard(page) {
    try {
      const res = await axiosJWT.post("/api/flashcard/list/" + topicID, {
        page: page,
        nameToFind: nameToFind,
      });
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
      setListFlashcard(res.data.listFlashcard);
      console.log("list flash card:", res.data.listFlashcard);
      setTopic(res.data.topic);
      setListUser(res.data.users);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function handleAddFlashcard() {
    const newFlashcard = {
      meaningInVietnamese,
      meaningInEnglish,
      explain,
      example,
      star: false,
      forgetfulness: false,
      shared: false,
      topicID: topicID,
      userID: curentAdmin.userInfor._id,
    };
    if (meaningInVietnamese == "" || meaningInEnglish == "") {
      toast.error("th??ng tin ch??a ?????y ????? ????? t???o Flashcard");
    } else {
      try {
        const res = await axiosJWT.post("/api/flashcard/create", newFlashcard);
        toast.success("th??m m???i flashcard th??nh c??ng");
        handleCloseAddFlashcard();
        getFlashcard(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleUpdateFlashcard() {
    const updateFlashcard = {
      meaningInVietnamese,
      meaningInEnglish,
      explain,
      example,
      userID: curentAdmin.userInfor._id,
    };
    if (meaningInVietnamese == "" || meaningInEnglish == "") {
      toast.error("vui l??ng nh???p ?????y ????? th??ng tin Flashcard");
    } else {
      try {
        const res = await axiosJWT.put(
          "/api/flashcard/update/" + flashcardID,
          updateFlashcard
        );
        toast.success("c???p nh???t flashcard th??nh c??ng");
        handleCloseUpdateFlashcard();
        getFlashcard(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleDeleteFlashcard() {
    try {
      const res = await axiosJWT.delete("/api/flashcard/delete/" + flashcardID);
      toast.success("???? x??a flashcard");
      handleCloseConfirmDeleteFlashcard();
      getFlashcard(1);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  // handle upload excel to create flashcard
  const [uploadFile, setUploadFile] = useState(false);
  const [listFlashcardInExcelValid, setListFlashcardInExcelValid] = useState(
    []
  );
  const [listFlashcardInExcelInvalid, setListFlashcardInExcelInvalid] =
    useState([]);
  const [listFlashcardExist, setListFlashcardExist] = useState([]);
  const uploadFileInput = useRef();
  async function readExcel(e) {
    e.preventDefault();
    const reader = new FileReader();
    const fileName = e.target.files[0].name;
    const arrayTemp = fileName.split(".");
    const extend = arrayTemp[arrayTemp.length - 1];
    if (extend == "xlsx") {
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        json.shift();
        const flashcardArray = json;
        const flashcardArrayValid = [];
        const flashcardArrayExist = [];
        const flashcardArrayInvalid = [];

        console.log("ac", flashcardArray);
        // handle question in excel
        if (flashcardArray != 0) {
          flashcardArray.map((flashcardItem, index) => {
            let check = true;
            const dataToPush = {
              meaningInVietnamese: flashcardItem?.Meaning_In_Vietnamese ?? "",
              meaningInEnglish: flashcardItem?.Meaning_In_English ?? "",
              explain: flashcardItem?.Explain ?? "",
              example: flashcardItem?.Example ?? "",
              star: false,
              forgetfulness: false,
              shared: false,
              userID: curentAdmin.userInfor._id,
              topicID: topicID,
            };
            listFlashcard.map((flashcardItem, index) => {
              if (
                dataToPush.meaningInVietnamese ==
                  flashcardItem.meaningInVietnamese &&
                dataToPush.meaningInEnglish == flashcardItem.meaningInEnglish &&
                dataToPush.explain == flashcardItem.explain &&
                dataToPush.example == flashcardItem.example &&
                dataToPush.userID == flashcardItem.userID &&
                dataToPush.topicID == flashcardItem.topicID
              ) {
                check = false;
              }
            });
            if (
              dataToPush.meaningInVietnamese != "" &&
              dataToPush.meaningInEnglish != "" &&
              dataToPush.example != "" &&
              check == true
            ) {
              flashcardArrayValid.push(dataToPush);
            } else if (
              dataToPush.meaningInVietnamese != "" &&
              dataToPush.meaningInEnglish != "" &&
              dataToPush.example != "" &&
              check == false
            ) {
              flashcardArrayExist.push(dataToPush);
            } else {
              flashcardArrayInvalid.push(dataToPush);
            }
          });
          if (flashcardArrayValid.length == 0) {
            uploadFileInput.current.value = "";
          }
          setListFlashcardInExcelValid(flashcardArrayValid);
          setListFlashcardInExcelInvalid(flashcardArrayInvalid);
          setListFlashcardExist(flashcardArrayExist);
          setUploadFile(true);
        } else {
          toast.error("File r???ng vui l??ng ki???m tra l???i!");
          uploadFileInput.current.value = "";
        }
      };
    } else {
      toast.error("File kh??ng ????ng ?????nh d???ng!");
      uploadFileInput.current.value = "";
    }
  }

  async function handleUploadFlashcard() {
    if (listFlashcardInExcelValid.length != 0) {
      let counter = 0;
      let checkError = false;
      for (let i = 0; i < listFlashcardInExcelValid.length; i++) {
        try {
          const res = await axiosJWT.post(
            "/api/flashcard/create",
            listFlashcardInExcelValid[i]
          );
          counter++;
        } catch (err) {
          checkError = true;
        }
      }
      if (counter > 0) {
        toast.success("Th??m m???i flashcard th??nh c??ng");
      }
      if (checkError) {
        toast.warning(
          "???? c?? flashcard b??? tr??ng l???p trong file excel. flashcard tr??ng l???p ch??? ???????c th??m 1 l???n"
        );
      }
    } else {
      toast.error("Danh s??ch c??c flashcard h???p l??? r???ng!");
    }
    getFlashcard(1);
    setUploadFile(false);
    uploadFileInput.current.value = "";
  }

  useEffect(() => {
    if (isTeacher) {
      getFlashcard(1);
    }
  }, [nameToFind]);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh s??ch c??c flashcard c???a ch??? ????? {topic.topicName}</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nh???p ngh??a ti???ng anh"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={nameToFind}
              onChange={(e) => {
                setNameToFind(e.target.value);
              }}
            />
            <Button variant="primary">T??m ki???m</Button>
          </InputGroup>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddFlashcard}
          >
            Th??m m???i
          </Button>
          <Form.Group controlId="formFile" className="import-excel">
            <Form.Control
              ref={uploadFileInput}
              type="file"
              onChange={(e) => {
                readExcel(e);
              }}
            />
          </Form.Group>
          <a href="/Excel/Flashcards.xlsx" download>
            {" "}
            <Button variant="outline-success" style={{ marginLeft: "5px" }}>
              Excel m???u
            </Button>
          </a>
        </div>

        <Button
          className="admin-subjects-header-add-user"
          variant="outline-warning"
          onClick={() => {
            window.history.back();
          }}
        >
          Quay l???i
        </Button>
      </div>
      <div className="admin-subjects-list">
        {!uploadFile ? (
          <>
            <Table bordered className="admin-subjects-list-table">
              <thead>
                <tr>
                  <th>STT</th>
                  {/* <th>T??c gi???</th> */}
                  <th>Ngh??a anh</th>
                  <th>Ngh??a ti???ng vi???t</th>
                  <th>V?? d???</th>
                  <th>Ch???c n??ng</th>
                </tr>
              </thead>
              <tbody>
                {listFlashcard.map(function (item, index) {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>
                          {listUser.map((userItem) => {
                            if (userItem._id == item.userID) {
                              return userItem.fullname;
                            }
                          })}
                        </td> */}
                        <td>{item.meaningInEnglish}</td>
                        <td>{item.meaningInVietnamese}</td>
                        <td>{item.example}</td>
                        <td>
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="primary"
                            onClick={() => {
                              handleShowUpdateFlashcard(
                                item._id,
                                item.meaningInVietnamese,
                                item.meaningInEnglish,
                                item.example,
                                item.explain
                              );
                            }}
                          >
                            Chi ti???t
                          </Button>

                          <Button
                            className="admin-subjects-header-add-user"
                            variant="danger"
                            onClick={() => {
                              handleShowConfirmDeleteFlashcard(item._id);
                            }}
                          >
                            X??a
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>{" "}
            <div className="main-subjects-list-pagination">
              <Pagination>
                <Pagination.Prev />
                {totalPage.map((item) => {
                  return (
                    <>
                      <Pagination.Item
                        className="pagination_item"
                        onClick={(e) => {
                          getFlashcard(item);
                          const listPagination =
                            document.querySelectorAll(".pagination_item");
                          const activeItem = (itemClick) => {
                            listPagination.forEach((item) => {
                              item.classList.remove("active");
                            });
                            itemClick.classList.add("active");
                          };
                          listPagination.forEach((item) => {
                            item.addEventListener("click", function () {
                              activeItem(item);
                            });
                          });
                        }}
                      >
                        {item}
                      </Pagination.Item>
                    </>
                  );
                })}
                <Pagination.Next />
              </Pagination>
            </div>
          </>
        ) : null}
        {uploadFile ? (
          <>
            <h5 style={{ color: "#198754" }}>Danh s??ch c??c flashcard h???p l???</h5>

            <Table bordered className="admin-subjects-list-table">
              <thead>
                <tr style={{ backgroundColor: "#198754", color: "#fff" }}>
                  <th>STT</th>
                  {/* <th>T??c gi???</th> */}
                  <th>Ngh??a anh</th>
                  <th>Ngh??a ti???ng vi???t</th>
                  <th>V?? d???</th>
                  <th>Ch???c n??ng</th>
                </tr>
              </thead>
              <tbody>
                {listFlashcardInExcelValid.map(function (item, index) {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>
                          {listUser.map((userItem) => {
                            if (userItem._id == item.userID) {
                              return userItem.fullname;
                            }
                          })}
                        </td> */}
                        <td>{item.meaningInEnglish}</td>
                        <td>{item.meaningInVietnamese}</td>
                        <td>{item.example}</td>
                        <td>
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="danger"
                            onClick={() => {
                              const newList = listFlashcardInExcelValid;
                              newList.splice(index, 1);

                              setListFlashcardInExcelValid([...newList]);
                            }}
                          >
                            X??a
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ marginRight: "5px" }}
                variant="secondary"
                onClick={() => {
                  uploadFileInput.current.value = "";
                  setUploadFile(false);
                }}
              >
                H???y b???
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleUploadFlashcard();
                }}
              >
                T???i l??n
              </Button>
            </div>

            <h5 style={{ color: "#dc3545" }}>
              Danh s??ch c??c flashcard ???? t???n t???i
            </h5>
            <Table bordered className="admin-subjects-list-table">
              <thead>
                <tr style={{ backgroundColor: "#dc3545", color: "#fff" }}>
                  <th>STT</th>
                  {/* <th>T??c gi???</th> */}
                  <th>Ngh??a anh</th>
                  <th>Ngh??a ti???ng vi???t</th>
                  <th>V?? d???</th>
                </tr>
              </thead>
              <tbody>
                {listFlashcardExist.map(function (item, index) {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>
                          {listUser.map((userItem) => {
                            if (userItem._id == item.userID) {
                              return userItem.fullname;
                            }
                          })}
                        </td> */}
                        <td>{item.meaningInEnglish}</td>
                        <td>{item.meaningInVietnamese}</td>
                        <td>{item.example}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <h5 style={{ color: "#dc3545" }}>
              Danh s??ch c??c flashcard kh??ng h???p l???
            </h5>
            <Table bordered className="admin-subjects-list-table">
              <thead>
                <tr style={{ backgroundColor: "#dc3545", color: "#fff" }}>
                  <th>STT</th>
                  {/* <th>T??c gi???</th> */}
                  <th>Ngh??a anh</th>
                  <th>Ngh??a ti???ng vi???t</th>
                  <th>V?? d???</th>
                </tr>
              </thead>
              <tbody>
                {listFlashcardInExcelInvalid.map(function (item, index) {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>
                          {listUser.map((userItem) => {
                            if (userItem._id == item.userID) {
                              return userItem.fullname;
                            }
                          })}
                        </td> */}
                        <td>{item.meaningInEnglish}</td>
                        <td>{item.meaningInVietnamese}</td>
                        <td>{item.example}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : null}

        {/* start modal add flash card */}
        <Modal show={showAddFlashcard} onHide={handleCloseAddFlashcard}>
          <Modal.Header closeButton>
            <Modal.Title>Th??m Flashcard m???i</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ngh??a ti???ng vi???t</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="con c??"
                  autoFocus
                  value={meaningInVietnamese}
                  onChange={(e) => {
                    setMeaningInVietnamese(e.target.value);
                  }}
                />
                <Form.Label>Ngh??a ti???ng anh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="fish"
                  autoFocus
                  value={meaningInEnglish}
                  onChange={(e) => {
                    setMeaningInEnglish(e.target.value);
                  }}
                />
                <Form.Label>Gi???i th??ch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the fish is in the river"
                  autoFocus
                  value={explain}
                  onChange={(e) => {
                    setExplain(e.target.value);
                  }}
                />
                <Form.Label>V?? d???</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="I'm eating fish"
                  autoFocus
                  value={example}
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddFlashcard}>
              H???y b???
            </Button>
            <Button variant="primary" onClick={handleAddFlashcard}>
              L??u l???i
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add flash card */}
        {/* start modal update flash card */}
        <Modal show={showUpdateFlashcard} onHide={handleCloseUpdateFlashcard}>
          <Modal.Header closeButton>
            <Modal.Title>C???p nh???t Flashcard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ngh??a ti???ng vi???t</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="con c??"
                  autoFocus
                  value={meaningInVietnamese}
                  onChange={(e) => {
                    setMeaningInVietnamese(e.target.value);
                  }}
                />
                <Form.Label>Ngh??a ti???ng anh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="fish"
                  autoFocus
                  value={meaningInEnglish}
                  onChange={(e) => {
                    setMeaningInEnglish(e.target.value);
                  }}
                />
                <Form.Label>Gi???i th??ch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the fish is in the river"
                  autoFocus
                  value={explain}
                  onChange={(e) => {
                    setExplain(e.target.value);
                  }}
                />
                <Form.Label>V?? d???</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="I'm eating fish"
                  autoFocus
                  value={example}
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateFlashcard}>
              H???y b???
            </Button>
            <Button variant="primary" onClick={handleUpdateFlashcard}>
              C???p nh???t
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update flash card */}
        {/* start modal delete flash card */}
        <Modal
          show={showConfirmDeleteFlashcard}
          onHide={handleCloseConfirmDeleteFlashcard}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>
              X??c nh???n x??a Flashcard
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>B???n c?? ch???c ch???n mu???n x??a flashcard</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseConfirmDeleteFlashcard}
            >
              H???y b???
            </Button>
            <Button variant="primary" onClick={handleDeleteFlashcard}>
              X??a
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal delete flash card */}
      </div>
    </div>
  );
};

Flashcard.layout = "adminLayout";
export default Flashcard;
