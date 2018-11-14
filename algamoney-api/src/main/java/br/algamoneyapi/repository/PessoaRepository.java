package br.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.algamoneyapi.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
