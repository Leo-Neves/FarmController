package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Cultura;
import io.farmcontroller.repository.CulturaRepository;
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
 * Test class for the CulturaResource REST controller.
 *
 * @see CulturaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class CulturaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_CIENTIFICO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_CIENTIFICO = "BBBBBBBBBB";

    @Autowired
    private CulturaRepository culturaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCulturaMockMvc;

    private Cultura cultura;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CulturaResource culturaResource = new CulturaResource(culturaRepository);
        this.restCulturaMockMvc = MockMvcBuilders.standaloneSetup(culturaResource)
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
    public static Cultura createEntity() {
        Cultura cultura = new Cultura()
            .nome(DEFAULT_NOME)
            .nomeCientifico(DEFAULT_NOME_CIENTIFICO);
        return cultura;
    }

    @Before
    public void initTest() {
        culturaRepository.deleteAll();
        cultura = createEntity();
    }

    @Test
    public void createCultura() throws Exception {
        int databaseSizeBeforeCreate = culturaRepository.findAll().size();

        // Create the Cultura
        restCulturaMockMvc.perform(post("/api/culturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cultura)))
            .andExpect(status().isCreated());

        // Validate the Cultura in the database
        List<Cultura> culturaList = culturaRepository.findAll();
        assertThat(culturaList).hasSize(databaseSizeBeforeCreate + 1);
        Cultura testCultura = culturaList.get(culturaList.size() - 1);
        assertThat(testCultura.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCultura.getNomeCientifico()).isEqualTo(DEFAULT_NOME_CIENTIFICO);
    }

    @Test
    public void createCulturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = culturaRepository.findAll().size();

        // Create the Cultura with an existing ID
        cultura.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCulturaMockMvc.perform(post("/api/culturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cultura)))
            .andExpect(status().isBadRequest());

        // Validate the Cultura in the database
        List<Cultura> culturaList = culturaRepository.findAll();
        assertThat(culturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCulturas() throws Exception {
        // Initialize the database
        culturaRepository.save(cultura);

        // Get all the culturaList
        restCulturaMockMvc.perform(get("/api/culturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cultura.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].nomeCientifico").value(hasItem(DEFAULT_NOME_CIENTIFICO.toString())));
    }
    
    @Test
    public void getCultura() throws Exception {
        // Initialize the database
        culturaRepository.save(cultura);

        // Get the cultura
        restCulturaMockMvc.perform(get("/api/culturas/{id}", cultura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cultura.getId()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.nomeCientifico").value(DEFAULT_NOME_CIENTIFICO.toString()));
    }

    @Test
    public void getNonExistingCultura() throws Exception {
        // Get the cultura
        restCulturaMockMvc.perform(get("/api/culturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCultura() throws Exception {
        // Initialize the database
        culturaRepository.save(cultura);

        int databaseSizeBeforeUpdate = culturaRepository.findAll().size();

        // Update the cultura
        Cultura updatedCultura = culturaRepository.findById(cultura.getId()).get();
        updatedCultura
            .nome(UPDATED_NOME)
            .nomeCientifico(UPDATED_NOME_CIENTIFICO);

        restCulturaMockMvc.perform(put("/api/culturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCultura)))
            .andExpect(status().isOk());

        // Validate the Cultura in the database
        List<Cultura> culturaList = culturaRepository.findAll();
        assertThat(culturaList).hasSize(databaseSizeBeforeUpdate);
        Cultura testCultura = culturaList.get(culturaList.size() - 1);
        assertThat(testCultura.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCultura.getNomeCientifico()).isEqualTo(UPDATED_NOME_CIENTIFICO);
    }

    @Test
    public void updateNonExistingCultura() throws Exception {
        int databaseSizeBeforeUpdate = culturaRepository.findAll().size();

        // Create the Cultura

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCulturaMockMvc.perform(put("/api/culturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cultura)))
            .andExpect(status().isBadRequest());

        // Validate the Cultura in the database
        List<Cultura> culturaList = culturaRepository.findAll();
        assertThat(culturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCultura() throws Exception {
        // Initialize the database
        culturaRepository.save(cultura);

        int databaseSizeBeforeDelete = culturaRepository.findAll().size();

        // Get the cultura
        restCulturaMockMvc.perform(delete("/api/culturas/{id}", cultura.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cultura> culturaList = culturaRepository.findAll();
        assertThat(culturaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cultura.class);
        Cultura cultura1 = new Cultura();
        cultura1.setId("id1");
        Cultura cultura2 = new Cultura();
        cultura2.setId(cultura1.getId());
        assertThat(cultura1).isEqualTo(cultura2);
        cultura2.setId("id2");
        assertThat(cultura1).isNotEqualTo(cultura2);
        cultura1.setId(null);
        assertThat(cultura1).isNotEqualTo(cultura2);
    }
}
