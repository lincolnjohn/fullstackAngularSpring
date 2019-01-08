package br.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.algamoneyapi.model.Pessoa;
import br.algamoneyapi.repository.pessoa.PessoaRepositoryQuery;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>, PessoaRepositoryQuery{

}
