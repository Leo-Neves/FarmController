package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.ProdutoVenda;
import io.farmcontroller.repository.ProdutoVendaRepository;
import io.farmcontroller.web.rest.errors.BadRequestAlertException;
import io.farmcontroller.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProdutoVenda.
 */
@RestController
@RequestMapping("/api")
public class ProdutoVendaResource {

    private final Logger log = LoggerFactory.getLogger(ProdutoVendaResource.class);

    private static final String ENTITY_NAME = "produtoVenda";

    private ProdutoVendaRepository produtoVendaRepository;

    public ProdutoVendaResource(ProdutoVendaRepository produtoVendaRepository) {
        this.produtoVendaRepository = produtoVendaRepository;
    }

    /**
     * POST  /produto-vendas : Create a new produtoVenda.
     *
     * @param produtoVenda the produtoVenda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new produtoVenda, or with status 400 (Bad Request) if the produtoVenda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/produto-vendas")
    @Timed
    public ResponseEntity<ProdutoVenda> createProdutoVenda(@RequestBody ProdutoVenda produtoVenda) throws URISyntaxException {
        log.debug("REST request to save ProdutoVenda : {}", produtoVenda);
        if (produtoVenda.getId() != null) {
            throw new BadRequestAlertException("A new produtoVenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProdutoVenda result = produtoVendaRepository.save(produtoVenda);
        return ResponseEntity.created(new URI("/api/produto-vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /produto-vendas : Updates an existing produtoVenda.
     *
     * @param produtoVenda the produtoVenda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated produtoVenda,
     * or with status 400 (Bad Request) if the produtoVenda is not valid,
     * or with status 500 (Internal Server Error) if the produtoVenda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/produto-vendas")
    @Timed
    public ResponseEntity<ProdutoVenda> updateProdutoVenda(@RequestBody ProdutoVenda produtoVenda) throws URISyntaxException {
        log.debug("REST request to update ProdutoVenda : {}", produtoVenda);
        if (produtoVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProdutoVenda result = produtoVendaRepository.save(produtoVenda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, produtoVenda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /produto-vendas : get all the produtoVendas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of produtoVendas in body
     */
    @GetMapping("/produto-vendas")
    @Timed
    public List<ProdutoVenda> getAllProdutoVendas() {
        log.debug("REST request to get all ProdutoVendas");
        return produtoVendaRepository.findAll();
    }

    /**
     * GET  /produto-vendas/:id : get the "id" produtoVenda.
     *
     * @param id the id of the produtoVenda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the produtoVenda, or with status 404 (Not Found)
     */
    @GetMapping("/produto-vendas/{id}")
    @Timed
    public ResponseEntity<ProdutoVenda> getProdutoVenda(@PathVariable String id) {
        log.debug("REST request to get ProdutoVenda : {}", id);
        Optional<ProdutoVenda> produtoVenda = produtoVendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produtoVenda);
    }

    /**
     * DELETE  /produto-vendas/:id : delete the "id" produtoVenda.
     *
     * @param id the id of the produtoVenda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/produto-vendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteProdutoVenda(@PathVariable String id) {
        log.debug("REST request to delete ProdutoVenda : {}", id);

        produtoVendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
