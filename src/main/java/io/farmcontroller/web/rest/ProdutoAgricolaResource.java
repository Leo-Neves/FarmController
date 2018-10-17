package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.ProdutoAgricola;
import io.farmcontroller.repository.ProdutoAgricolaRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing ProdutoAgricola.
 */
@RestController
@RequestMapping("/api")
public class ProdutoAgricolaResource {

    private final Logger log = LoggerFactory.getLogger(ProdutoAgricolaResource.class);

    private static final String ENTITY_NAME = "produtoAgricola";

    private ProdutoAgricolaRepository produtoAgricolaRepository;

    public ProdutoAgricolaResource(ProdutoAgricolaRepository produtoAgricolaRepository) {
        this.produtoAgricolaRepository = produtoAgricolaRepository;
    }

    /**
     * POST  /produto-agricolas : Create a new produtoAgricola.
     *
     * @param produtoAgricola the produtoAgricola to create
     * @return the ResponseEntity with status 201 (Created) and with body the new produtoAgricola, or with status 400 (Bad Request) if the produtoAgricola has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/produto-agricolas")
    @Timed
    public ResponseEntity<ProdutoAgricola> createProdutoAgricola(@RequestBody ProdutoAgricola produtoAgricola) throws URISyntaxException {
        log.debug("REST request to save ProdutoAgricola : {}", produtoAgricola);
        if (produtoAgricola.getId() != null) {
            throw new BadRequestAlertException("A new produtoAgricola cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProdutoAgricola result = produtoAgricolaRepository.save(produtoAgricola);
        return ResponseEntity.created(new URI("/api/produto-agricolas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /produto-agricolas : Updates an existing produtoAgricola.
     *
     * @param produtoAgricola the produtoAgricola to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated produtoAgricola,
     * or with status 400 (Bad Request) if the produtoAgricola is not valid,
     * or with status 500 (Internal Server Error) if the produtoAgricola couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/produto-agricolas")
    @Timed
    public ResponseEntity<ProdutoAgricola> updateProdutoAgricola(@RequestBody ProdutoAgricola produtoAgricola) throws URISyntaxException {
        log.debug("REST request to update ProdutoAgricola : {}", produtoAgricola);
        if (produtoAgricola.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProdutoAgricola result = produtoAgricolaRepository.save(produtoAgricola);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, produtoAgricola.getId().toString()))
            .body(result);
    }

    /**
     * GET  /produto-agricolas : get all the produtoAgricolas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of produtoAgricolas in body
     */
    @GetMapping("/produto-agricolas")
    @Timed
    public List<ProdutoAgricola> getAllProdutoAgricolas(@RequestParam(required = false) String filter) {
        if ("colheita-is-null".equals(filter)) {
            log.debug("REST request to get all ProdutoAgricolas where colheita is null");
            return StreamSupport
                .stream(produtoAgricolaRepository.findAll().spliterator(), false)
                .filter(produtoAgricola -> produtoAgricola.getColheita() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ProdutoAgricolas");
        return produtoAgricolaRepository.findAll();
    }

    /**
     * GET  /produto-agricolas/:id : get the "id" produtoAgricola.
     *
     * @param id the id of the produtoAgricola to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the produtoAgricola, or with status 404 (Not Found)
     */
    @GetMapping("/produto-agricolas/{id}")
    @Timed
    public ResponseEntity<ProdutoAgricola> getProdutoAgricola(@PathVariable String id) {
        log.debug("REST request to get ProdutoAgricola : {}", id);
        Optional<ProdutoAgricola> produtoAgricola = produtoAgricolaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produtoAgricola);
    }

    /**
     * DELETE  /produto-agricolas/:id : delete the "id" produtoAgricola.
     *
     * @param id the id of the produtoAgricola to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/produto-agricolas/{id}")
    @Timed
    public ResponseEntity<Void> deleteProdutoAgricola(@PathVariable String id) {
        log.debug("REST request to delete ProdutoAgricola : {}", id);

        produtoAgricolaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
