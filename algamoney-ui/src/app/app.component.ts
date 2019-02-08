import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  .col-data-header{
    width:120px;
    text-align: center;
  }

  .col-data{
    width: 120px;
    text-align: center;
  }

  .col-valor-header{
    width:120px;
    text-align: center;
  }

  .col-valor{
    width: 120px;
    text-align: right;
  }
  .col-acoes{
    width: 100px;
    text-align: center;
  }
`]
})
export class AppComponent {

}
