export function ajoutListenersAvis() { // export sert à rendre la fonction disponible en dehors du fichier

    const piecesElements = document.querySelectorAll(".fiches article button"); // On récupère les balises button qui sont dans la fiche produit
    for (let i = 0; i < piecesElements.length; i++) { // On ajoute un event listener 'clic' à tous les boutons

        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id; // dataset permet de récupérer la valeur de dataid (voir création du bouton)
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`); // ça nous permet d'appeler la fonction fetch avec un url personnalisé
            // La réponse de l’API prend la forme d’une chaîne de caractères au format JSON. Nous devons donc désérialiser ce JSON, cad reconstruire les données décrites par la chaîne de caractères
            // dans la mémoire de l’ordinateur.Pour y parvenir, nous rajoutons un appel à la fonction JSON sur l’objet reponse. Il faut également utiliser le mot clé await, car cette opération est aussi asynchrone
            const avis = await reponse.json();
            console.log(avis)
            // La constante avis contient désormais une liste d’objets de tous les avis pour une pièce en particulier. Il ne nous reste plus qu’à générer des éléments grâce aux fonctions createElement et appendChild :
            const pieceElement = event.target.parentElement;

            const avisElement = document.createElement("p");
            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].nbEtoiles} étoiles <br> ${avis[i].commentaire} <br><br>`;
            }
            pieceElement.appendChild(avisElement);
        });
    }
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
event.preventDefault();
        // Création de l’objet du nouvel avis.
const avis = {
    pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
    utilisateur: event.target.querySelector("[name=utilisateur").value,
    commentaire: event.target.querySelector("[name=commentaire]").value,
    nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
 };
 // Création de la charge utile au format JSON // On convertit avis en JSON
const chargeUtile = JSON.stringify(avis);
// Appel de la fonction fetch avec toutes les informations nécessaires // On envoie chargeUtile sans le JSON via l'API
fetch("http://localhost:8081/avis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile
});
    });
}

