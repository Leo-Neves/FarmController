package io.farmcontroller.web.rest;

import io.farmcontroller.FarmControllerApp;

import io.farmcontroller.domain.Plantio;
import io.farmcontroller.repository.PlantioRepository;
import io.farmcontroller.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static io.farmcontroller.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlantioResource REST controller.
 *
 * @see PlantioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmControllerApp.class)
public class PlantioResourceIntTest {

    private static final LocalDate DEFAULT_DATA_PLANTIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PLANTIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_PREVISAO_COLHEITA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PREVISAO_COLHEITA = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_QUANTIDADE_PLANTADO = 1D;
    private static final Double UPDATED_QUANTIDADE_PLANTADO = 2D;

    @Autowired
    private PlantioRepository plantioRepository;

    @Mock
    private PlantioRepository plantioRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPlantioMockMvc;

    private Plantio plantio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlantioResource plantioResource = new PlantioResource(plantioRepository);
        this.restPlantioMockMvc = MockMvcBuilders.standaloneSetup(plantioResource)
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
    public static Plantio createEntity() {
        Plantio plantio = new Plantio()
            .dataPlantio(DEFAULT_DATA_PLANTIO)
            .dataPrevisaoColheita(DEFAULT_DATA_PREVISAO_COLHEITA)
            .quantidadePlantado(DEFAULT_QUANTIDADE_PLANTADO);
        return plantio;
    }

    @Before
    public void initTest() {
        plantioRepository.deleteAll();
        plantio = createEntity();
    }

    @Test
    public void createPlantio() throws Exception {
        int databaseSizeBeforeCreate = plantioRepository.findAll().size();

        // Create the Plantio
        restPlantioMockMvc.perform(post("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isCreated());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeCreate + 1);
        Plantio testPlantio = plantioList.get(plantioList.size() - 1);
        assertThat(testPlantio.getDataPlantio()).isEqualTo(DEFAULT_DATA_PLANTIO);
        assertThat(testPlantio.getDataPrevisaoColheita()).isEqualTo(DEFAULT_DATA_PREVISAO_COLHEITA);
        assertThat(testPlantio.getQuantidadePlantado()).isEqualTo(DEFAULT_QUANTIDADE_PLANTADO);
    }

    @Test
    public void createPlantioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantioRepository.findAll().size();

        // Create the Plantio with an existing ID
        plantio.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantioMockMvc.perform(post("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isBadRequest());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPlantios() throws Exception {
        // Initialize the database
        plantioRepository.save(plantio);

        // Get all the plantioList
        restPlantioMockMvc.perform(get("/api/plantios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantio.getId())))
            .andExpect(jsonPath("$.[*].dataPlantio").value(hasItem(DEFAULT_DATA_PLANTIO.toString())))
            .andExpect(jsonPath("$.[*].dataPrevisaoColheita").value(hasItem(DEFAULT_DATA_PREVISAO_COLHEITA.toString())))
            .andExpect(jsonPath("$.[*].quantidadePlantado").value(hasItem(DEFAULT_QUANTIDADE_PLANTADO.doubleValue())));
    }
    
    public void getAllPlantiosWithEagerRelationshipsIsEnabled() throws Exception {
        PlantioResource plantioResource = new PlantioResource(plantioRepositoryMock);
        when(plantioRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPlantioMockMvc = MockMvcBuilders.standaloneSetup(plantioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlantioMockMvc.perform(get("/api/plantios?eagerload=true"))
        .andExpect(status().isOk());

        verify(plantioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllPlantiosWithEagerRelationshipsIsNotEnabled() throws Exception {
        PlantioResource plantioResource = new PlantioResource(plantioRepositoryMock);
            when(plantioRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPlantioMockMvc = MockMvcBuilders.standaloneSetup(plantioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlantioMockMvc.perform(get("/api/plantios?eagerload=true"))
        .andExpect(status().isOk());

            verify(plantioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getPlantio() throws Exception {
        // Initialize the database
        plantioRepository.save(plantio);

        // Get the plantio
        restPlantioMockMvc.perform(get("/api/plantios/{id}", plantio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plantio.getId()))
            .andExpect(jsonPath("$.dataPlantio").value(DEFAULT_DATA_PLANTIO.toString()))
            .andExpect(jsonPath("$.dataPrevisaoColheita").value(DEFAULT_DATA_PREVISAO_COLHEITA.toString()))
            .andExpect(jsonPath("$.quantidadePlantado").value(DEFAULT_QUANTIDADE_PLANTADO.doubleValue()));
    }

    @Test
    public void getNonExistingPlantio() throws Exception {
        // Get the plantio
        restPlantioMockMvc.perform(get("/api/plantios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePlantio() throws Exception {
        // Initialize the database
        plantioRepository.save(plantio);

        int databaseSizeBeforeUpdate = plantioRepository.findAll().size();

        // Update the plantio
        Plantio updatedPlantio = plantioRepository.findById(plantio.getId()).get();
        updatedPlantio
            .dataPlantio(UPDATED_DATA_PLANTIO)
            .dataPrevisaoColheita(UPDATED_DATA_PREVISAO_COLHEITA)
            .quantidadePlantado(UPDATED_QUANTIDADE_PLANTADO);

        restPlantioMockMvc.perform(put("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlantio)))
            .andExpect(status().isOk());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeUpdate);
        Plantio testPlantio = plantioList.get(plantioList.size() - 1);
        assertThat(testPlantio.getDataPlantio()).isEqualTo(UPDATED_DATA_PLANTIO);
        assertThat(testPlantio.getDataPrevisaoColheita()).isEqualTo(UPDATED_DATA_PREVISAO_COLHEITA);
        assertThat(testPlantio.getQuantidadePlantado()).isEqualTo(UPDATED_QUANTIDADE_PLANTADO);
    }

    @Test
    public void updateNonExistingPlantio() throws Exception {
        int databaseSizeBeforeUpdate = plantioRepository.findAll().size();

        // Create the Plantio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantioMockMvc.perform(put("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isBadRequest());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePlantio() throws Exception {
        // Initialize the database
        plantioRepository.save(plantio);

        int databaseSizeBeforeDelete = plantioRepository.findAll().size();

        // Get the plantio
        restPlantioMockMvc.perform(delete("/api/plantios/{id}", plantio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plantio.class);
        Plantio plantio1 = new Plantio();
        plantio1.setId("id1");
        Plantio plantio2 = new Plantio();
        plantio2.setId(plantio1.getId());
        assertThat(plantio1).isEqualTo(plantio2);
        plantio2.setId("id2");
        assertThat(plantio1).isNotEqualTo(plantio2);
        plantio1.setId(null);
        assertThat(plantio1).isNotEqualTo(plantio2);
    }
}
