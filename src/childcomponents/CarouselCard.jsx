import * as Utility from "../service/Utility";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {formatDate} from "../service/Utility";

export const CarouselCard = ({data}) => {


    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Enchère #{data?.id}</h3>
                <ul>
                    <li>Titre: {data?.title}</li>
                    <li>Description: {data?.description}</li>
                    <li>Catégorie:</li>
                    <ul>
                        <li>Description:</li>
                    </ul>
                    <li>Vendeur: {data?.seller?.lastname} {data?.seller?.firstname}</li>
                    <li>Date de début: {formatDate(data?.startDate)}</li>
                    <li>Date de clôture: {formatDate(data?.endDate)}</li>
                    <li>Nombre de photos: {data?.galerie.length}</li>
                </ul>
            </div>
        </div>
    );
}