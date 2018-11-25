package br.algamoneyapi.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.algamoneyapi.model.Lancamento;
import br.algamoneyapi.model.Pessoa;
import br.algamoneyapi.repository.LancamentoRepository;
import br.algamoneyapi.repository.PessoaRepository;
import br.algamoneyapi.service.exception.PessoInexistenteOuInativaException;

@Service
public class LancamentoService {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private LancamentoRepository lancamentoRepository;

	public Lancamento salvar(@Valid Lancamento lancamento) {
		
		Optional<Pessoa> pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());

		if(!pessoa.isPresent() || pessoa.get().isInativo()) {
			
			throw new PessoInexistenteOuInativaException();
		}
		return lancamentoRepository.save(lancamento);
	}
	
	

}
