import {TableChild} from "../childcomponents/TableChild";
import {FormHeaderComponent} from "../childcomponents/FormHeaderComponent";
import {FormChild} from "../childcomponents/FormChild";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import {useEffect, useState} from "react";

export const Settings = () => {
    const [settings, setSettings] = useState(null);
    const [inputs, setInputs] = useState([[1],[2]]);

    useEffect(() => {
        axios.get(`${BASE_URL}/settings`, CONFIG).then((response) => {
            // console.log(response.data.data)
                setInputs([
                    [
                        {
                            label: "Durée",
                            type: "number",
                            placeholder: "Entrez la durée de l'enchère",
                            name: "duree",
                            className: "form-control myform",
                            value: response.data.data[1].value
                        }
                    ], [
                        {
                            label: "Comission",
                            type: "number",
                            placeholder: "Entrez la comission de l'enchère",
                            name: "comission",
                            className: "form-control myform",
                            value: response.data.data[0].value
                        }
                    ]
                ])
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }, [])
    const modifierDuree = (duree,comission) => {
        console.log(duree)
        const obj = {
            value: duree
        }
        axios.put(`${BASE_URL}/setting/2`, obj, CONFIG).then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Bien...',
                    text: 'La durée a été modifiée',
                })
                //window.location.href = "settings"
            }
        ).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
    }
    const modifierComission = (duree,comission) => {
        // console.log(amount)
        const obj = {
            value: comission
        }
        axios.put(`${BASE_URL}/setting/1`, obj, CONFIG).then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Bien...',
                    text: 'La commission a été modifiée',
                })
                // window.location.href = "settings"
            }
        ).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
        console.log(comission)
    }
    const parameters = [
        {
            title: "Durée",
            subtitle: "Modifier la durée de l'enchère",
            button: {
                value: "Modifier"
            },
            event: modifierDuree,
            imageUrl: "assets/img/covers/HourGlass.jpg"
        },
        {
            title: "Comission",
            subtitle: "Modifier la comission de l'enchère",
            button: {
                value: "Modifier"
            },
            event: modifierComission,
            imageUrl: "assets/img/covers/Money-BG.jpeg"
        }
    ]
    document.getElementById("page-description").innerHTML = "Paramètres de l'application";
    document.getElementById("createBtn").style.display = "none";
    return (
        <>
            <div className="container-fluid" style={{padding: '10px'}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="header mt-md-5">
                            <FormHeaderComponent title={"Enchère"}
                                                 description={"Page de modication des paramètres tel que la durée de l'enchère et la valeur de la comission à prélever après chaque transaction"}/>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                {
                                    parameters.map((parameter, index) => {
                                            return (
                                                <div key={index}>
                                                    <FormChild bottomLink={false} parameters={parameter}
                                                               inputs={inputs[index]}/>
                                                    <hr/>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}