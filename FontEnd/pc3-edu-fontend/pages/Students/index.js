import Link from "next/link";

export const getStaticProps = async () =>{

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json();
    return {
        props: { students: data}
    }
}

const Students = ({ students }) => {
    return ( 
        <div>
            <h1>this is Student page</h1>
            {
                students.map(student => ( 
                    <Link href={'/Students/'+student.id} key={student.id}>
                        <a className="list-student-name">
                            {student.id} - {student.name} - {student.email} <br></br>
                        </a>
                    </Link>
              )
                )
            }
        </div>
     );
}
Students.layout = "userLayout";
export default Students;