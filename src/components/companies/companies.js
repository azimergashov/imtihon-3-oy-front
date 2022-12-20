import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hook/useAuth.js"
import '.././allCss.css'

export const Companies = () =>{
    const [data, setData] = useState([])
    const [post, setPost] = useState({})
    const [delet, setDelet] = useState({})
    const {token} = useAuth()

    const nameValue = useRef()
    const imgValue = useRef()

    const renderFn =() =>{
        fetch('http://localhost:9000/company')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
        console.log(1);
    }


    const onSubmitBank = (e) =>{
        e.preventDefault()
        fetch('http://localhost:9000/company/create', {
            method: "POST",
            credentials: 'same-origin',
            headers : {
                'Accept': 'application/json',
                "Content-Type" : "application/json",
                "access_token" : `${token}`
            },
            body: JSON.stringify({
                name: nameValue?.current?.value,
                img: imgValue?.current?.value
            })
        })
        .then(res => res.json())
        .then(data => (setPost(data), alert(data.message )))
        .catch(err => console.log(err, err.message, "error"))

        nameValue.current.value = null
        imgValue.current.value = null
    }

    const deleteBank = (e) =>{
        const id = e.target.id

        fetch(`http://localhost:9000/company/delete/${id}`, {
            method: "DELETE",
            headers:{
                "access_token" : `${token}`
            }
        })
        .then(res => res.json())
        .then(data => setDelet(data))
        .catch(err => console.log(err))
    }

    useEffect(() =>{
        renderFn()
    }, [setData])


    return(<>
        <div className="w-100">
        <h1>
            Companiyalar
        </h1>
        <form onSubmit={onSubmitBank}>
            <input ref={nameValue} className="form-control mt-3" name="name" type="text" required placeholder="companiya nomi..."/>
            <input ref={imgValue} className="form-control mt-3" name="img" type="text" required placeholder="rasmning linki..."/>
            <div className="text-end"><button  className="btn btn-primary mt-2 w-25" type="submit">Qo'shish</button></div>
        </form>

        <div className="mt-4">
            <h2>Mavjud Companiyalar:</h2>
            <ul className="list-unstyled mt-3">
            {
             data.length ? data.map(e =>
                <li className="list_item d-flex justify-content-between mt-2" key={e.id}>
                    <h2 className="m-0 p-0">{e.name}</h2>
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Tashkent-City_name_statue.jpg" alt="" width={100} height={100}/> */}
                    <button onClick={deleteBank} id={e.id} className="btn btn-danger">❌</button>
                </li>
                ) : null
            }
            </ul>
        </div>
        </div>
    </>)
}