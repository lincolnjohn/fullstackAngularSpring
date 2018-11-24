package br.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.algamoneyapi.model.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>{

}
