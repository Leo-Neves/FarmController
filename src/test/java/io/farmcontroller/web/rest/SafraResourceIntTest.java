package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Safra;
import io.farmcontroller.repository.SafraRepository;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.farmcontroller.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SafraResource REST controller.
 *
 * @see SafraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class SafraResourceIntTest {

    private static final String DEFAULT_ALCUNHA = "AAAAAAAAAA";
    private static final String UPDATED_ALCUNHA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SafraRepository safraRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restSafraMockMvc;

    private Safra safra;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SafraResource safraResource = new SafraResource(safraRepository);
        this.restSafraMockMvc = MockMvcBuilders.standaloneSetup(safraResource)
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
    public static Safra createEntity() {
        Safra safra = new Safra()
            .alcunha(DEFAULT_ALCUNHA)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM);
        return safra;
    }

    @Before
    public void initTest() {
        safraRepository.deleteAll();
        safra = createEntity();
    }

    @Test
    public void createSafra() throws Exception {
        int databaseSizeBeforeCreate = safraRepository.findAll().size();

        // Create the Safra
        restSafraMockMvc.perform(post("/api/safras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(safra)))
            .andExpect(status().isCreated());

        // Validate the Safra in the database
        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeCreate + 1);
        Safra testSafra = safraList.get(safraList.size() - 1);
        assertThat(testSafra.getAlcunha()).isEqualTo(DEFAULT_ALCUNHA);
        assertThat(testSafra.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testSafra.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
    }

    @Test
    public void createSafraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = safraRepository.findAll().size();

        // Create the Safra with an existing ID
        safra.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSafraMockMvc.perform(post("/api/safras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(safra)))
            .andExpect(status().isBadRequest());

        // Validate the Safra in the database
        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkAlcunhaIsRequired() throws Exception {
        int databaseSizeBeforeTest = safraRepository.findAll().size();
        // set the field null
        safra.setAlcunha(null);

        // Create the Safra, which fails.

        restSafraMockMvc.perform(post("/api/safras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(safra)))
            .andExpect(status().isBadRequest());

        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSafras() throws Exception {
        // Initialize the database
        safraRepository.save(safra);

        // Get all the safraList
        restSafraMockMvc.perform(get("/api/safras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(safra.getId())))
            .andExpect(jsonPath("$.[*].alcunha").value(hasItem(DEFAULT_ALCUNHA.toString())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())));
    }
    
    @Test
    public void getSafra() throws Exception {
        // Initialize the database
        safraRepository.save(safra);

        // Get the safra
        restSafraMockMvc.perform(get("/api/safras/{id}", safra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(safra.getId()))
            .andExpect(jsonPath("$.alcunha").value(DEFAULT_ALCUNHA.toString()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()));
    }

    @Test
    public void getNonExistingSafra() throws Exception {
        // Get the safra
        restSafraMockMvc.perform(get("/api/safras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSafra() throws Exception {
        // Initialize the database
        safraRepository.save(safra);

        int databaseSizeBeforeUpdate = safraRepository.findAll().size();

        // Update the safra
        Safra updatedSafra = safraRepository.findById(safra.getId()).get();
        updatedSafra
            .alcunha(UPDATED_ALCUNHA)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM);

        restSafraMockMvc.perform(put("/api/safras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSafra)))
            .andExpect(status().isOk());

        // Validate the Safra in the database
        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeUpdate);
        Safra testSafra = safraList.get(safraList.size() - 1);
        assertThat(testSafra.getAlcunha()).isEqualTo(UPDATED_ALCUNHA);
        assertThat(testSafra.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testSafra.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    public void updateNonExistingSafra() throws Exception {
        int databaseSizeBeforeUpdate = safraRepository.findAll().size();

        // Create the Safra

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSafraMockMvc.perform(put("/api/safras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(safra)))
            .andExpect(status().isBadRequest());

        // Validate the Safra in the database
        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSafra() throws Exception {
        // Initialize the database
        safraRepository.save(safra);

        int databaseSizeBeforeDelete = safraRepository.findAll().size();

        // Get the safra
        restSafraMockMvc.perform(delete("/api/safras/{id}", safra.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Safra> safraList = safraRepository.findAll();
        assertThat(safraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Safra.class);
        Safra safra1 = new Safra();
        safra1.setId("id1");
        Safra safra2 = new Safra();
        safra2.setId(safra1.getId());
        assertThat(safra1).isEqualTo(safra2);
        safra2.setId("id2");
        assertThat(safra1).isNotEqualTo(safra2);
        safra1.setId(null);
        assertThat(safra1).isNotEqualTo(safra2);
    }
}
