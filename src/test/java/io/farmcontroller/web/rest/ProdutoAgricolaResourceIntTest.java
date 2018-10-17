package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.ProdutoAgricola;
import io.farmcontroller.repository.ProdutoAgricolaRepository;
import io.farmcontroller.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;


import static io.farmcontroller.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProdutoAgricolaResource REST controller.
 *
 * @see ProdutoAgricolaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class ProdutoAgricolaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ProdutoAgricolaRepository produtoAgricolaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restProdutoAgricolaMockMvc;

    private ProdutoAgricola produtoAgricola;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutoAgricolaResource produtoAgricolaResource = new ProdutoAgricolaResource(produtoAgricolaRepository);
        this.restProdutoAgricolaMockMvc = MockMvcBuilders.standaloneSetup(produtoAgricolaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdutoAgricola createEntity() {
        ProdutoAgricola produtoAgricola = new ProdutoAgricola()
            .nome(DEFAULT_NOME);
        return produtoAgricola;
    }

    @Before
    public void initTest() {
        produtoAgricolaRepository.deleteAll();
        produtoAgricola = createEntity();
    }

    @Test
    public void createProdutoAgricola() throws Exception {
        int databaseSizeBeforeCreate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola
        restProdutoAgricolaMockMvc.perform(post("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isCreated());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeCreate + 1);
        ProdutoAgricola testProdutoAgricola = produtoAgricolaList.get(produtoAgricolaList.size() - 1);
        assertThat(testProdutoAgricola.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    public void createProdutoAgricolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola with an existing ID
        produtoAgricola.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutoAgricolaMockMvc.perform(post("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllProdutoAgricolas() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.save(produtoAgricola);

        // Get all the produtoAgricolaList
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtoAgricola.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    public void getProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.save(produtoAgricola);

        // Get the produtoAgricola
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas/{id}", produtoAgricola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produtoAgricola.getId()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    public void getNonExistingProdutoAgricola() throws Exception {
        // Get the produtoAgricola
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas/{id}", "-1"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.save(produtoAgricola);

        int databaseSizeBeforeUpdate = produtoAgricolaRepository.findAll().size();

        // Update the produtoAgricola
        ProdutoAgricola updatedProdutoAgricola = produtoAgricolaRepository.findById(produtoAgricola.getId()).get();
        updatedProdutoAgricola
            .nome(UPDATED_NOME);

        restProdutoAgricolaMockMvc.perform(put("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutoAgricola)))
            .andExpect(status().isOk());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeUpdate);
        ProdutoAgricola testProdutoAgricola = produtoAgricolaList.get(produtoAgricolaList.size() - 1);
        assertThat(testProdutoAgricola.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    public void updateNonExistingProdutoAgricola() throws Exception {
        int databaseSizeBeforeUpdate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutoAgricolaMockMvc.perform(put("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.save(produtoAgricola);

        int databaseSizeBeforeDelete = produtoAgricolaRepository.findAll().size();

        // Get the produtoAgricola
        restProdutoAgricolaMockMvc.perform(delete("/api/produto-agricolas/{id}", produtoAgricola.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdutoAgricola.class);
        ProdutoAgricola produtoAgricola1 = new ProdutoAgricola();
        produtoAgricola1.setId("id1");
        ProdutoAgricola produtoAgricola2 = new ProdutoAgricola();
        produtoAgricola2.setId(produtoAgricola1.getId());
        assertThat(produtoAgricola1).isEqualTo(produtoAgricola2);
        produtoAgricola2.setId("id2");
        assertThat(produtoAgricola1).isNotEqualTo(produtoAgricola2);
        produtoAgricola1.setId(null);
        assertThat(produtoAgricola1).isNotEqualTo(produtoAgricola2);
    }
}
