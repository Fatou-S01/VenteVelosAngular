import { CommandeModelServer } from "./commande.model"
import { Produit } from "./produit.model"

export interface ArticleModelServer {
    articleCommandePK: {
        numeroCommande: Number;
        ligne: Number
    };
    quantite: Number;
    prixDepart: Number;
    remise: Number;
    produitId: Produit;
    commandeId: CommandeModelServer
}