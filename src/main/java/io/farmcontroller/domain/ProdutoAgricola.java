package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.hibernate.annotations.GenericGenerator;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.*;

/**
 * A ProdutoAgricola.
 */
@Document(collection = "produto_agricola")
public class ProdutoAgricola extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Field("nome")
    private String nome;

    @DBRef
    @Field("colheita")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Colheita colheita;

    @DBRef
    @Field("produtoVenda")
    @JsonIgnoreProperties("produtosAgricolas")
    private ProdutoVenda produtoVenda;

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

    public ProdutoAgricola nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Colheita getColheita() {
        return colheita;
    }

    public ProdutoAgricola colheita(Colheita colheita) {
        this.colheita = colheita;
        return this;
    }

    public void setColheita(Colheita colheita) {
        this.colheita = colheita;
    }

    public ProdutoVenda getProdutoVenda() {
        return produtoVenda;
    }

    public ProdutoAgricola produtoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
        return this;
    }

    public void setProdutoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
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
        ProdutoAgricola produtoAgricola = (ProdutoAgricola) o;
        if (produtoAgricola.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtoAgricola.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProdutoAgricola{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
