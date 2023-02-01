export function ajoutListenersAvis() { // export sert à rendre la fonction disponible en dehors du fichier

    const piecesElements = document.querySelectorAll(".fiches article button"); // On récupère les balises button qui sont dans la fiche produit
    for (let i = 0; i < piecesElements.length; i++) { // On ajoute un event listener 'clic' à tous les boutons

        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id; // dataset permet de récupérer la valeur de dataid (voir création du bouton)
            fetch(`http://localhost:8081/pieces/${id}/avis`); // ça nous permet d'appeler la fonction fetch avec un url personnalisé
        });
    }
}
