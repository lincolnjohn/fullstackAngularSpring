package br.algamoneyapi.repository.lancamento;

import java.util.List;

import br.algamoneyapi.model.Lancamento;
import br.algamoneyapi.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {
	
	public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter);

}
