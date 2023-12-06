import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CategorieModelServer } from '../models/categorie.model';
import { Marque } from '../models/marque.model';
import { ProduitModelInterfaceResponse, Produit } from '../models/produit.model';
import { CommandeModelServer } from '../models/commande.model';
import { ArticleModelServer } from '../models/article.model';
import { ClientModelServer } from '../models/client.model';
import { StockModelServer } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private apiUrl = "http://localhost:8080/Vente_velo-1.0-SNAPSHOT/api";
  

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategorieModelServer[]> {
    const url = `${this.apiUrl}/categories`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<CategorieModelServer[]>(url, {headers});
  }

  getMarques(): Observable<Marque[]> {
    const url = `${this.apiUrl}/marques`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Marque[]>(url, {headers});
  }

  getProduits(): Observable<Produit[]> {
    const url = `${this.apiUrl}/produits`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Produit[]>(url, {headers});
  }

  getProduit(id: number): Observable<ProduitModelInterfaceResponse> {
    const url = `${this.apiUrl}/produits/${id}`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<ProduitModelInterfaceResponse>(url, {headers});
  }

  getCategorieProduits(id: number): Observable<Produit[]> {
    const url= `${this.apiUrl}/categories/${id}`;
    console.log(url);
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Produit[]>(url, {headers});
  }

  getMarqueProduits(id: number): Observable<Produit[]> {
    const url = `${this.apiUrl}/marques/${id}`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Produit[]>(url, {headers});
  }

  addCommande(commande: CommandeModelServer): Observable<CommandeModelServer> {
    const url = `${this.apiUrl}/commandes`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.put<CommandeModelServer>(url, commande, {headers});
  }

  addArticle(article: ArticleModelServer): Observable<ArticleModelServer> {
    const url = `${this.apiUrl}/articles`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.put<ArticleModelServer>(url, article, {headers});
  }
  addMarque(marque: Marque): Observable<Marque> {
    const url = `${this.apiUrl}/marques`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.post<Marque>(url, marque, {headers});
  }
  addCategorie(categorie: CategorieModelServer): Observable<CategorieModelServer> {
    const url = `${this.apiUrl}/categories`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.post<Marque>(url, categorie, {headers});
  }

  addClient(client: ClientModelServer): Observable<ClientModelServer> {
    const url = `${this.apiUrl}/clients`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.put<ClientModelServer>(url, client, {headers});
  }

  getCommandesClient(id:number): Observable<CommandeModelServer[]> {
    const url = `${this.apiUrl}/clients/${id}`;
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<CommandeModelServer[]>(url, {headers});
  }

  updateStock(stock:StockModelServer): Observable<StockModelServer> {
    const url = `${this.apiUrl}/stocks`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    return this.http.put<StockModelServer>(url, stock, {headers});
  }

}
