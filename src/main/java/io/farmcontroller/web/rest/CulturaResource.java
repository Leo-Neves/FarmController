package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Cultura;
import io.farmcontroller.repository.CulturaRepository;
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
 * REST controller for managing Cultura.
 */
@RestController
@RequestMapping("/api")
public class CulturaResource {

    private final Logger log = LoggerFactory.getLogger(CulturaResource.class);

    private static final String ENTITY_NAME = "cultura";

    private CulturaRepository culturaRepository;

    public CulturaResource(CulturaRepository culturaRepository) {
        this.culturaRepository = culturaRepository;
    }

    /**
     * POST  /culturas : Create a new cultura.
     *
     * @param cultura the cultura to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cultura, or with status 400 (Bad Request) if the cultura has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/culturas")
    @Timed
    public ResponseEntity<Cultura> createCultura(@RequestBody Cultura cultura) throws URISyntaxException {
        log.debug("REST request to save Cultura : {}", cultura);
        if (cultura.getId() != null) {
            throw new BadRequestAlertException("A new cultura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cultura result = culturaRepository.save(cultura);
        return ResponseEntity.created(new URI("/api/culturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /culturas : Updates an existing cultura.
     *
     * @param cultura the cultura to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cultura,
     * or with status 400 (Bad Request) if the cultura is not valid,
     * or with status 500 (Internal Server Error) if the cultura couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/culturas")
    @Timed
    public ResponseEntity<Cultura> updateCultura(@RequestBody Cultura cultura) throws URISyntaxException {
        log.debug("REST request to update Cultura : {}", cultura);
        if (cultura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cultura result = culturaRepository.save(cultura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cultura.getId().toString()))
            .body(result);
    }

    /**
     * GET  /culturas : get all the culturas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of culturas in body
     */
    @GetMapping("/culturas")
    @Timed
    public List<Cultura> getAllCulturas() {
        log.debug("REST request to get all Culturas");
        return culturaRepository.findAll();
    }

    /**
     * GET  /culturas/:id : get the "id" cultura.
     *
     * @param id the id of the cultura to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cultura, or with status 404 (Not Found)
     */
    @GetMapping("/culturas/{id}")
    @Timed
    public ResponseEntity<Cultura> getCultura(@PathVariable String id) {
        log.debug("REST request to get Cultura : {}", id);
        Optional<Cultura> cultura = culturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cultura);
    }

    /**
     * DELETE  /culturas/:id : delete the "id" cultura.
     *
     * @param id the id of the cultura to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/culturas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCultura(@PathVariable String id) {
        log.debug("REST request to delete Cultura : {}", id);

        culturaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
