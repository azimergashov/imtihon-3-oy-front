import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hook/useAuth"
import '.././allCss.css'


export const Regions = () =>{

    const [data, setData] = useState([])
    const [company, setCompany] = useState({})
    const [region, setRegion] = useState({})
    const [delet, setDelete] = useState({})

    const {token} = useAuth()
    const nameValue = useRef()
    const companyIdValue = useRef()
    const allData = () =>{
        fetch('http://localhost:9000/regions')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))

        fetch('http://localhost:9000/company')
        .then(res => res.json())
        .then(data => setCompany(data))
        .catch(err => console.log(err))
        console.log(1);
    }

    const onSubmitBank = (e) =>{
        e.preventDefault()
        fetch('http://localhost:9000/regions/create', {
            method: "POST",
            credentials: 'same-origin',
            headers : {
                'Accept': 'application/json',
                "Content-Type" : "application/json",
                "access_token" : `${token}`
            },
            body: JSON.stringify({
                name: nameValue.current?.value,
                company_id: companyIdValue.current?.value
            })
        })
        .then(res => res.json())
        .then(data => (setRegion(data), alert(data.message)))
        .catch(err => console.log(err, err.message, "error"))

        nameValue.current.value = null
    }

    const deleteBank = (e) =>{
        const id = e.target.id

        fetch(`http://localhost:9000/regions/delete/${id}`, {
            method: "DELETE",
            headers:{
                "access_token" : `${token}`
            }
        })
        .then(res => res.json())
        .then(data => setDelete(data))
        .catch(err => console.log(err))

    }

    useEffect(() =>{
       allData()
    }, [delet, region])


    return(<>
        <div className="w-100">
        <h1>
            Banklar
        </h1>
        <form onSubmit={onSubmitBank}>
            <input ref={nameValue} className="form-control mt-3" name="name" type="text" required placeholder="Tuman nomi..."/>
            <select ref={companyIdValue} className="form-control mt-3" name="company_id">
                {
                    company.length ?
                        company.map(e =>
                        <option key={e.id} value={e.id}>{e.name}</option>
                        ): null
                }
            </select>
            <div className="text-end"><button  className="btn btn-primary mt-2 w-25" type="submit">Qo'shish</button></div>
        </form>

        <div className="mt-4">
            <h2>Mavjud Banklar:</h2>
            <ul className="list-unstyled mt-3">
            {
             data.length ? data.map(e =>
                <li className="list_item d-flex justify-content-between mt-2" key={e.id}>
                    <div>
                    <h2 className="m-0 p-0">Tuman: {e.name}</h2>
                    <p className="m-0 p-0">companiya: {e.company_name}</p>
                    </div>
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