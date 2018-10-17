package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Document(collection = "plantio")
public class Plantio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Field("data_plantio")
    private LocalDate dataPlantio;

    @Field("data_previsao_colheita")
    private LocalDate dataPrevisaoColheita;

    @Field("quantidade_plantado")
    private Double quantidadePlantado;

    @DBRef
    @Field("talhao")
    @JsonIgnoreProperties("plantios")
    private Talhao talhao;

    @DBRef
    @Field("cultura")
    @JsonIgnoreProperties("plantios")
    private Cultura cultura;

    @DBRef
    @Field("colheita")
    private Colheita colheita;

    @DBRef
    @Field("safra")
    private Set<Safra> safras = new HashSet<>();
    @DBRef
    @Field("insumos")
    private Set<Insumo> insumos = new HashSet<>();

    @DBRef
    @Field("atividades")
    private Set<Atividade> atividades = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDataPlantio() {
        return dataPlantio;
    }

    public Plantio dataPlantio(LocalDate dataPlantio) {
        this.dataPlantio = dataPlantio;
        return this;
    }

    public void setDataPlantio(LocalDate dataPlantio) {
        this.dataPlantio = dataPlantio;
    }

    public LocalDate getDataPrevisaoColheita() {
        return dataPrevisaoColheita;
    }

    public Plantio dataPrevisaoColheita(LocalDate dataPrevisaoColheita) {
        this.dataPrevisaoColheita = dataPrevisaoColheita;
        return this;
    }

    public void setDataPrevisaoColheita(LocalDate dataPrevisaoColheita) {
        this.dataPrevisaoColheita = dataPrevisaoColheita;
    }

    public Double getQuantidadePlantado() {
        return quantidadePlantado;
    }

    public Plantio quantidadePlantado(Double quantidadePlantado) {
        this.quantidadePlantado = quantidadePlantado;
        return this;
    }

    public void setQuantidadePlantado(Double quantidadePlantado) {
        this.quantidadePlantado = quantidadePlantado;
    }

    public Talhao getTalhao() {
        return talhao;
    }

    public Plantio talhao(Talhao talhao) {
        this.talhao = talhao;
        return this;
    }

    public void setTalhao(Talhao talhao) {
        this.talhao = talhao;
    }

    public Cultura getCultura() {
        return cultura;
    }

    public Plantio cultura(Cultura cultura) {
        this.cultura = cultura;
        return this;
    }

    public void setCultura(Cultura cultura) {
        this.cultura = cultura;
    }

    public Colheita getColheita() {
        return colheita;
    }

    public Plantio colheita(Colheita colheita) {
        this.colheita = colheita;
        return this;
    }

    public void setColheita(Colheita colheita) {
        this.colheita = colheita;
    }

    public Set<Safra> getSafras() {
        return safras;
    }

    public Plantio safras(Set<Safra> safras) {
        this.safras = safras;
        return this;
    }

    public Plantio addSafra(Safra safra) {
        this.safras.add(safra);
        safra.setPlantio(this);
        return this;
    }

    public Plantio removeSafra(Safra safra) {
        this.safras.remove(safra);
        safra.setPlantio(null);
        return this;
    }

    public void setSafras(Set<Safra> safras) {
        this.safras = safras;
    }

    public Set<Insumo> getInsumos() {
        return insumos;
    }

    public Plantio insumos(Set<Insumo> insumos) {
        this.insumos = insumos;
        return this;
    }

    public Plantio addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        return this;
    }

    public Plantio removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        return this;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
    }

    public Set<Atividade> getAtividades() {
        return atividades;
    }

    public Plantio atividades(Set<Atividade> atividades) {
        this.atividades = atividades;
        return this;
    }

    public Plantio addAtividade(Atividade atividade) {
        this.atividades.add(atividade);
        return this;
    }

    public Plantio removeAtividade(Atividade atividade) {
        this.atividades.remove(atividade);
        return this;
    }

    public void setAtividades(Set<Atividade> atividades) {
        this.atividades = atividades;
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
        Plantio plantio = (Plantio) o;
        if (plantio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plantio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plantio{" +
            "id=" + getId() +
            ", dataPlantio='" + getDataPlantio() + "'" +
            ", dataPrevisaoColheita='" + getDataPrevisaoColheita() + "'" +
            ", quantidadePlantado=" + getQuantidadePlantado() +
            "}";
    }
}
