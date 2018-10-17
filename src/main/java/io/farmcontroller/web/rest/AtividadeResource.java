package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Atividade;
import io.farmcontroller.repository.AtividadeRepository;
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
 * REST controller for managing Atividade.
 */
@RestController
@RequestMapping("/api")
public class AtividadeResource {

    private final Logger log = LoggerFactory.getLogger(AtividadeResource.class);

    private static final String ENTITY_NAME = "atividade";

    private AtividadeRepository atividadeRepository;

    public AtividadeResource(AtividadeRepository atividadeRepository) {
        this.atividadeRepository = atividadeRepository;
    }

    /**
     * POST  /atividades : Create a new atividade.
     *
     * @param atividade the atividade to create
     * @return the ResponseEntity with status 201 (Created) and with body the new atividade, or with status 400 (Bad Request) if the atividade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/atividades")
    @Timed
    public ResponseEntity<Atividade> createAtividade(@RequestBody Atividade atividade) throws URISyntaxException {
        log.debug("REST request to save Atividade : {}", atividade);
        if (atividade.getId() != null) {
            throw new BadRequestAlertException("A new atividade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Atividade result = atividadeRepository.save(atividade);
        return ResponseEntity.created(new URI("/api/atividades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /atividades : Updates an existing atividade.
     *
     * @param atividade the atividade to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated atividade,
     * or with status 400 (Bad Request) if the atividade is not valid,
     * or with status 500 (Internal Server Error) if the atividade couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/atividades")
    @Timed
    public ResponseEntity<Atividade> updateAtividade(@RequestBody Atividade atividade) throws URISyntaxException {
        log.debug("REST request to update Atividade : {}", atividade);
        if (atividade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Atividade result = atividadeRepository.save(atividade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, atividade.getId().toString()))
            .body(result);
    }

    /**
     * GET  /atividades : get all the atividades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of atividades in body
     */
    @GetMapping("/atividades")
    @Timed
    public List<Atividade> getAllAtividades() {
        log.debug("REST request to get all Atividades");
        return atividadeRepository.findAll();
    }

    /**
     * GET  /atividades/:id : get the "id" atividade.
     *
     * @param id the id of the atividade to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the atividade, or with status 404 (Not Found)
     */
    @GetMapping("/atividades/{id}")
    @Timed
    public ResponseEntity<Atividade> getAtividade(@PathVariable String id) {
        log.debug("REST request to get Atividade : {}", id);
        Optional<Atividade> atividade = atividadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(atividade);
    }

    /**
     * DELETE  /atividades/:id : delete the "id" atividade.
     *
     * @param id the id of the atividade to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/atividades/{id}")
    @Timed
    public ResponseEntity<Void> deleteAtividade(@PathVariable String id) {
        log.debug("REST request to delete Atividade : {}", id);

        atividadeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
