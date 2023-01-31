const reponse = await fetch('pieces-autos.json'); //On va chercher le json
const pieces = await reponse.json(); // On créue une constante pieces que l'on associe au résultat renvoyé par le json
// On peut aussi utiliser const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// Pour un seul objet


// const article = pieces[0]; //On crée une const article que l'on associe à la première pièce du tableau JSON

// const imageElement = document.createElement("img"); //On crée un nouvel élément img
// imageElement.src = article.image; // On modifie la source de cet élément pour ajouter l'url de l'image

// const nomElement = document.createElement("h2"); //On crée un nouvel élément h2
// nomElement.innerText = article.nom; // On y ajoute le nom de l'article

// const prixElement = document.createElement("p");
// prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`; // On y ajoute le texte "Prix:" puis le prix de l'article. Si le prix est inférieur à 35e on met €, sinon €€€.

// const categorieElement = document.createElement("p");
// categorieElement.innerText = article.categorie ?? "(aucune catégorie)"; // On y ajoute la catégorie, si y'en n'a pas on écrit "aucune catégorie"

// const descriptionElement = document.createElement("p");
// descriptionElement.innerText = article.description ?? "Pas de description pour le moment";

// const disponibiliteElement = document.createElement("p");
// disponibiliteElement.innerText = article.disponibilite ? "en stock" : "rupture de stock"; // Si true : en stock, si false : rupture de stock


 // Pour faire ce rattachement, nous avons besoin d’un parent. En effet, le DOM structure les éléments sous forme d’arbre avec des enfants et des parents. 
 //Il faut donc trouver un parent pour accueillir nos nouveaux éléments. Ainsi, nous allons utiliser la fonction appendChild en JavaScript.

// const sectionFiches = document.querySelector(".fiches"); // Notre page web contient une balise section avec la classe “fiches” que nous utiliserons comme parent. Nous la récupérons grâce à querySelector
// sectionFiches.appendChild(imageElement);
// sectionFiches.appendChild(nomElement);
// sectionFiches.appendChild(prixElement);
// sectionFiches.appendChild(categorieElement);
// sectionFiches.appendChild(descriptionElement);
// sectionFiches.appendChild(disponibiliteElement);

// pour tous les objets, on utilise un for of

for (let i = 0; i < pieces.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = pieces[i].image;
    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2"); //On crée un nouvel élément h2
    nomElement.innerText = pieces[i].nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? ("aucune catégorie");
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment";
    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
    
    
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
    }

    //Trier les articles en fonction du prix du plus petit ua plus grand avec la fonction sort

    const boutonTrier = document.querySelector(".btn-trier");
    boutonTrier.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces); //On crée une copie de la fonction pour travailler car si on fait ça directement sur la fonction ça va changer l'ordre des éléments.
        piecesOrdonnees.sort(function (a, b) { // La focntion sort permet de comparer les prix pour dire lequel doit être rangé avant l'autre. Si la fn anonyme retourne un nombre positif, B sera avant A. Sinon, inversement. Si = , R.
            return a.prix - b.prix; // Fonction anonyme
        });
        console.log(piecesOrdonnees);
    });
    // Trier par ordre décroissant

    const boutonTrierDec = document.querySelector(".btn-trierDec");
    boutonTrierDec.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces); //On crée une copie de la fonction pour travailler car si on fait ça directement sur la fonction ça va changer l'ordre des éléments.
        piecesOrdonnees.sort(function (a, b) { // La fonction sort permet de comparer les prix pour dire lequel doit être rangé avant l'autre. Si la fn anonyme retourne un nombre positif, B sera avant A. Sinon, inversement. Si = , R.
            return b.prix - a.prix; // Fonction anonyme
        });
        console.log(piecesOrdonnees);
    });

    // Filtrer les pièces non abordables avec la fonction filter

    const boutonFiltrer = document.querySelector(".btn-filtrer");

    boutonFiltrer.addEventListener("click", function () {
       const piecesFiltrees = pieces.filter(function (piece) { // Pas besoin de créer une copie car la fonction filter le fait pour nous.
           return piece.prix <= 35; // On retourne uniquement les éléments qui ont un prix <= 35
       });
       console.log(piecesFiltrees);
    });

    // Filtrer les pièces qui n'ont pas de description

    const boutonFiltrerDesc = document.querySelector(".btn-filtrerDesc");

    boutonFiltrerDesc.addEventListener("click", function() {
        const piecesFiltrees = pieces.filter(function(piece) {
            return piece.description; // On retourne l'élément seulement si y'a une description
        });
        console.log(piecesFiltrees);
    });

    // Fonction map

    // On veut récupérer uniquement les noms de chaque objet. pour ça on utilise map

    // const noms = Map(function (piece){
    //     return piece.nom;
    // });

    // fonction lambda.

    // fait une fonction map mais en plus court

    const noms = pieces.map(piece => piece.nom);
    // Maintenant on veut retirer le noms des pièces qui ne sont pas abordables. On utilise une boucle pour parcourir tous les noms
    for(let i = pieces.length -1 ; i>=0; i--) { // On la fait commencer au dernier indice (pieces.length -1). La condition de la boucle est "tant que i >=0". A chaque tour, on diminuera la valeur de i (i--)
// On parcourt le tableau en sens inverse car si on le fait dans l'ordre, en supprimant des objets ça fait que certains ne seront pas testés.
        if(pieces[i].prix >35){ // On écrit la condition qui vérifie si la pièce a une valeur > 35
            noms.splice(i,1); // Si c'est le cas, on supprime le nom de la pièce dans la liste nom avec la fonction splice.
        }} // C'est quand même plus simple avec filter
        console.log(noms)
        
        // Bon c'est bien joli tout ça mais on veut afficher ça dans le html

        //Création de la liste
    const abordablesElements = document.createElement('ul');
        //Ajout de chaque nom à la liste
    for(let i=0; i < noms.length ; i++){ // On parcourt la liste des noms. Puis dans, chaque boucle :
    const nomElement = document.createElement('li'); // On crée un élément li
    nomElement.innerText = noms[i]; // On écrit les noms récupérés dans la fonction map
    abordablesElements.appendChild(nomElement) // On relie au parent avec appendchild
    }
// Rien ne s'affiche car l'élément ul créé plus tôt n'est pas rattaché dans la page. On aurait pu le mettre direct après la création de abordablesElements.
    document.querySelector('.abordables')
    .appendChild(abordablesElements)

    // On veut récupérer les noms et les prix des pièces disponibles uniquement
    const nomsPrix = pieces.map(piece => piece.nom + ` - ${piece.prix} €.`);
    for(let i = pieces.length -1 ; i>=0; i--) {
        if(pieces[i].disponibilite === false){
            nomsPrix.splice(i,1);
        }}
        console.log(nomsPrix)


        const availableElements = document.createElement('ul');
        document.querySelector('.disponibles')
        .appendChild(availableElements)

        for(let i=0; i < nomsPrix.length ; i++){ 
            const nomPrixElement = document.createElement('li');
            nomPrixElement.innerText = nomsPrix[i]; 
            availableElements.appendChild(nomPrixElement)
        }

        // Efface le contenu de la balise body et donc l’écran
    document.querySelector(".fiches").innerHTML = ''

    // On refait tout le code d'avant mais en utilisant innerHTML

    