var url = 'https://swapi.co/api/people/?format=json&page=1';
var firstData = '';
var paginationData = '';
var b = '';
var tabtri = '';
var idmethode = 0;
var dataFair = [];

const next = document.getElementById('next');
const prev = document.getElementById('prev');

//Methode pour afficher les données dans tableau
function afficher(tableau) {
    var size = tableau.length;
    var output = "";

    for (var i = 0; i < size; i++) {
        output += `
        <tr>
        <td> ${tableau[i].name}</td>
        <td> ${tableau[i].height}</td>
        <td> ${tableau[i].mass}</td>
        <td> ${tableau[i].hair_color}</td>
        <td> ${tableau[i].skin_color}</td>
        <td> ${tableau[i].eye_color}</td>
        <td> ${tableau[i].birth_year}</td>
        </tr>	
    `;
    }

    document.getElementById("nom").innerHTML = output;
}

//Methode de tri par nom
function tri(a, b) {
    return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
}
//Methode de tri par height
function trinum(a, b) {
    return (a.height - b.height);
}

function paginationcondition() {
    if (paginationData.next) {
        next.classList.remove("disbaled");
        next.disabled = false;
    } else {
        next.classList.add("disbaled");
        next.disabled = true;
    }

    if (paginationData.previous) {
        prev.classList.remove("disbaled");
        prev.disabled = false;
    } else {
        prev.classList.add("disbaled");
        prev.disabled = true;
    }
}

function verificationid() {
    //Si l'id egale a la valeur 1 , on implement la methode tri par nom
    if (idmethode == 1) triparnom();

    if (idmethode == 3) {
        //Si l'id egale a la valeur 3 , on implement la methode recherche
        for (var i = 0; i < t.length; i++) {
            if (t[i].skin_color == "fair") {
                dataFair.push(t[i]);
                dataFair.sort(tri);


            }
        }
        afficher(dataFair);

        console.log("test recherche");

    }

    if (idmethode == 2) {
        //Si l'id egale a la valeur 2 , on implement la methode tri par height
        triparheight();
    }

}


//Methode pour recupérer les données Json
const getDatafinal = async(url) => {
    let users = await fetch(url);
    let data = await users.json();

    //Data sur laquelle on vas appliquer la pagination
    paginationData = data;
    firstData = data.results;

    setFirstdataaa(firstData);
    paginationcondition();
    verificationid();
    afficher(t);
}

//implementation de la methode de récupération des données
getDatafinal(url);

//Methode pour afficher tout les données dans un tableau avec pagination
const affichertout = () => {
    console.log("Méthode pour afficher tout les données");
    afficher(firstData);
}


//methode pour cloner l'objet retourner de la base de donnees pour ne pas modifier les donnees initiales
const setFirstdataaa = async(x) => {
    t = Object.assign({}, x);
    //the type of fistdata is an object so we should convert to an array
    //Converting an Object to an Array of Objects to apply the function Sort()
    t = Object.keys(firstData).map(i => firstData[i]);
}

//Méthode pour afficher les données triées par nom
const triparnom = () => {
    tabtri = t.sort(tri);

    afficher(tabtri);

    // l'id de la methode tri par nom =1
    idmethode = 1;
}

// Rethode pour afficher les données triées par Height
const triparheight = () => {

        tabtri = t.sort(trinum);
        afficher(tabtri);
        //l'id de la methode tri par Height=2
        idmethode = 2;

    }
    //methode pour afficher les personnes qui ont skin.color="fair"
const recherche = () => {
    idmethode = 3;
    let dataFair = [];

    for (var i = 0; i < t.length; i++) {
        if (t[i].skin_color == "fair") {
            dataFair.push(t[i]);
            dataFair.sort(tri);


        }
    }
    console.log(dataFair);
    afficher(dataFair);
}

//methode pour pagination next
function pageNext() {
    console.log(paginationData.next);
    getDatafinal(paginationData.next);

}
//methode pour pagination previous
function pagePrev() {
    console.log(paginationData.previous);
    getDatafinal(paginationData.previous);
}