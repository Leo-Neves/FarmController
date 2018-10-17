package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Fazenda;
import io.farmcontroller.repository.FazendaRepository;
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
 * REST controller for managing Fazenda.
 */
@RestController
@RequestMapping("/api")
public class FazendaResource {

    private final Logger log = LoggerFactory.getLogger(FazendaResource.class);

    private static final String ENTITY_NAME = "fazenda";

    private FazendaRepository fazendaRepository;

    public FazendaResource(FazendaRepository fazendaRepository) {
        this.fazendaRepository = fazendaRepository;
    }

    /**
     * POST  /fazendas : Create a new fazenda.
     *
     * @param fazenda the fazenda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fazenda, or with status 400 (Bad Request) if the fazenda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fazendas")
    @Timed
    public ResponseEntity<Fazenda> createFazenda(@RequestBody Fazenda fazenda) throws URISyntaxException {
        log.debug("REST request to save Fazenda : {}", fazenda);
        if (fazenda.getId() != null) {
            throw new BadRequestAlertException("A new fazenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fazenda result = fazendaRepository.save(fazenda);
        return ResponseEntity.created(new URI("/api/fazendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fazendas : Updates an existing fazenda.
     *
     * @param fazenda the fazenda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fazenda,
     * or with status 400 (Bad Request) if the fazenda is not valid,
     * or with status 500 (Internal Server Error) if the fazenda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fazendas")
    @Timed
    public ResponseEntity<Fazenda> updateFazenda(@RequestBody Fazenda fazenda) throws URISyntaxException {
        log.debug("REST request to update Fazenda : {}", fazenda);
        if (fazenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fazenda result = fazendaRepository.save(fazenda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fazenda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fazendas : get all the fazendas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fazendas in body
     */
    @GetMapping("/fazendas")
    @Timed
    public List<Fazenda> getAllFazendas() {
        log.debug("REST request to get all Fazendas");
        return fazendaRepository.findAll();
    }

    /**
     * GET  /fazendas/:id : get the "id" fazenda.
     *
     * @param id the id of the fazenda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fazenda, or with status 404 (Not Found)
     */
    @GetMapping("/fazendas/{id}")
    @Timed
    public ResponseEntity<Fazenda> getFazenda(@PathVariable String id) {
        log.debug("REST request to get Fazenda : {}", id);
        Optional<Fazenda> fazenda = fazendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fazenda);
    }

    /**
     * DELETE  /fazendas/:id : delete the "id" fazenda.
     *
     * @param id the id of the fazenda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fazendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFazenda(@PathVariable String id) {
        log.debug("REST request to delete Fazenda : {}", id);

        fazendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
