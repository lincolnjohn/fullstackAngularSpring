package br.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.algamoneyapi.model.Lancamento;
import br.algamoneyapi.repository.lancamento.LancamentoRepositoryQuery;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery{

}
