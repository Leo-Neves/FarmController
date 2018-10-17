package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Produtor;
import io.farmcontroller.repository.ProdutorRepository;
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
 * Test class for the ProdutorResource REST controller.
 *
 * @see ProdutorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class ProdutorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CPF = 1;
    private static final Integer UPDATED_CPF = 2;

    private static final LocalDate DEFAULT_DATA_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ProdutorRepository produtorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restProdutorMockMvc;

    private Produtor produtor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutorResource produtorResource = new ProdutorResource(produtorRepository);
        this.restProdutorMockMvc = MockMvcBuilders.standaloneSetup(produtorResource)
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
    public static Produtor createEntity() {
        Produtor produtor = new Produtor()
            .nome(DEFAULT_NOME)
            .cpf(DEFAULT_CPF)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO);
        return produtor;
    }

    @Before
    public void initTest() {
        produtorRepository.deleteAll();
        produtor = createEntity();
    }

    @Test
    public void createProdutor() throws Exception {
        int databaseSizeBeforeCreate = produtorRepository.findAll().size();

        // Create the Produtor
        restProdutorMockMvc.perform(post("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isCreated());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeCreate + 1);
        Produtor testProdutor = produtorList.get(produtorList.size() - 1);
        assertThat(testProdutor.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProdutor.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testProdutor.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
    }

    @Test
    public void createProdutorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtorRepository.findAll().size();

        // Create the Produtor with an existing ID
        produtor.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutorMockMvc.perform(post("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isBadRequest());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllProdutors() throws Exception {
        // Initialize the database
        produtorRepository.save(produtor);

        // Get all the produtorList
        restProdutorMockMvc.perform(get("/api/produtors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtor.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())));
    }
    
    @Test
    public void getProdutor() throws Exception {
        // Initialize the database
        produtorRepository.save(produtor);

        // Get the produtor
        restProdutorMockMvc.perform(get("/api/produtors/{id}", produtor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produtor.getId()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()));
    }

    @Test
    public void getNonExistingProdutor() throws Exception {
        // Get the produtor
        restProdutorMockMvc.perform(get("/api/produtors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProdutor() throws Exception {
        // Initialize the database
        produtorRepository.save(produtor);

        int databaseSizeBeforeUpdate = produtorRepository.findAll().size();

        // Update the produtor
        Produtor updatedProdutor = produtorRepository.findById(produtor.getId()).get();
        updatedProdutor
            .nome(UPDATED_NOME)
            .cpf(UPDATED_CPF)
            .dataNascimento(UPDATED_DATA_NASCIMENTO);

        restProdutorMockMvc.perform(put("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutor)))
            .andExpect(status().isOk());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeUpdate);
        Produtor testProdutor = produtorList.get(produtorList.size() - 1);
        assertThat(testProdutor.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdutor.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testProdutor.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
    }

    @Test
    public void updateNonExistingProdutor() throws Exception {
        int databaseSizeBeforeUpdate = produtorRepository.findAll().size();

        // Create the Produtor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutorMockMvc.perform(put("/api/produtors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtor)))
            .andExpect(status().isBadRequest());

        // Validate the Produtor in the database
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProdutor() throws Exception {
        // Initialize the database
        produtorRepository.save(produtor);

        int databaseSizeBeforeDelete = produtorRepository.findAll().size();

        // Get the produtor
        restProdutorMockMvc.perform(delete("/api/produtors/{id}", produtor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Produtor> produtorList = produtorRepository.findAll();
        assertThat(produtorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produtor.class);
        Produtor produtor1 = new Produtor();
        produtor1.setId("id1");
        Produtor produtor2 = new Produtor();
        produtor2.setId(produtor1.getId());
        assertThat(produtor1).isEqualTo(produtor2);
        produtor2.setId("id2");
        assertThat(produtor1).isNotEqualTo(produtor2);
        produtor1.setId(null);
        assertThat(produtor1).isNotEqualTo(produtor2);
    }
}
