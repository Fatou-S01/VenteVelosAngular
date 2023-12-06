import { Component } from '@angular/core';
import { Marque } from 'src/app/models/marque.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class MarquesComponent {
  
  errorMsg!: string;


  marqueDialog: boolean = false;

  marques!: Marque[];

  marque!: Marque;

  selectedmarques!: Marque[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.apiService.getMarques().subscribe((data) => {this.marques = data});

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.marque = {};
      this.submitted = false;
      this.marqueDialog = true;
  }

  deleteSelectedmarques() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected marques?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.marques = this.marques.filter((val) => !this.selectedmarques?.includes(val));
              this.selectedmarques = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marques Deleted', life: 3000 });
          }
      });
  }

  editmarque(marque: Marque) {
      this.marque = { ...marque };
      this.marqueDialog = true;
  }

  deletemarque(marque: Marque) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + marque.nom + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.marques = this.marques.filter((val) => val.id !== marque.id);
              this.marque = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marque Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.marqueDialog = false;
      this.submitted = false;
  }

  savemarque() {
      this.submitted = true;
      if (this.marque.nom?.trim()) {
          if (this.marque.id) {
              this.marques[this.findIndexById(this.marque.id)] = this.marque;
            
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marque Updated', life: 3000 });
          } else {
              this.marque.id = this.createId();
              this.apiService.addMarque(this.marque).subscribe(data=>{this.marques.push(data);console.log(data)})
              
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marque Created', life: 3000 });
          }

          this.marques = [...this.marques];
          this.marqueDialog = false;
          this.marque = {};
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.marques.length; i++) {
          if (this.marques[i].id === id) {
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
