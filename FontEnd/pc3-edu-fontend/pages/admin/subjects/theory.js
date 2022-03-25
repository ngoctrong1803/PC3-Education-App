
import { Button, Row, Col, Table, InputGroup, FormControl, Form,Pagination  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const theory = () => {
    return (
        <div className='admin-aubject-theory-page'>
            <div className='admin-aubject-theory-header'>
                <span>Thêm mới lý thuyết</span>
            </div>
            <div className='admin-aubject-theory-title'>
                <span>Toán học lớp 10 - Chương 1: Hàm số</span>
                <br></br>
                <span>Bài 1. Đồng biến nghịch biến của hàm số</span>
            </div>
            <div className='admin-aubject-theory-content'>
                <span>nội dung lý thuyết bài học</span>
                {/* ckeditor */}
                        {/* <div className="ckeditor">
                        <h2>Using CKEditor 5 build in React</h2>
                        <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </div> */}
                {/* ckeditor */}
            </div>
        </div>
    )
}
theory.layout = "adminLayout"
export default theory