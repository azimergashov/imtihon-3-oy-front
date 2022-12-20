import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hook/useAuth.js"
import '.././allCss.css'

export const Credites = () =>{

    const [data, setData] = useState([])
    const [bank, setBank] = useState([])
    const [credite, setCredite] = useState({})
    const [delet, setDelet] = useState({})
    const {token} = useAuth()

    const sumValue = useRef()
    const termValue = useRef()
    const persenValue = useRef()
    const bankIdVAlue = useRef()

    const allData = () =>{
        fetch('http://localhost:9000/credite')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))

        fetch('http://localhost:9000/bank')
        .then(res => res.json())
        .then(data => setBank(data))
        .catch(err => console.log(err))
        console.log(1);
    }




    const onSubmitBank = (e) =>{
        e.preventDefault()
        if(Number(sumValue.current.value) > 9200000006854775807){
            sumValue.current.value = null
            return alert("Yo uje fantastika sal karo summa yozing !!!")
        }
        if(Number(persenValue.current.value) > 99){
            persenValue.current.value = null
            return alert("Boshlang'ich to'loni to'g'ri kiriting !!!")
        }
        fetch('http://localhost:9000/credite/create', {
            method: "POST",
            headers : {
                'Accept': 'application/json',
                "Content-Type" : "application/json",
                "access_token" : `${token}`
            },
            body: JSON.stringify({
                sum: Number(sumValue.current?.value),
                term: Number(termValue.current?.value),
                persen: Number(persenValue.current?.value),
                bank_id: bankIdVAlue.current?.value
            })
        })
        .then(res => res.json())
        .then(data => (setCredite(data), alert(data.message)))
        .catch(err => console.log(err, err.message, "error"))

        sumValue.current.value = null
        persenValue.current.value = null

    }

    const deleteBank = (e) =>{
        const id = e.target.id

        fetch(`http://localhost:9000/credite/delete/${id}`, {
            method: "DELETE",
            headers:{
                "access_token" : `${token}`
            }
        })
        .then(res => res.json())
        .then(data => setDelet(data))
        .catch(err => console.log(err))

    }

    useEffect(() => {
        allData()
    }, [delet, credite])

    return(<>
        <div className="w-100">
        <h1 className="text-center">
            Kreditlar
        </h1>
        <h2>Kredit Qo'shish:</h2>
        <form onSubmit={onSubmitBank}>
            <input ref={sumValue} className="form-control mt-3" name="sum" type="number" required placeholder=" kredit miqdori..."/>
            <select className="form-control mt-3" ref={termValue} name="term" >
                <option value="5">5 yil</option>
                <option value="10">10 yil</option>
                <option value="15">15 yil</option>
            </select>
            <input ref={persenValue} className="form-control mt-3" name="persen" type="number" required placeholder="Boshlang'ich to'lovni kiriting..."/>
            <select ref={bankIdVAlue} className="form-control mt-3" name="bank_id" >
                {   bank.length ?
                     bank.map(b => <option key={b.id} value={b.id}>{b.name}</option>
                    ): null
                }
            </select>
            <div className="text-end"><button  className="btn btn-primary mt-2 w-25" type="submit">Qo'shish</button></div>
        </form>

        <div className="mt-4">
            <h2>Mavjud Kreditlar:</h2>
            <ul className="list-unstyled mt-3">
            {
             data.length ? data.map(e =>

                <li className="list_item  mt-2" key={e.id}>
                    <h2 className="m-0 p-0">Kredit miqdori: {e.sum} so'm</h2>
                    <p className="m-0 p-0">Foiz: {e.percen}%</p>
                    <p className="m-0 p-0">Muddat: {e.term} </p>
                    <p className="m-0 p-0">Bank: {e.bank_name}</p>
                    <div className="text-end"><button onClick={deleteBank} id={e.id} className="btn btn-danger">❌</button></div>
                </li>
                ) : null
            }
            </ul>
        </div>
        </div>
    </>)
}