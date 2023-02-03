import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {formatDate, redirectNotConnected} from "../service/Utility";
import {AdvancedSearch} from "../childcomponents/AdvancedSearch";
import {Pagination} from "../childcomponents/Pagination";

export const Auctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [page, setPage] = useState(1);
    const [defaultPage, setDefaultPage] = useState(0);
    const [criteria, setCriteria] = useState(null)

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].title)
            tempArr.push(data[i].category.name)
            tempArr.push(data[i].seller.lastname + " " + data[i].seller.firstname)
            tempArr.push(data[i].status === 0 ? "En cours" : "Terminé")
            if (data[i].start_date !== null && data[i].end_date !== null && data[i].start_date !== undefined && data[i].end_date !== undefined && data[i].start_date !== "" && data[i].end_date !== "") {
                tempArr.push(formatDate(data[i].start_date))
                tempArr.push(formatDate(data[i].end_date))
            } else {
                tempArr.push(formatDate(data[i].startDate))
                tempArr.push(formatDate(data[i].endDate))
            }

            arr.push(tempArr)
        }
        return arr;
    }

    const loadAuctionPerPage = () => {
        axios.get(`${BASE_URL}/encheres/${defaultPage}`, CONFIG).then((response) => {
            const arr = setToArray(response.data.data)
            setAuctions(arr)
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
    }

    useEffect(() => {
            redirectNotConnected()
            loadAuctionPerPage()
            axios.get(`${BASE_URL}/encheres/number`, CONFIG).then((response) => {
                setPage(response.data.data)
            }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )
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
        id = btoa(id)
        window.location.href = "auction?id=" + id
    }

    function isEmptyObject(obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    }

    const advancedSearch = (array, selectedCategories) => {
        Object.keys(array).forEach(key => {
            if (array[key] === "") {
                delete array[key];
            }
        });
        if (selectedCategories.length !== 0) {
            array["category"] = selectedCategories
        }
        if (!isEmptyObject(array)) {
            console.log("Not empty")
            setCriteria(array)
        } else {
            console.log("Empty")
            setCriteria(null)
        }
        retrieveAdvancedSearch(array)
    }

    const retrieveAdvancedSearch = (array) => {
        axios.post(`${BASE_URL}/encheres/recherche/${defaultPage}`, array, CONFIG).then((response) => {
                Swal.fire({
                        icon: 'success',
                        title: 'Recherche avancée',
                        text: 'Recherche effectuée avec succès',
                    }
                )
                // print the response
                console.log(response.data.data)
                setAuctions(setToArray(response.data.data))
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
        console.log(array)
        axios.post(`${BASE_URL}/encheres/recherche/number`, array, CONFIG).then((response) => {
            setPage(response.data.data)
        }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }

    const userDefinedButton = {
        name: "details",
        event: showDetails,
        className: "btn btn-primary",
        value: "Voir details"
    }

    const paginate = (page) => {
        setDefaultPage(page)
        if (criteria !== null) {
            retrieveAdvancedSearch(criteria)
        } else {
            loadAuctionPerPage()
        }
    }

    return (
        <>
            <AdvancedSearch event={advancedSearch}/>
            <Crud tableTitle={"Liste des enchères"} headers={headers} names={names} rows={auctions}
                  textValues={textValues}
                  crud={false} page_description={"Enchères"} userDefinedButton={userDefinedButton}/>
            <Pagination criteria={criteria} page={page} event={paginate}/>
        </>
    )
}