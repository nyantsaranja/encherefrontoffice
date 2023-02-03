import React, {PureComponent, useEffect, useState} from 'react';
import {PieChart, Pie, Tooltip} from "recharts";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";

export const MyPieChart = () => {
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {month: 'long'});
    }

    const [data, setData] = useState(null);
    const setToNameValueObjArray = (data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj.name = getMonthName(data[i][2])
            obj.value = data[i][0]
            arr.push(obj)
        }
        return arr;
    }

    const getCharts = (annee) => {
        axios.get(`${BASE_URL}/recette/annee/${annee}`, CONFIG).then((response) => {
                const arr = setToNameValueObjArray(response.data.data)
            if(arr.length===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: 'Aucune donnée disponible pour cette année',
                })
            }
                setData(
                    arr)
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }

    useEffect(() => {
        getCharts(2023)
    }, []);

    function update() {
        console.log("update")
        getCharts(document.getElementById("annee").value)
    }

    return (
        <div className="row" style={{padding: "30px"}}>
            <div className={"form-group"}>
                <label htmlFor="exampleFormControlSelect1">Entrez une année</label>
                <select onChange={update} className="form-control" id="annee">
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                    <option value={2021}>2021</option>
                    <option value={2020}>2020</option>
                </select>
            </div>
            <div className="col-12 col-lg-12">

                <div className="card card-fill">
                    <div className="card-header">

                        <h4 className="card-header-title">
                            Recettes par mois ( Ar )
                        </h4>

                    </div>
                    <PieChart width={1000} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={data}
                            cx={700}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip/>
                    </PieChart>
                </div>
            </div>
        </div>
    )
}