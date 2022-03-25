
import { Button, Row, Col, Table, InputGroup, FormControl, Form,Pagination  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/dist/client/link';
const statistical = ()=> {
    return(
        <div className="admin-statistical-page">
        <div className="admin-statistical-title">
            <span>Tiến trình học tập các thành viên - Toán 10</span>
        </div>
        <div className="admin-statistical-header">
        <InputGroup className="mb-3 admin-statistical-header-find " >
            <FormControl
            placeholder="Nhập tên người dùng"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>   
        </div>
        <div className="admin-statistical-list">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>xon chao</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>6</td>
                    <td>xon chao</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    </tr>
                    <tr>
                    <td>7</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>8</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>9</td>
                    <td>xon chao</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    </tr>
                    <tr>
                    <td>10</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>        
                </tbody>
            </Table>
            <div className='main-statistical-list-pagination'>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item >{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
            </div>
        </div>
    </div>
    )

}
statistical.layout = "adminLayout"
export default statistical