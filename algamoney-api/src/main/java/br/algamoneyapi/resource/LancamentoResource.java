package br.algamoneyapi.resource;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.algamoneyapi.event.RecursoCriadoEvent;
import br.algamoneyapi.exceptionhandler.AlgamoneyExceptionHandler.Erro;
import br.algamoneyapi.model.Lancamento;
import br.algamoneyapi.repository.LancamentoRepository;
import br.algamoneyapi.repository.filter.LancamentoFilter;
import br.algamoneyapi.service.LancamentoService;
import br.algamoneyapi.service.exception.PessoInexistenteOuInativaException;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoResource {
	
	@Autowired
	private LancamentoRepository lancamentoRepository;
	
	@Autowired
	private LancamentoService lancamentoService;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@Autowired
	private MessageSource messageSource;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('write')")
	public Page<Lancamento> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable){
		
		return lancamentoRepository.filtrar(lancamentoFilter,pageable);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO') and #oauth2.hasScope('write')")
	public ResponseEntity<Lancamento> criar (@Valid @RequestBody Lancamento lancamento, HttpServletResponse response) {
		
		Lancamento lancamentoSalva =  lancamentoService.salvar(lancamento);
		
		publisher.publishEvent(new RecursoCriadoEvent(this, response, lancamentoSalva.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalva);
		
		
	}
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('write')")
	public ResponseEntity<Optional<Lancamento>> buscarPeloCodigo(@PathVariable Long codigo) {
		
		Optional<Lancamento> lancamento = lancamentoRepository.findById(codigo);
		
		return lancamento.isPresent()  ? ResponseEntity.ok(lancamento) : ResponseEntity.notFound().build() ; 
	}
	
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_LANCAMENTO') and #oauth2.hasScope('write')")
	public void remover(@PathVariable Long codigo) {
		lancamentoRepository.deleteById(codigo);
	}
	
	@ExceptionHandler({PessoInexistenteOuInativaException.class})
	public ResponseEntity<Object> handlePessoInexistenteOuInativaException(PessoInexistenteOuInativaException ex){
		
		String mensagemUsuario = messageSource.getMessage("pessoa.inexistente-ou-inativa", null, LocaleContextHolder.getLocale());
		String mensagemDesenvolvedor = ex.toString();
		List<Erro> erros = Arrays.asList(new Erro(mensagemUsuario, mensagemDesenvolvedor));
		
		return ResponseEntity.badRequest().body(erros);
	}
	

}
