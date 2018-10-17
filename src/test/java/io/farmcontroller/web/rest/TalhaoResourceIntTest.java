package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Talhao;
import io.farmcontroller.repository.TalhaoRepository;
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
 * Test class for the TalhaoResource REST controller.
 *
 * @see TalhaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class TalhaoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_GEOMETRIA = "AAAAAAAAAA";
    private static final String UPDATED_GEOMETRIA = "BBBBBBBBBB";

    @Autowired
    private TalhaoRepository talhaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restTalhaoMockMvc;

    private Talhao talhao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TalhaoResource talhaoResource = new TalhaoResource(talhaoRepository);
        this.restTalhaoMockMvc = MockMvcBuilders.standaloneSetup(talhaoResource)
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
    public static Talhao createEntity() {
        Talhao talhao = new Talhao()
            .nome(DEFAULT_NOME)
            .geometria(DEFAULT_GEOMETRIA);
        return talhao;
    }

    @Before
    public void initTest() {
        talhaoRepository.deleteAll();
        talhao = createEntity();
    }

    @Test
    public void createTalhao() throws Exception {
        int databaseSizeBeforeCreate = talhaoRepository.findAll().size();

        // Create the Talhao
        restTalhaoMockMvc.perform(post("/api/talhaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talhao)))
            .andExpect(status().isCreated());

        // Validate the Talhao in the database
        List<Talhao> talhaoList = talhaoRepository.findAll();
        assertThat(talhaoList).hasSize(databaseSizeBeforeCreate + 1);
        Talhao testTalhao = talhaoList.get(talhaoList.size() - 1);
        assertThat(testTalhao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTalhao.getGeometria()).isEqualTo(DEFAULT_GEOMETRIA);
    }

    @Test
    public void createTalhaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = talhaoRepository.findAll().size();

        // Create the Talhao with an existing ID
        talhao.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTalhaoMockMvc.perform(post("/api/talhaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talhao)))
            .andExpect(status().isBadRequest());

        // Validate the Talhao in the database
        List<Talhao> talhaoList = talhaoRepository.findAll();
        assertThat(talhaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllTalhaos() throws Exception {
        // Initialize the database
        talhaoRepository.save(talhao);

        // Get all the talhaoList
        restTalhaoMockMvc.perform(get("/api/talhaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talhao.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].geometria").value(hasItem(DEFAULT_GEOMETRIA.toString())));
    }
    
    @Test
    public void getTalhao() throws Exception {
        // Initialize the database
        talhaoRepository.save(talhao);

        // Get the talhao
        restTalhaoMockMvc.perform(get("/api/talhaos/{id}", talhao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(talhao.getId()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.geometria").value(DEFAULT_GEOMETRIA.toString()));
    }

    @Test
    public void getNonExistingTalhao() throws Exception {
        // Get the talhao
        restTalhaoMockMvc.perform(get("/api/talhaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTalhao() throws Exception {
        // Initialize the database
        talhaoRepository.save(talhao);

        int databaseSizeBeforeUpdate = talhaoRepository.findAll().size();

        // Update the talhao
        Talhao updatedTalhao = talhaoRepository.findById(talhao.getId()).get();
        updatedTalhao
            .nome(UPDATED_NOME)
            .geometria(UPDATED_GEOMETRIA);

        restTalhaoMockMvc.perform(put("/api/talhaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTalhao)))
            .andExpect(status().isOk());

        // Validate the Talhao in the database
        List<Talhao> talhaoList = talhaoRepository.findAll();
        assertThat(talhaoList).hasSize(databaseSizeBeforeUpdate);
        Talhao testTalhao = talhaoList.get(talhaoList.size() - 1);
        assertThat(testTalhao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTalhao.getGeometria()).isEqualTo(UPDATED_GEOMETRIA);
    }

    @Test
    public void updateNonExistingTalhao() throws Exception {
        int databaseSizeBeforeUpdate = talhaoRepository.findAll().size();

        // Create the Talhao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTalhaoMockMvc.perform(put("/api/talhaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talhao)))
            .andExpect(status().isBadRequest());

        // Validate the Talhao in the database
        List<Talhao> talhaoList = talhaoRepository.findAll();
        assertThat(talhaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTalhao() throws Exception {
        // Initialize the database
        talhaoRepository.save(talhao);

        int databaseSizeBeforeDelete = talhaoRepository.findAll().size();

        // Get the talhao
        restTalhaoMockMvc.perform(delete("/api/talhaos/{id}", talhao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Talhao> talhaoList = talhaoRepository.findAll();
        assertThat(talhaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Talhao.class);
        Talhao talhao1 = new Talhao();
        talhao1.setId("id1");
        Talhao talhao2 = new Talhao();
        talhao2.setId(talhao1.getId());
        assertThat(talhao1).isEqualTo(talhao2);
        talhao2.setId("id2");
        assertThat(talhao1).isNotEqualTo(talhao2);
        talhao1.setId(null);
        assertThat(talhao1).isNotEqualTo(talhao2);
    }
}
