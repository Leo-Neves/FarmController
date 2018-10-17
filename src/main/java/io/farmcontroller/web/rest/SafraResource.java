package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Safra;
import io.farmcontroller.repository.SafraRepository;
import io.farmcontroller.web.rest.errors.BadRequestAlertException;
import io.farmcontroller.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Safra.
 */
@RestController
@RequestMapping("/api")
public class SafraResource {

    private final Logger log = LoggerFactory.getLogger(SafraResource.class);

    private static final String ENTITY_NAME = "safra";

    private SafraRepository safraRepository;

    public SafraResource(SafraRepository safraRepository) {
        this.safraRepository = safraRepository;
    }

    /**
     * POST  /safras : Create a new safra.
     *
     * @param safra the safra to create
     * @return the ResponseEntity with status 201 (Created) and with body the new safra, or with status 400 (Bad Request) if the safra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/safras")
    @Timed
    public ResponseEntity<Safra> createSafra(@Valid @RequestBody Safra safra) throws URISyntaxException {
        log.debug("REST request to save Safra : {}", safra);
        if (safra.getId() != null) {
            throw new BadRequestAlertException("A new safra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Safra result = safraRepository.save(safra);
        return ResponseEntity.created(new URI("/api/safras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /safras : Updates an existing safra.
     *
     * @param safra the safra to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated safra,
     * or with status 400 (Bad Request) if the safra is not valid,
     * or with status 500 (Internal Server Error) if the safra couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/safras")
    @Timed
    public ResponseEntity<Safra> updateSafra(@Valid @RequestBody Safra safra) throws URISyntaxException {
        log.debug("REST request to update Safra : {}", safra);
        if (safra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Safra result = safraRepository.save(safra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, safra.getId().toString()))
            .body(result);
    }

    /**
     * GET  /safras : get all the safras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of safras in body
     */
    @GetMapping("/safras")
    @Timed
    public List<Safra> getAllSafras() {
        log.debug("REST request to get all Safras");
        return safraRepository.findAll();
    }

    /**
     * GET  /safras/:id : get the "id" safra.
     *
     * @param id the id of the safra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the safra, or with status 404 (Not Found)
     */
    @GetMapping("/safras/{id}")
    @Timed
    public ResponseEntity<Safra> getSafra(@PathVariable String id) {
        log.debug("REST request to get Safra : {}", id);
        Optional<Safra> safra = safraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(safra);
    }

    /**
     * DELETE  /safras/:id : delete the "id" safra.
     *
     * @param id the id of the safra to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/safras/{id}")
    @Timed
    public ResponseEntity<Void> deleteSafra(@PathVariable String id) {
        log.debug("REST request to delete Safra : {}", id);

        safraRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
