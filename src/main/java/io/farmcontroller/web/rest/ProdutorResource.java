package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Produtor;
import io.farmcontroller.repository.ProdutorRepository;
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
 * REST controller for managing Produtor.
 */
@RestController
@RequestMapping("/api")
public class ProdutorResource {

    private final Logger log = LoggerFactory.getLogger(ProdutorResource.class);

    private static final String ENTITY_NAME = "produtor";

    private ProdutorRepository produtorRepository;

    public ProdutorResource(ProdutorRepository produtorRepository) {
        this.produtorRepository = produtorRepository;
    }

    /**
     * POST  /produtors : Create a new produtor.
     *
     * @param produtor the produtor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new produtor, or with status 400 (Bad Request) if the produtor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/produtors")
    @Timed
    public ResponseEntity<Produtor> createProdutor(@RequestBody Produtor produtor) throws URISyntaxException {
        log.debug("REST request to save Produtor : {}", produtor);
        if (produtor.getId() != null) {
            throw new BadRequestAlertException("A new produtor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produtor result = produtorRepository.save(produtor);
        return ResponseEntity.created(new URI("/api/produtors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /produtors : Updates an existing produtor.
     *
     * @param produtor the produtor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated produtor,
     * or with status 400 (Bad Request) if the produtor is not valid,
     * or with status 500 (Internal Server Error) if the produtor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/produtors")
    @Timed
    public ResponseEntity<Produtor> updateProdutor(@RequestBody Produtor produtor) throws URISyntaxException {
        log.debug("REST request to update Produtor : {}", produtor);
        if (produtor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Produtor result = produtorRepository.save(produtor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, produtor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /produtors : get all the produtors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of produtors in body
     */
    @GetMapping("/produtors")
    @Timed
    public List<Produtor> getAllProdutors() {
        log.debug("REST request to get all Produtors");
        return produtorRepository.findAll();
    }

    /**
     * GET  /produtors/:id : get the "id" produtor.
     *
     * @param id the id of the produtor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the produtor, or with status 404 (Not Found)
     */
    @GetMapping("/produtors/{id}")
    @Timed
    public ResponseEntity<Produtor> getProdutor(@PathVariable String id) {
        log.debug("REST request to get Produtor : {}", id);
        Optional<Produtor> produtor = produtorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produtor);
    }

    /**
     * DELETE  /produtors/:id : delete the "id" produtor.
     *
     * @param id the id of the produtor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/produtors/{id}")
    @Timed
    public ResponseEntity<Void> deleteProdutor(@PathVariable String id) {
        log.debug("REST request to delete Produtor : {}", id);

        produtorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
