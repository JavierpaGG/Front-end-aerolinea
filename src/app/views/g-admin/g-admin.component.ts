import { Component } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';

@Component({
  selector: 'app-g-admin',
  standalone: true,
  imports: [GHeaderComponent],
  templateUrl: './g-admin.component.html',
  styleUrl: './g-admin.component.css'
})
export class GAdminComponent {

}
