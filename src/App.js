// import axios from "axios";
import logo_header from "./images/logo_header.png"
import { Route, Routes} from 'react-router-dom'
import { PrivatePage } from "./pages/privatePage.js";
// import { AdminPage } from "./pages/adminPage.js";
// import { Login } from "./pages/login.js";
// import { useAuth } from "./hook/useAuth.js";
import { Bank } from "./components/bank/bank";
import { Companies } from "./components/companies/companies.js";
import { Credites } from "./components/credites/credites.js";
import { Regions } from "./components/regions/regions.js";
import { Homes } from "./components/homes/homes.js";
import { useEffect, useState } from "react";


function App() {
  const [company, setCompany] = useState([])
  const [companyOnly, setCompanyOnly] = useState({})
  const [regionByCompany, setRegionByCompany] = useState([])
  const [regionOnly, setRegionOnly] = useState({})
  const [homes, setHomes] = useState([])
  const [homeOnly, setHomeOnly] = useState({})
  const [term, setTerm] = useState('')
  const [credite, setCredite] = useState({})
  const [bank, setBank] = useState({})
    useEffect(() => {
      fetch('http://localhost:9000/company')
      .then(res => res.json())
      .then(data => setCompany(data))
      .catch(err => console.log(err))


    }, [])

    const selectCompany = (e) =>{
      fetch(`http://localhost:9000/company/${e.target.value}`)
      .then(res => res.json())
      .then(data => setCompanyOnly(data))
      .catch(err => console.log(err))

      fetch(`http://localhost:9000/regions/company/${e.target.value}`)
      .then(res => res.json())
      .then(data => setRegionByCompany(data))
      .catch(err => console.log(err))
    }

    const regionSelect = (e) =>{
      fetch(`http://localhost:9000/regions/${e.target.value}`)
      .then(res => res.json())
      .then(data => setRegionOnly(data))
      .catch(err => console.log(err))

      console.log(e.target.value);

      fetch(`http://localhost:9000/home/region/${e.target.value}`)
      .then(res => res.json())
      .then(data => setHomes(data))
      .catch(err => console.log(err))

    }
    const homeByRoom = (e) =>{
      fetch(`http://localhost:9000/home/region/${regionOnly.id}/room/${e.target.value}`)
      .then(res => res.json())
      .then(data => setHomeOnly(data))
      .catch(err => console.log(err))
    }

    const selectTerm = (e) =>{
      setTerm(e.target.value);
    }

    let allSum = homeOnly.metr_kv ? homeOnly.metr_kv * homeOnly.price_m_kv :  null

    console.log(allSum);
    console.log(term);

    useEffect(() =>{
    if(term && allSum){
      fetch(`http://localhost:9000/credite/sum/${Number(allSum)}/term/${Number(term)}`)
      .then(res => res.json())
      .then(data => setCredite(data))
      .catch(err => console.log(err))
    }
  },[term, allSum])
  useEffect(() => {
    if(credite){
      fetch(`http://localhost:9000/bank/${credite.bank_id}`)
      .then(res => res.json())
      .then(data => setBank(data))
      .catch(err => console.log(err))
    }
    console.log(1);
  },[credite])

  let startingPayment = allSum/100*credite.credite_percentage
  let montylyPayment = ((allSum-startingPayment)/(credite.credite_term * 12)).toFixed(2)

  console.log(montylyPayment);

  return (<div className="App">
    <Routes>
      <Route path="/" element={
        <div className="container">
        <div>
          <header className="d-flex justify-content-between align-items-center">
            <img src={logo_header} alt="" width={200} height={100} />

            <a  className="text-decoration-none me-5" href="/login/">admin</a>
          </header>
          <main>
            <div className="d-flex justify-content-between">
              <div>
                <p>Companiyani tanlang</p>
                <select onChange={selectCompany} >
                  <option hidden>Comaniyani tanlang</option>
                  {
                    company.length ?
                      company.map(e =>
                        <option  key={e.id} value={e.id}>{e.name}</option>
                    ): null
                  }
                </select>
              </div>
              <div>
                <p>Tumanni tanlang</p>
                <select onChange={regionSelect} className="w-100">
                  <option hidden>Tumanni tanlang</option>

                  {
                    regionByCompany.length ?
                      regionByCompany.map(e =>
                        <option  key={e.id} value={e.id}>{e.name}</option>
                    ): null
                  }
                </select>
              </div>

              <div>
                <p>Xona sonini tanlang</p>
                <select onChange={homeByRoom} className="w-100">
                  <option hidden>Xonani tanlang</option>
                  {

                    homes.length ?
                      homes.map(e =>
                        <option  key={e.id} value={e.rooms}>{e.rooms}</option>
                    ): null
                  }
                </select>
              </div>
              <div>
                <p>Muddatni tanlang</p>
                <select onChange={selectTerm}  className="w-100">
                  <option hidden>Muddatni tanlang</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>

            </div>
            <div className="mt-4 d-flex justify-content-between">
              <div>
                {
                  companyOnly.img &&  <img style={{borderRadius: 20}} src={companyOnly.img} alt="" width={250} height={200}/>

                }
                { regionOnly.name &&  <h1>{regionOnly.name}</h1>}

                {
                  homeOnly.id &&
                  <div>
                    <p>Xona soni: {homeOnly.rooms}ta</p>
                    <p>Uy hajmi: {homeOnly.metr_kv} m.kv</p>
                    <p>1 Metr.kv narxi: {homeOnly.price_m_kv} so'm</p>
                    <p>Companiya: {homeOnly.company_name}</p>


                  </div>
                }
              </div>


                {bank.img &&

                <div><img style={{borderRadius: 20}} src={bank.img} alt="" width={250} height={200}/>
                <h2>{bank.name}</h2>
                <p>Kredit miqdori: {credite.credite_sum}so'm</p>
                <p>Muddat: {credite.credite_term} yil</p>
                <p>Boshlang'ich to'lov: {credite.credite_percentage}%</p></div>
                }


             {
              credite.credite_sum &&
              <div>
              <img style={{borderRadius: 20}}  src="https://play-lh.googleusercontent.com/q7t9kcel2vZRJlx6Il4Lr5KhV-i1143Ud4nlz7Q_oMwF_iP2z_bFGgzTVURmP_lFpI4" alt=""   width={250} height={200}/>
              <div className="mt-3">
                <h2>Calculator</h2>
              <p className="m-0 p-0">Uyning umumiy narxi: {allSum} so'm</p>
              <p className="m-0 p-0">Boshlang'ich to'lov: {startingPayment} so'm</p>
              <p className="m-0 p-0">Oylik to'lov: {montylyPayment} so'm</p>
              <p className="m-0 p-0">Bank xizmati: 2500 so'm</p>
              <p className="m-0 p-0">Muddat: {credite.credite_term} yil</p>
              </div>
            </div>
             }

            </div>


          </main>
        </div>

      </div>
      } />
      {/* <Route path="/login" element={<PrivatePage/>} /> */}

      <Route  path="/login/" element={<PrivatePage/>}>
        <Route path="/login/" element={<Companies/>}/>
        <Route path="/login/bank" element={<Bank/>}/>
        <Route path="/login/credites" element={<Credites/>}/>
        <Route path="/login/regions" element={<Regions/>}/>
        <Route path="/login/homes" element={<Homes/>}/>
      </Route>
    </Routes>
 </div>)
}

export default App;
