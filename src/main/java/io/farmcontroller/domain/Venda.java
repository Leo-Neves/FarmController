package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Venda.
 */
@Document(collection = "venda")
public class Venda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("data_venda")
    private LocalDate dataVenda;

    @DBRef
    @Field("produtoVenda")
    @JsonIgnoreProperties("vendas")
    private ProdutoVenda produtoVenda;

    @DBRef
    @Field("cliente")
    @JsonIgnoreProperties("vendas")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDataVenda() {
        return dataVenda;
    }

    public Venda dataVenda(LocalDate dataVenda) {
        this.dataVenda = dataVenda;
        return this;
    }

    public void setDataVenda(LocalDate dataVenda) {
        this.dataVenda = dataVenda;
    }

    public ProdutoVenda getProdutoVenda() {
        return produtoVenda;
    }

    public Venda produtoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
        return this;
    }

    public void setProdutoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Venda cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
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
        Venda venda = (Venda) o;
        if (venda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), venda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Venda{" +
            "id=" + getId() +
            ", dataVenda='" + getDataVenda() + "'" +
            "}";
    }
}
