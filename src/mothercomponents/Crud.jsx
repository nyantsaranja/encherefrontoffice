import {TableChild} from "../childcomponents/TableChild";
import Swal from "sweetalert2";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";

export const Crud = ({page_description, headers, names, rows, textValues, crud, tableTitle, userDefinedButton}) => {
    document.getElementById("page-description").innerHTML = page_description;
    const updateCategory = (id) => {
        const array = getCategoryData(id);
        const inputStrings = getHtmlInputString(array, false);
        console.log(inputStrings)
        Swal.fire({
                title: textValues.modifier,
                html: inputStrings,
                showCancelButton: true,
                confirmButtonText: "Modifier",
                cancelButtonText: "Annuler",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    const formControl = document.getElementsByClassName("myform");
                    const obj = getObj(formControl, false);
                    console.log(obj)
                    axios.put(`${BASE_URL}/category/${obj.id}`, obj, CONFIG).then((response) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bien...',
                                text: 'La catégorie a été modifiée',
                            })
                            window.location.href = "categories"
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
            }
        )
    }
    if (!crud) {
        document.getElementById("createBtn").style.display = "none";
    }
    const getObj = (formControl, insert) => {
        const obj = {};
        console.log(formControl.length)
        var number = 0;
        if (insert) {
            number = 1;
        }
        for (let i = 0; i < formControl.length; i++) {
            if (formControl[i].value === "" || formControl[i].value === null || formControl[i].value === undefined) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Veuillez remplir tous les champs !",
                })
                return null;
            } else {
                obj[names[i + number]] = formControl[i].value;
            }
        }
        return obj;
    }

    const getHtmlInputString = (valuesArray, insert) => {
        let htmlString = "";
        console.log(valuesArray)
        valuesArray.forEach((value, index) => {
            console.log(index, insert)
            if (insert && index === 0) {
                return;
            }
            if (insert) {
                value = "";
            }
            // check if the value is a number
            htmlString += `<label>${headers[index]}</label><input type="text" value="${value}" class="form-control myform"/>`;
            htmlString += `<br/>`;
        });
        return htmlString;
    }
    const deleteCategory = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le!'
        }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Supprimé!',
                        'L\'élément a été supprimé.',
                        'success'
                    )
                    axios.delete(`${BASE_URL}/category/${id}`, CONFIG).then((response) => {
                            window.location.href = "categories"
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
            }
        )
    }
    const buttons = [
        {
            value: "Modifier",
            className: "btn btn-warning",
            icon: "fas fa-edit",
            event: updateCategory
        },
        {
            value: "Supprimer",
            className: "btn btn-danger",
            icon: "fas fa-trash",
            event: deleteCategory
        }
    ]
    const createBtn = document.getElementById("createBtn");
    createBtn.innerHTML = textValues.btnCreer;
    createBtn.onclick = async () => {
        const inputStrings = getHtmlInputString(headers, true);
        const {value: formValues} = await Swal.fire({
            title: textValues.ajouter,
            html:
            inputStrings,
            focusConfirm: false,
            preConfirm: () => {
                const formControl = document.getElementsByClassName("myform");
                const obj = getObj(formControl, true);
                console.log(obj)

                axios.post(`${BASE_URL}/category`, obj, CONFIG).then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: "success",
                            title: "Ajouté avec succès",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                ).catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Une erreur s'est produite !",
                        })
                    }
                )
            }
        })
    }
    const getCategoryData = (id) => {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === id) {
                return rows[i];
            }
        }
    }
    return (
        <div className="container-fluid" style={{padding: '10px'}}>
            <div className="row">
                <div className="col-md-12">
                    <TableChild userDefinedButton={userDefinedButton} titre={tableTitle} headers={headers} rows={rows}
                                buttons={crud === true ? buttons : undefined}/>
                </div>
            </div>
        </div>
    )
}