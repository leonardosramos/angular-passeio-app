import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService, 
    private lugarService: LugarService){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log("Carregando as categorias...")
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => this.categorias = listaCategorias
      
    })
  }

  salvar(){
    if(this.camposForm.valid){
      this.lugarService.salvar(this.camposForm.value).subscribe({
        next: lugar => {
          console.log("O lugar foi salvo com sucesso! ", lugar)
          this.camposForm.reset
        },
        error: erro => {
          console.log("Deu erro: ", erro)
        }
      }
      )
    }
  }

}
