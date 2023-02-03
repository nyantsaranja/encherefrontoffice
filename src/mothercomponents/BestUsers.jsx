import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Carousel} from "../childcomponents/Carousel";
import {CarouselCard} from "../childcomponents/CarouselCard";
import {Outbit} from "../childcomponents/Outbit";
import {formatDate, redirectNotConnected} from "../service/Utility";

export const BestUsers = () => {
    const [data, setAuction] = useState(null);
    const [operations, setOperations] = useState([]);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const auctionId =atob(urlParams.get('id'));
    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].customer.firstname + " " + data[i].customer.lastname)
            tempArr.push(data[i].amount)
            tempArr.push(formatDate(data[i].operationDate))
            arr.push(tempArr)
        }
        return arr;
    }
    useEffect(() => {
        redirectNotConnected()
        axios.get(`${BASE_URL}/enchere/${auctionId}`).then((response) => {
            setAuction(response.data.data)
            setOperations(setToArray(response.data.data.operation))
            console.log(response.data.data)
        }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }, []);

    const headers = [
        "ID",
        "Client",
        "Montant",
        "Date"
    ]
    const names = [
        "id",
        "client",
        "montant",
        "date"
    ]
    const textValues =
        {
            ajouter: "Ajouter un utilisateur",
            modifier: "Accepter le utilisateur",
            supprimer: "Supprimer l'utilisateur",
            btnCreer: "Créer",
        }
    const customerId = sessionStorage.getItem("user");

    console.log(customerId, auctionId)
    const outbid = (amount) => {
        const obj = {
            amount: amount
        }

        axios.post(`${BASE_URL}/customer/${customerId}/enchere/${auctionId}/offre`, obj, CONFIG).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Fait...',
                text: 'Votre enchère a été prise en compte'
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
        console.log(amount)
    }
    return (
        //     container and row
        <div className="container">
            <div className="row">
                {/*            col-xl and col-md 8 and everything else is 12*/}
                <div className="col-xl-8 col-12">
                    <Carousel galeries={data?.galerie}/>
                </div>
                <div className="col-xl-4 col-12">
                    <CarouselCard data={data}/>
                    <Outbit event={outbid}/>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="row">
                <div className="col-12">
                    <Crud
                          tableTitle={"Liste des enchèrissements liés à cet enchère"} headers={headers} names={names}
                          rows={operations} textValues={textValues} crud={false} page_description={"Enchère"}/>
                </div>
            </div>
        </div>
    )
}