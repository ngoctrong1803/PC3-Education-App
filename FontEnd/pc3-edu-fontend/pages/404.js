import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFount = () => {

   const router = useRouter();

   const [counter, setCounter] = useState(5);



    useEffect(() => {
        if (counter > 0){
            setInterval(()=>{
                setCounter(pre => pre - 1);
            }, 1000)
        }

        setTimeout(()=>{
            router.push("/");
        }, 5000)
    }, []);

    return ( 
        <div className="error-wrap">
            <div className="error-content">
            Oooops...!
            Not Fount This Page 
            ERROR: 404!!!
            <h4>wait : {counter}</h4>
            <Link href="/"> Go Back Page</Link>
            </div>
        </div>
     );
}
NotFount.layout = "noLayout";
export default NotFount;