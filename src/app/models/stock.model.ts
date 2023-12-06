import { MagasinModelServer } from "./magasin.model"
import { Produit } from "./produit.model";

export interface StockModelServer {
    stockPK: {
        magasinId: MagasinModelServer;
        produitId: Produit;
    };
    quantite: number;
    produitId: Produit;
    magasinId: MagasinModelServer;
}