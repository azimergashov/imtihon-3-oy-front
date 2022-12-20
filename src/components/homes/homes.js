
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hook/useAuth"
import '.././allCss.css'


export const Homes = () =>{

    const [data, setData] = useState([])
    const [company, setCompany] = useState([])
    const [delet, setDelete] = useState({})
    const [home, setHome] = useState({})
    const {token} = useAuth()

    const nameValue = useRef()
    const regionIdValue = useRef()
    const squereValue = useRef()
    const priceMKv = useRef()


    const allData = () =>{
        fetch('http://localhost:9000/home')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))

        fetch('http://localhost:9000/regions')
        .then(res => res.json())
        .then(data => setCompany(data))
        .catch(err => console.log(err))
        console.log(1);
    }



    const onSubmitBank = (e) =>{
        e.preventDefault()
        console.log(Number(nameValue.current.value) );
        console.log(Number(squereValue.current.value));
        console.log(Number(priceMKv.current.value));
        console.log(regionIdValue.current.value);

        if(Number(squereValue.current.value) > 9999){
            return alert("Uy hajmini to'g'ri kiriting!!!")
        }
        if(Number(priceMKv.current.value) > 920000000685477){
            return alert("Sal insof bilan narx yozing !!!")
        }

        fetch('http://localhost:9000/home/create', {
            method: "POST",
            headers : {
                'Accept': 'application/json',
                "Content-Type" : "application/json",
                "access_token" : `${token}`
            },
            body: JSON.stringify({
                room:Number(nameValue.current.value),
                metr_kv: Number(squereValue.current.value),
                price_m_kv: Number(priceMKv.current.value),
                region_id: regionIdValue.current.value
            })
        })
        .then(res => res.json())
        .then(data => (setHome(data), alert(data.message)))
        .catch(err => console.log(err, err.message, "error"))

        // nameValue.current.value = hidden
        squereValue.current.value = null
        priceMKv.current.value = null
        // regionIdValue.current.value = null
    }

    const deleteBank = (e) =>{
        const id = e.target.id
        fetch(`http://localhost:9000/home/delete/${id}`, {
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
    }, [delet, home])



    return(<>
        <div className="w-100">
        <h1>
            Banklar
        </h1>
        <form onSubmit={onSubmitBank}>
            <select className="form-control mt-3" ref={nameValue} name="room" required>
                <option value="2" hidden>Xona sonini kiriting...</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            <input ref={squereValue} className="form-control mt-3" name="metr_kv" type="number" required placeholder="Uy hajmi m.kv ..."/>
            <input ref={priceMKv} className="form-control mt-3" name="price_m_kv" type="number" required placeholder="Metr.kv narxi ..."/>


            <select ref={regionIdValue} className="form-control mt-3" name="region_id" required>

                {
                    company.length ?
                        company.map(e =>
                        <option key={e.id} value={e.id}>{e.company_name}: {e.name} </option>
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
                    <h2 className="m-0 p-0">Xona: {e.rooms}ta</h2>
                    <p className="m-0 p-0">Uy hajmi: {e.metr_kv} metr kvadrat </p>
                    <p className="m-0 p-0">1 metr kvadrat narxi: {e.price_m_kv} so'm </p>
                    <p className="m-0 p-0">Tuman: {e.region_name}</p>
                    <p className="m-0 p-0">Comapniya: {e.company_name}</p>

                    </div>
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Tashkent-City_name_statue.jpg" alt="" width={100} height={100}/> */}
                    <div className="mt-auto"><button onClick={deleteBank} id={e.id} className="btn btn-danger">❌</button></div>
                </li>
                ) : null
            }
            </ul>
        </div>
        </div>
    </>)

}