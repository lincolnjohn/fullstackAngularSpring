package br.algamoneyapi.service;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
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
		
		validarPessoa(lancamento);
		return lancamentoRepository.save(lancamento);
	}
	
	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
		if(!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}
		
		BeanUtils.copyProperties(lancamento, lancamentoSalvo,"codigo");
		
		return lancamentoRepository.save(lancamentoSalvo);
		
	}

	

	private void validarPessoa(Lancamento lancamento) {
		Pessoa pessoa = null;
		
		if(lancamento.getPessoa().getCodigo() !=null) {
			pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo()).get();
		}
		//if(pessoa == null || ! pessoa.isInativo())
		if(pessoa == null || pessoa.isInativo()){
			 throw new PessoInexistenteOuInativaException();
		}
		
		
	}
	
	private Lancamento buscarLancamentoExistente(Long codigo) {
		Lancamento lancamentoSalvo = lancamentoRepository.findById(codigo).get();
		if(lancamentoSalvo == null) {
			throw new IllegalArgumentException();
		}
		return lancamentoSalvo;
	}
	
	

}
