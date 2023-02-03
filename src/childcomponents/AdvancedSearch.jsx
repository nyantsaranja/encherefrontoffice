import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";

export const AdvancedSearch = ({event,criteria}) => {
    const [categories, setCategories] = useState(null);
    const motcle = useRef(null);
    const prixmin = useRef(null);
    const prixmax = useRef(null);
    const statut = useRef(null);
    const datedebut = useRef(null);
    const datefin = useRef(null);

    const exec = () => {
        let obj = {
            keyword: motcle.current.value,
            minPrice: prixmin.current.value,
            maxPrice: prixmax.current.value,
            status: statut.current.value,
            startDate: datedebut.current.value,
            endDate: datefin.current.value
        }
        // get all the input with categoryChoices
        let categoryChoices = document.querySelectorAll(".categoryChoices");
        // create an array to store the selected categories
        let selectedCategories = [];
        // loop through the array of input
        for (let i = 0; i < categoryChoices.length; i++) {
            // if the input is checked, push the value into the array
            if (categoryChoices[i].checked) {
                selectedCategories.push(categoryChoices[i].value)
            }
        }
        event(obj,selectedCategories)
    }
    useEffect(() => {
        axios.get(`${BASE_URL}/categories`).then((response) => {
            setCategories(response.data.data);
        }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }, []);

    return (
        <>
            <div className="row g-3">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="validationServer01" className="form-label">Mot clé</label>
                    <input ref={motcle} type="text" className="form-control" id="validationServer01"
                           placeholder="Mot clé"/>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="validationServer02" className="form-label">Statut</label>
                    <select ref={statut} className="form-select mb-3" data-choices>
                        className="form-select mb-3" data-choices>
                        <option value={1}>En cours</option>
                        <option value={2}>Terminé</option>
                    </select>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="prixMin" className="form-label">Prix minimum</label>
                    <input ref={prixmin} type="number" min={1} className="form-control" id="prixMin"
                           placeholder="Prix minimum"/>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="prixMax" className="form-label">Prix maximum</label>
                    <input ref={prixmax} type="number" min={1} className="form-control" id="prixMax"
                           placeholder="Prix maximum"/>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="prixMin" className="form-label">Date début</label>
                    <input ref={datedebut} type="date" min={1} className="form-control" id="dateDebut"/>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="prixMax" className="form-label">Date fin</label>
                    <input ref={datefin} type="date" min={1} className="form-control" id="dateFin"/>
                </div>
            </div>
            <label htmlFor="prixMax" className="form-label">Catégories:</label>
            <br/>
            {categories && categories.map((category, index) => {
                    return (
                        <div key={index} className="form-check form-check-inline">
                            <input className="form-check-input categoryChoices" type="checkbox" id="inlineCheckbox1" value={category.id}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">{category.name}</label>
                        </div>
                    )
                }
            )}
            <br/>
            <br/>
            <button onClick={exec} style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                    type="button" className="btn btn-primary w-100" fdprocessedid="sy0er8">
                Search <span className="fe fe-search"></span>
            </button>
            <br/>
            <br/>
        </>
    );
}