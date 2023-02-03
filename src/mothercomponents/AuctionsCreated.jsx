import {useEffect, useState} from "react";
import {formatDate, redirectNotConnected} from "../service/Utility";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "./Crud";

export const AuctionsCreated = () => {
    const [auctions, setAuctions] = useState([]);

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].title)
            tempArr.push(data[i].category.name)
            tempArr.push(data[i].seller.lastname + " " + data[i].seller.firstname)
            tempArr.push(data[i].status === 0 ? "En cours" : "Terminé")
            console.log(data[i].start_date)
            tempArr.push(formatDate(data[i].start_date))
            tempArr.push(formatDate(data[i].end_date))

            arr.push(tempArr)
        }
        return arr;
    }

    let customerId = sessionStorage.getItem("user")
    useEffect(() => {
        redirectNotConnected()
            axios.get(`${BASE_URL}/customer/${customerId}/encheres`, CONFIG).then((response) => {
                console.log(response.data.data)
                const arr = setToArray(response.data.data)
                setAuctions(arr)
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            })
        }, []
    )
    const headers = [
        "ID",
        "Titre",
        "Catégorie",
        "Vendeur",
        "Statut",
        "Date de début",
        "Date de clôture",
    ]
    const names = [
        "id",
        "titre",
        "categorie",
        "vendeur",
        "statut",
        "date_debut",
        "date_cloture"
    ]
    const textValues =
        {
            ajouter: "Ajouter un rechargement",
            modifier: "Accepter le rechargment",
            supprimer: "Supprimer le rechargment",
            btnCreer: "Créer",
        }
    const showDetails = (id) => {
        id=btoa(id)
        window.location.href = "auction?id=" + id
    }
    const userDefinedButton = {
        name: "details",
        event: showDetails,
        className: "btn btn-primary",
        value: "Voir details"
    }

    return (
        <>
            {/*create a container and col-12 for all*/}
            <div className={"container"}>
                <div className={"col-12"}>
                    <Crud tableTitle={"Liste des enchères que vous avez effectuées"} headers={headers} names={names}
                          rows={auctions}
                          textValues={textValues}
                          crud={false} page_description={"Enchères"} userDefinedButton={userDefinedButton}/>
                </div>
            </div>
        </>
    );
}