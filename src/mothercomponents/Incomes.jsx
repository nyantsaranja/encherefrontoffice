import {MyPieChart} from "../childcomponents/MyPieChart";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL, CONFIG} from "../service/Api-Call";

export const Incomes = () => {
    document.getElementById("page-description").innerHTML = "Revenu par mois";
    document.getElementById("createBtn").style.display = "none";
    return (
        <div className="container-fluid" style={{padding: '10px'}}>
            <div className="row">
                <div className="col-md-12">
                    <MyPieChart/>
                </div>
            </div>
        </div>
    )
}