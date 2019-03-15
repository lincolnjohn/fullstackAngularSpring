import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
