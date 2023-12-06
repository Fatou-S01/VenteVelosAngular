import { ArticleModelServer } from "./article.model";
import { CategorieModelServer } from "./categorie.model";
import { Marque } from "./marque.model";
import { StockModelServer } from "./stock.model";

export interface Produit {
    id?: Number;
    nom: String;
    anneeModel: Number;
    prixDepart: number;
    categorieId: CategorieModelServer,
    marqueId: Marque,
    stockCollection?: StockModelServer[],
    articleCommandeCollection?: ArticleModelServer[]
}

export interface ProduitModelInterfaceResponse {
    produit: Produit;
    stocks: StockModelServer[]
}