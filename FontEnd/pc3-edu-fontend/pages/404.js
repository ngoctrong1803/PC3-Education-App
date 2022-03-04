import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NotFount = () => {

   const router = useRouter();

   const [counter, setCounter] = useState(3);



    useEffect(() => {
        if (counter > 0){
            setInterval(()=>{
                setCounter(pre => pre - 1);
            }, 1000)
        }

        setTimeout(()=>{
            router.push("/");
        }, 3000)
    }, []);

    return ( 
        <div>
            Oooops...!
            Not Fount This Page 
            ERROR: 404!!!
            <h4>wait : {counter}</h4>
            <Link href="/"> Go Back Page</Link>
        </div>
     );
}
 
export default NotFount;