package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Colheita;
import io.farmcontroller.repository.ColheitaRepository;
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
 * REST controller for managing Colheita.
 */
@RestController
@RequestMapping("/api")
public class ColheitaResource {

    private final Logger log = LoggerFactory.getLogger(ColheitaResource.class);

    private static final String ENTITY_NAME = "colheita";

    private ColheitaRepository colheitaRepository;

    public ColheitaResource(ColheitaRepository colheitaRepository) {
        this.colheitaRepository = colheitaRepository;
    }

    /**
     * POST  /colheitas : Create a new colheita.
     *
     * @param colheita the colheita to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colheita, or with status 400 (Bad Request) if the colheita has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colheitas")
    @Timed
    public ResponseEntity<Colheita> createColheita(@RequestBody Colheita colheita) throws URISyntaxException {
        log.debug("REST request to save Colheita : {}", colheita);
        if (colheita.getId() != null) {
            throw new BadRequestAlertException("A new colheita cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colheita result = colheitaRepository.save(colheita);
        return ResponseEntity.created(new URI("/api/colheitas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colheitas : Updates an existing colheita.
     *
     * @param colheita the colheita to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colheita,
     * or with status 400 (Bad Request) if the colheita is not valid,
     * or with status 500 (Internal Server Error) if the colheita couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colheitas")
    @Timed
    public ResponseEntity<Colheita> updateColheita(@RequestBody Colheita colheita) throws URISyntaxException {
        log.debug("REST request to update Colheita : {}", colheita);
        if (colheita.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Colheita result = colheitaRepository.save(colheita);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colheita.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colheitas : get all the colheitas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of colheitas in body
     */
    @GetMapping("/colheitas")
    @Timed
    public List<Colheita> getAllColheitas(@RequestParam(required = false) String filter) {
        if ("plantio-is-null".equals(filter)) {
            log.debug("REST request to get all Colheitas where plantio is null");
            return StreamSupport
                .stream(colheitaRepository.findAll().spliterator(), false)
                .filter(colheita -> colheita.getPlantio() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Colheitas");
        return colheitaRepository.findAll();
    }

    /**
     * GET  /colheitas/:id : get the "id" colheita.
     *
     * @param id the id of the colheita to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colheita, or with status 404 (Not Found)
     */
    @GetMapping("/colheitas/{id}")
    @Timed
    public ResponseEntity<Colheita> getColheita(@PathVariable String id) {
        log.debug("REST request to get Colheita : {}", id);
        Optional<Colheita> colheita = colheitaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(colheita);
    }

    /**
     * DELETE  /colheitas/:id : delete the "id" colheita.
     *
     * @param id the id of the colheita to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colheitas/{id}")
    @Timed
    public ResponseEntity<Void> deleteColheita(@PathVariable String id) {
        log.debug("REST request to delete Colheita : {}", id);

        colheitaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
