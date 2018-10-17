package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Talhao;
import io.farmcontroller.repository.TalhaoRepository;
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
 * REST controller for managing Talhao.
 */
@RestController
@RequestMapping("/api")
public class TalhaoResource {

    private final Logger log = LoggerFactory.getLogger(TalhaoResource.class);

    private static final String ENTITY_NAME = "talhao";

    private TalhaoRepository talhaoRepository;

    public TalhaoResource(TalhaoRepository talhaoRepository) {
        this.talhaoRepository = talhaoRepository;
    }

    /**
     * POST  /talhaos : Create a new talhao.
     *
     * @param talhao the talhao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new talhao, or with status 400 (Bad Request) if the talhao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/talhaos")
    @Timed
    public ResponseEntity<Talhao> createTalhao(@RequestBody Talhao talhao) throws URISyntaxException {
        log.debug("REST request to save Talhao : {}", talhao);
        if (talhao.getId() != null) {
            throw new BadRequestAlertException("A new talhao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Talhao result = talhaoRepository.save(talhao);
        return ResponseEntity.created(new URI("/api/talhaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /talhaos : Updates an existing talhao.
     *
     * @param talhao the talhao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated talhao,
     * or with status 400 (Bad Request) if the talhao is not valid,
     * or with status 500 (Internal Server Error) if the talhao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/talhaos")
    @Timed
    public ResponseEntity<Talhao> updateTalhao(@RequestBody Talhao talhao) throws URISyntaxException {
        log.debug("REST request to update Talhao : {}", talhao);
        if (talhao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Talhao result = talhaoRepository.save(talhao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, talhao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /talhaos : get all the talhaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of talhaos in body
     */
    @GetMapping("/talhaos")
    @Timed
    public List<Talhao> getAllTalhaos() {
        log.debug("REST request to get all Talhaos");
        return talhaoRepository.findAll();
    }

    /**
     * GET  /talhaos/:id : get the "id" talhao.
     *
     * @param id the id of the talhao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the talhao, or with status 404 (Not Found)
     */
    @GetMapping("/talhaos/{id}")
    @Timed
    public ResponseEntity<Talhao> getTalhao(@PathVariable String id) {
        log.debug("REST request to get Talhao : {}", id);
        Optional<Talhao> talhao = talhaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(talhao);
    }

    /**
     * DELETE  /talhaos/:id : delete the "id" talhao.
     *
     * @param id the id of the talhao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/talhaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTalhao(@PathVariable String id) {
        log.debug("REST request to delete Talhao : {}", id);

        talhaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
