package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Safra.
 */
@Document(collection = "safra")
public class Safra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("alcunha")
    private String alcunha;

    @Field("data_inicio")
    private LocalDate dataInicio;

    @Field("data_fim")
    private LocalDate dataFim;

    @DBRef
    @Field("plantio")
    @JsonIgnoreProperties("safras")
    private Plantio plantio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAlcunha() {
        return alcunha;
    }

    public Safra alcunha(String alcunha) {
        this.alcunha = alcunha;
        return this;
    }

    public void setAlcunha(String alcunha) {
        this.alcunha = alcunha;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Safra dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Safra dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public Safra plantio(Plantio plantio) {
        this.plantio = plantio;
        return this;
    }

    public void setPlantio(Plantio plantio) {
        this.plantio = plantio;
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
        Safra safra = (Safra) o;
        if (safra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), safra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Safra{" +
            "id=" + getId() +
            ", alcunha='" + getAlcunha() + "'" +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
