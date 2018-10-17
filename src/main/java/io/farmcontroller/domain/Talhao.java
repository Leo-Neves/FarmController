package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.hibernate.annotations.GenericGenerator;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.*;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Document(collection = "talhao")
public class Talhao extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Field("nome")
    private String nome;

    @Field("geometria")
    private String geometria;

    @DBRef
    @Field("fazenda")
    @JsonIgnoreProperties("talhaos")
    private Fazenda fazenda;

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

    public Talhao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getGeometria() {
        return geometria;
    }

    public Talhao geometria(String geometria) {
        this.geometria = geometria;
        return this;
    }

    public void setGeometria(String geometria) {
        this.geometria = geometria;
    }

    public Fazenda getFazenda() {
        return fazenda;
    }

    public Talhao fazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
        return this;
    }

    public void setFazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
    }

    public Set<Plantio> getPlantios() {
        return plantios;
    }

    public Talhao plantios(Set<Plantio> plantios) {
        this.plantios = plantios;
        return this;
    }

    public Talhao addPlantio(Plantio plantio) {
        this.plantios.add(plantio);
        plantio.setTalhao(this);
        return this;
    }

    public Talhao removePlantio(Plantio plantio) {
        this.plantios.remove(plantio);
        plantio.setTalhao(null);
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
        Talhao talhao = (Talhao) o;
        if (talhao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), talhao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Talhao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", geometria='" + getGeometria() + "'" +
            "}";
    }
}
