import {MyPieChart} from "../childcomponents/MyPieChart";

export const BestCategories = () => {
    const data = [
        {name: 'Group A', value: 400},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
        {name: 'Group D', value: 200},
        {name: 'Group E', value: 278},
        {name: 'Group F', value: 189},
    ];
    document.getElementById("header-title").innerHTML = "Catégories";
    document.getElementById("createBtn").style.display = "none";
    const pieChartData = {
        data: data,
        title: "Les meilleurs catégories par an",
        nombretotal: {
            title: "Nombre total de catégories",
            value: 50
        },
        recettetotal: {
            title: "Montant total rapporté",
            value: 100000
        },
        recetteparjour: {
            title: "Montant total rapporté par jour",
            value: 100000
        },
        bestelements: {
            title: "Les meilleurs catégories",
            name: [
                "Electronique",
                "Vêtements"
            ]
        }
    }
    return (
        <div className="container-fluid" style={{padding: '10px'}}>
            <div className="row">
                <div className="col-md-12">
                    <MyPieChart data={pieChartData}/>
                </div>
            </div>
        </div>
    )
}