import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Vestuário', value: 2},
    {label: 'Transporte', value: 3},
  ];

  pessoas = [
    {label: 'Maria do Nascimento', value: 1},
    {label: 'Ana Maria', value: 2},
    {label: 'Pedro Alcântara', value: 3},
  ];
  constructor() { }

  ngOnInit() {
  }

}
