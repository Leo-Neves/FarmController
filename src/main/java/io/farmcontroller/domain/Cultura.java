package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Document(collection = "cultura")
public class Cultura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("nome")
    private String nome;

    @Field("nome_cientifico")
    private String nomeCientifico;

    @DBRef
    @Field("plantio")
    private Set<Plantio> plantios = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cultura nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNomeCientifico() {
        return nomeCientifico;
    }

    public Cultura nomeCientifico(String nomeCientifico) {
        this.nomeCientifico = nomeCientifico;
        return this;
    }

    public void setNomeCientifico(String nomeCientifico) {
        this.nomeCientifico = nomeCientifico;
    }

    public Set<Plantio> getPlantios() {
        return plantios;
    }

    public Cultura plantios(Set<Plantio> plantios) {
        this.plantios = plantios;
        return this;
    }

    public Cultura addPlantio(Plantio plantio) {
        this.plantios.add(plantio);
        plantio.setCultura(this);
        return this;
    }

    public Cultura removePlantio(Plantio plantio) {
        this.plantios.remove(plantio);
        plantio.setCultura(null);
        return this;
    }

    public void setPlantios(Set<Plantio> plantios) {
        this.plantios = plantios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Cultura cultura = (Cultura) o;
        if (cultura.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cultura.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cultura{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", nomeCientifico='" + getNomeCientifico() + "'" +
            "}";
    }
}
