import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategorieModelServer } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categorie.html',
  styleUrls: ['./categorie.scss'],
  providers: [MessageService, ConfirmationService]
})

export class CategoriesComponent {
  
  errorMsg!: string;


  categorieDialog: boolean = false;

  categories!: CategorieModelServer[];

  categorie!: CategorieModelServer;

  selectedcategories!: CategorieModelServer[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.apiService.getCategories().subscribe((data) => {this.categories = data});

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.categorie = {};
      this.submitted = false;
      this.categorieDialog = true;
  }

  deleteSelectedcategories() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected categories?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.categories = this.categories.filter((val) => !this.selectedcategories?.includes(val));
              this.selectedcategories = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categories Deleted', life: 3000 });
          }
      });
  }

  editcategorie(categorie: CategorieModelServer) {
      this.categorie = { ...categorie };
      this.categorieDialog = true;
  }

  deletecategorie(categorie: CategorieModelServer) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + categorie.nom + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.categories = this.categories.filter((val) => val.id !== categorie.id);
              this.categorie = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categorie Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.categorieDialog = false;
      this.submitted = false;
  }

  savecategorie() {
      this.submitted = true;
      if (this.categorie.nom?.trim()) {
          if (this.categorie.id) {
              this.categories[this.findIndexById(this.categorie.id)] = this.categorie;
            
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categorie Updated', life: 3000 });
          } else {
              this.categorie.id = this.createId();
              this.apiService.addCategorie(this.categorie).subscribe(data=>{this.categories.push(data);console.log(data)})
              
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categorie Created', life: 3000 });
          }

          this.categories = [...this.categories];
          this.categorieDialog = false;
          this.categorie = {};
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): number {
    const min = 10000;
    const max = 99999;
    
    // Utilisation de Math.random() pour générer un nombre aléatoire entre min et max
    let idNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return idNumber;
  }


  }
