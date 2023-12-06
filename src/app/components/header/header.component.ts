import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CategorieModelServer } from 'src/app/models/categorie.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  faCart = faCartShopping;
  faHeart = faHeart;


  
  constructor( private router: Router) {}

  ngOnInit(): void {
    
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }


}