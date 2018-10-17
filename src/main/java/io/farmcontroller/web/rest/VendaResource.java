package io.farmcontroller.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.farmcontroller.domain.Venda;
import io.farmcontroller.repository.VendaRepository;
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
 * REST controller for managing Venda.
 */
@RestController
@RequestMapping("/api")
public class VendaResource {

    private final Logger log = LoggerFactory.getLogger(VendaResource.class);

    private static final String ENTITY_NAME = "venda";

    private VendaRepository vendaRepository;

    public VendaResource(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    /**
     * POST  /vendas : Create a new venda.
     *
     * @param venda the venda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new venda, or with status 400 (Bad Request) if the venda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendas")
    @Timed
    public ResponseEntity<Venda> createVenda(@RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to save Venda : {}", venda);
        if (venda.getId() != null) {
            throw new BadRequestAlertException("A new venda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Venda result = vendaRepository.save(venda);
        return ResponseEntity.created(new URI("/api/vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendas : Updates an existing venda.
     *
     * @param venda the venda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated venda,
     * or with status 400 (Bad Request) if the venda is not valid,
     * or with status 500 (Internal Server Error) if the venda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendas")
    @Timed
    public ResponseEntity<Venda> updateVenda(@RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to update Venda : {}", venda);
        if (venda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Venda result = vendaRepository.save(venda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, venda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendas : get all the vendas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendas in body
     */
    @GetMapping("/vendas")
    @Timed
    public List<Venda> getAllVendas() {
        log.debug("REST request to get all Vendas");
        return vendaRepository.findAll();
    }

    /**
     * GET  /vendas/:id : get the "id" venda.
     *
     * @param id the id of the venda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the venda, or with status 404 (Not Found)
     */
    @GetMapping("/vendas/{id}")
    @Timed
    public ResponseEntity<Venda> getVenda(@PathVariable String id) {
        log.debug("REST request to get Venda : {}", id);
        Optional<Venda> venda = vendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(venda);
    }

    /**
     * DELETE  /vendas/:id : delete the "id" venda.
     *
     * @param id the id of the venda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteVenda(@PathVariable String id) {
        log.debug("REST request to delete Venda : {}", id);

        vendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
