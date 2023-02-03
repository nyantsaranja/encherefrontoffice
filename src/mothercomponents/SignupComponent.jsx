import {FormChild} from "../childcomponents/FormChild";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from "../service/Api-Call";

export const SignupComponent = () => {
    const signup = (firstname, lastname, email, password, birthdate, phone_number) => {
        const role_id = 1;
        const obj = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            birthdate: birthdate,
            phoneNumber: phone_number,
            role: {
                id: role_id
            }
        }
        axios.post(`${BASE_URL}/admin`, obj).then((response) => {
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenue...',
                    text: 'Vous êtes maintenant inscrit',
                })
                window.location.href = "login"
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            console.log(error)
            }
        )
    }
    const parameters = {
        title: "Inscription",
        subtitle: "Créez votre compte",
        signinUrl: "/login",
        event: signup,
        button: {
            value: "S'inscrire"
        },
        imageUrl: "assets/img/covers/auction-bg1.jpg"
    }
    const inputs = [
        {
            label: "Prénom",
            type: "text",
            placeholder: "Entrez votre prénom",
            name: "firstname",
            className: "form-control myform"
        },
        {
            label: "Nom",
            type: "text",
            placeholder: "Entrez votre nom",
            name: "lastname",
            className: "form-control myform"
        },
        {
            label: "Email",
            type: "email",
            placeholder: "abc@gmail.com",
            name: "email",
            className: "form-control myform"
        },
        {
            label: "Mot de passe",
            type: "password",
            placeholder: "Entrez votre mot de passe",
            name: "password",
            className: "form-control myform"
        },
        {
            label: "Date de naissance",
            type: "date",
            placeholder: "Entrez votre date de naissance",
            name: "birthdate",
            className: "form-control myform"
        },
        {
            label: "Numéro de téléphone",
            type: "tel",
            placeholder: "0xxxxxxxxx",
            name: "phone_number",
            className: "form-control myform",
        }
    ]
    return (
        <FormChild parameters={parameters} inputs={inputs}/>
    )
}