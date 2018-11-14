package br.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.algamoneyapi.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
