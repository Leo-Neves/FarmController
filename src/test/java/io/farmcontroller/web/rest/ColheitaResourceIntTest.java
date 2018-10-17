package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Colheita;
import io.farmcontroller.repository.ColheitaRepository;
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
 * Test class for the ColheitaResource REST controller.
 *
 * @see ColheitaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class ColheitaResourceIntTest {

    private static final LocalDate DEFAULT_DATA_COLHEITA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_COLHEITA = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRODUTIVIDADE = 1D;
    private static final Double UPDATED_PRODUTIVIDADE = 2D;

    @Autowired
    private ColheitaRepository colheitaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restColheitaMockMvc;

    private Colheita colheita;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColheitaResource colheitaResource = new ColheitaResource(colheitaRepository);
        this.restColheitaMockMvc = MockMvcBuilders.standaloneSetup(colheitaResource)
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
    public static Colheita createEntity() {
        Colheita colheita = new Colheita()
            .dataColheita(DEFAULT_DATA_COLHEITA)
            .produtividade(DEFAULT_PRODUTIVIDADE);
        return colheita;
    }

    @Before
    public void initTest() {
        colheitaRepository.deleteAll();
        colheita = createEntity();
    }

    @Test
    public void createColheita() throws Exception {
        int databaseSizeBeforeCreate = colheitaRepository.findAll().size();

        // Create the Colheita
        restColheitaMockMvc.perform(post("/api/colheitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colheita)))
            .andExpect(status().isCreated());

        // Validate the Colheita in the database
        List<Colheita> colheitaList = colheitaRepository.findAll();
        assertThat(colheitaList).hasSize(databaseSizeBeforeCreate + 1);
        Colheita testColheita = colheitaList.get(colheitaList.size() - 1);
        assertThat(testColheita.getDataColheita()).isEqualTo(DEFAULT_DATA_COLHEITA);
        assertThat(testColheita.getProdutividade()).isEqualTo(DEFAULT_PRODUTIVIDADE);
    }

    @Test
    public void createColheitaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colheitaRepository.findAll().size();

        // Create the Colheita with an existing ID
        colheita.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restColheitaMockMvc.perform(post("/api/colheitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colheita)))
            .andExpect(status().isBadRequest());

        // Validate the Colheita in the database
        List<Colheita> colheitaList = colheitaRepository.findAll();
        assertThat(colheitaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllColheitas() throws Exception {
        // Initialize the database
        colheitaRepository.save(colheita);

        // Get all the colheitaList
        restColheitaMockMvc.perform(get("/api/colheitas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colheita.getId())))
            .andExpect(jsonPath("$.[*].dataColheita").value(hasItem(DEFAULT_DATA_COLHEITA.toString())))
            .andExpect(jsonPath("$.[*].produtividade").value(hasItem(DEFAULT_PRODUTIVIDADE.doubleValue())));
    }
    
    @Test
    public void getColheita() throws Exception {
        // Initialize the database
        colheitaRepository.save(colheita);

        // Get the colheita
        restColheitaMockMvc.perform(get("/api/colheitas/{id}", colheita.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colheita.getId()))
            .andExpect(jsonPath("$.dataColheita").value(DEFAULT_DATA_COLHEITA.toString()))
            .andExpect(jsonPath("$.produtividade").value(DEFAULT_PRODUTIVIDADE.doubleValue()));
    }

    @Test
    public void getNonExistingColheita() throws Exception {
        // Get the colheita
        restColheitaMockMvc.perform(get("/api/colheitas/{id}", "-1"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateColheita() throws Exception {
        // Initialize the database
        colheitaRepository.save(colheita);

        int databaseSizeBeforeUpdate = colheitaRepository.findAll().size();

        // Update the colheita
        Colheita updatedColheita = colheitaRepository.findById(colheita.getId()).get();
        updatedColheita
            .dataColheita(UPDATED_DATA_COLHEITA)
            .produtividade(UPDATED_PRODUTIVIDADE);

        restColheitaMockMvc.perform(put("/api/colheitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColheita)))
            .andExpect(status().isOk());

        // Validate the Colheita in the database
        List<Colheita> colheitaList = colheitaRepository.findAll();
        assertThat(colheitaList).hasSize(databaseSizeBeforeUpdate);
        Colheita testColheita = colheitaList.get(colheitaList.size() - 1);
        assertThat(testColheita.getDataColheita()).isEqualTo(UPDATED_DATA_COLHEITA);
        assertThat(testColheita.getProdutividade()).isEqualTo(UPDATED_PRODUTIVIDADE);
    }

    @Test
    public void updateNonExistingColheita() throws Exception {
        int databaseSizeBeforeUpdate = colheitaRepository.findAll().size();

        // Create the Colheita

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restColheitaMockMvc.perform(put("/api/colheitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colheita)))
            .andExpect(status().isBadRequest());

        // Validate the Colheita in the database
        List<Colheita> colheitaList = colheitaRepository.findAll();
        assertThat(colheitaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteColheita() throws Exception {
        // Initialize the database
        colheitaRepository.save(colheita);

        int databaseSizeBeforeDelete = colheitaRepository.findAll().size();

        // Get the colheita
        restColheitaMockMvc.perform(delete("/api/colheitas/{id}", colheita.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Colheita> colheitaList = colheitaRepository.findAll();
        assertThat(colheitaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colheita.class);
        Colheita colheita1 = new Colheita();
        colheita1.setId("id1");
        Colheita colheita2 = new Colheita();
        colheita2.setId(colheita1.getId());
        assertThat(colheita1).isEqualTo(colheita2);
        colheita2.setId("id2");
        assertThat(colheita1).isNotEqualTo(colheita2);
        colheita1.setId(null);
        assertThat(colheita1).isNotEqualTo(colheita2);
    }
}
