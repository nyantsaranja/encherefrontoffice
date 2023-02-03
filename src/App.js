import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginComponent} from "./mothercomponents/LoginComponent";
import {SignupComponent} from "./mothercomponents/SignupComponent";
import {Crud} from "./mothercomponents/Crud";
import {Settings} from "./mothercomponents/Settings";
import {Auctions} from "./mothercomponents/Auctions";
import {BestUsers} from "./mothercomponents/BestUsers";
import {BestSellers} from "./mothercomponents/BestSellers";
import {ActiveAdmins} from "./mothercomponents/ActiveAdmins";
import {BestCategories} from "./mothercomponents/BestCategories";
import {Incomes} from "./mothercomponents/Incomes";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "./service/Api-Call";
import {AuctionsMade} from "./mothercomponents/AuctionsMade";
import {AuctionsCreated} from "./mothercomponents/AuctionsCreated";
import {Inter} from "./mothercomponents/Inter";
import {Logout} from "./mothercomponents/Logout";

function App() {
    const headers = [
        "ID",
        "Nom",
        "Description",
    ]
    const names = [
        "id",
        "name",
        "description",
    ]
    const [categories, setCategories] = useState([]);

    function setToArray(data) {
        const arr=[];
        for (let i=0;i<data.length;i++){
            let tempArray=[];
            tempArray.push(data[i].id)
            tempArray.push(data[i].name)
            tempArray.push(data[i].description)
            arr.push(tempArray);
        }
        return arr;
    }

    useEffect(() => {
            axios.get(`${BASE_URL}/categories`,CONFIG).then((response) => {
                const arr=setToArray(response.data.data);
                // console.log(response.data.data)
                console.log(arr);
                setCategories(arr)
                // setCategories(response.data.data);
            })
        }
        , [])
    const textValues =
        {
            ajouter: "Ajouter une catégorie",
            modifier: "Modifier une catégorie",
            supprimer: "Supprimer une catégorie",
            btnCreer: "Créer",
        }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inter/>}></Route>
                <Route path="/login" element={<LoginComponent/>}></Route>
                 <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/signup" element={<SignupComponent/>}></Route>
                <Route path="/categories"
                       element={<Crud tableTitle={"Liste des categories"} textValues={textValues} headers={headers}
                                      names={names} rows={categories} page_description={"Gestion des catégories"}
                                      crud={true}/>}></Route>
                <Route path={"/settings"} element={<Settings/>}></Route>
                <Route path={"/auctions"} element={<Auctions/>}></Route>
                <Route path={"/auction"} element={<BestUsers/>}></Route>
                <Route path={"/auction_taken_part"} element={<AuctionsMade/>}></Route>
                <Route path={"/own_auction"} element={<AuctionsCreated/>}></Route>
                <Route path={"/best_sellers"} element={<BestSellers/>}></Route>
                <Route path={"/active_admins"} element={<ActiveAdmins/>}></Route>
                <Route path={"/best_categories"} element={<BestCategories/>}></Route>
                <Route path={"/incomes"} element={<Incomes/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
