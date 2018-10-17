package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.hibernate.annotations.GenericGenerator;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.*;

/**
 * A Colheita.
 */
@Document(collection = "colheita")
public class Colheita extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Field("data_colheita")
    private LocalDate dataColheita;

    @Field("produtividade")
    private Double produtividade;

    @DBRef
    @Field("produtoAgricola")
    private ProdutoAgricola produtoAgricola;

    @DBRef
    @Field("plantio")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Plantio plantio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDataColheita() {
        return dataColheita;
    }

    public Colheita dataColheita(LocalDate dataColheita) {
        this.dataColheita = dataColheita;
        return this;
    }

    public void setDataColheita(LocalDate dataColheita) {
        this.dataColheita = dataColheita;
    }

    public Double getProdutividade() {
        return produtividade;
    }

    public Colheita produtividade(Double produtividade) {
        this.produtividade = produtividade;
        return this;
    }

    public void setProdutividade(Double produtividade) {
        this.produtividade = produtividade;
    }

    public ProdutoAgricola getProdutoAgricola() {
        return produtoAgricola;
    }

    public Colheita produtoAgricola(ProdutoAgricola produtoAgricola) {
        this.produtoAgricola = produtoAgricola;
        return this;
    }

    public void setProdutoAgricola(ProdutoAgricola produtoAgricola) {
        this.produtoAgricola = produtoAgricola;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public Colheita plantio(Plantio plantio) {
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
        Colheita colheita = (Colheita) o;
        if (colheita.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), colheita.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Colheita{" +
            "id=" + getId() +
            ", dataColheita='" + getDataColheita() + "'" +
            ", produtividade=" + getProdutividade() +
            "}";
    }
}
