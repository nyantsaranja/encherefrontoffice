import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";

export const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i][0])
            tempArr.push(data[i][4]+" "+data[i][5])
            tempArr.push(data[i][2])
            tempArr.push(data[i][1])
            tempArr.push(data[i][8])
            arr.push(tempArr)
        }
        return arr;
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/vendeurs/desc`, CONFIG).then((response) => {
            console.log(response.data.data)
            const arr = setToArray(response.data.data)
            console.log(arr)
            setBestSellers(arr)
        }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    },[])
    const headers = [
        "ID",
        "Utilisateur",
        "Nombre d'enchères",
        "Montant gagnés",
        "Date d'intégration"
    ]
    const names = [
        "id",
        "utilisateur",
        "nombreenchere",
        "montantgagne",
        "dateintegration"
    ]
    const textValues =
        {
            ajouter: "Ajouter un utilisateur",
            modifier: "Accepter le utilisateur",
            supprimer: "Supprimer l'utilisateur",
            btnCreer: "Créer",
        }
    return (
        <Crud tableTitle={"Liste des meilleurs vendeurs"} headers={headers} names={names} rows={bestSellers} textValues={textValues} crud={false} page_description={"Les encherisseurs classés par nombre d'enchère crées et le montant gagné"}/>
    )
}