import {Crud} from "./Crud";

export const ActiveAdmins = () => {
    const headers = [
        "ID",
        "Administrateur",
        "Nombre de paiement accepté"
    ]
    const names = [
        "id",
        "administrateur",
        "nombrepaiement"
    ]
    const rows = [
        [
            "1",
            "Jean Paul",
            "36"
        ]
    ]
    const textValues =
        {
            ajouter: "Ajouter un administrateur",
            modifier: "Accepter le administrateur",
            supprimer: "Supprimer l'administrateur",
            btnCreer: "Créer",
        }
    return (
        <Crud tableTitle={"Liste des administrateurs les plus actifs"} headers={headers} names={names} rows={rows} textValues={textValues} crud={false} page_description={"Les administrateurs ayant acceptés le plus rechargement"}/>
    )
}