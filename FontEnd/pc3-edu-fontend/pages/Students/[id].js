export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    const paths = data.map(student => { // return Array: [{params: id_1}, {params: id_2}, ]
        return {
            params: { id: student.id.toString() }
        }
    })
    return {
        paths: paths,
        fallback: false
    }
}   
export const getStaticProps = async (context) =>{ // context is result of getStaticPaths (this is paths). 
    const id = context.params.id    
    const res = await fetch('https://jsonplaceholder.typicode.com/users/'+ id );
    const data = await res.json();

    return { // value of props will transmit function component (in here is Detail function)
        props: { student: data}
    }

}

const Detail = ({ student }) => {
    return ( 
        <div>
            <h2>Student informaiton:</h2>
            <h3>id: {student.id}</h3>
            <h3>name: {student.name}</h3>
            <h3>email: {student.email}</h3>
             
        </div>
     );
}
Detail.layout = "userLayout";
export default Detail;