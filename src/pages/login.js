import { useEffect, useRef, useState } from "react"
import { useAuth } from "../hook/useAuth.js"

export const Login = () =>{
    const {setToken} = useAuth()
    const [data, setData] = useState({})
    const nameValue = useRef()
    const passwordValue = useRef()


    const loginSub =(e) =>{
        e.preventDefault()

        fetch('http://localhost:9000/login', {
            method: "POST",
            // mode: "no-cors",
            credentials: 'same-origin',
            headers : {
                'Accept': 'application/json',
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: nameValue.current.value,
                password: passwordValue.current.value
            })
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err, err.message, "error"))

    }

    useEffect(() => {
       if(data){
        if(data?.message !== "Successfully loged" ){
            return  alert(data?.message)
         }else{
            setToken(data?.access_token)
         }
       }
    }, [data])
    // if(data.status =! 200){ alert('err')}else {console.log(data)} }


    return(<>
        <div className="container">
            <div>
             <h1 className="text-center">Login</h1>
            </div>
            <form onSubmit={loginSub}>
                <input className="form-control mt-3" ref={nameValue} type="text" name="name" required />
                <input className="form-control mt-3" ref={passwordValue} type="password" name="password" required/>
                <div className="text-center mt-3"><button className="btn btn-primary w-25" type="submit">Login</button></div>
            </form>
            <h2>Name: admin</h2>
            <p>parol: 1234</p>
        </div>
    </>)
}