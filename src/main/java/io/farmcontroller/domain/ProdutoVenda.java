package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A ProdutoVenda.
 */
@Document(collection = "produto_venda")
public class ProdutoVenda extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Field("preco")
    private Double preco;

    @DBRef
    @Field("produtosAgricola")
    private Set<ProdutoAgricola> produtosAgricolas = new HashSet<>();
    @DBRef
    @Field("venda")
    private Set<Venda> vendas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getPreco() {
        return preco;
    }

    public ProdutoVenda preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Set<ProdutoAgricola> getProdutosAgricolas() {
        return produtosAgricolas;
    }

    public ProdutoVenda produtosAgricolas(Set<ProdutoAgricola> produtoAgricolas) {
        this.produtosAgricolas = produtoAgricolas;
        return this;
    }

    public ProdutoVenda addProdutosAgricola(ProdutoAgricola produtoAgricola) {
        this.produtosAgricolas.add(produtoAgricola);
        produtoAgricola.setProdutoVenda(this);
        return this;
    }

    public ProdutoVenda removeProdutosAgricola(ProdutoAgricola produtoAgricola) {
        this.produtosAgricolas.remove(produtoAgricola);
        produtoAgricola.setProdutoVenda(null);
        return this;
    }

    public void setProdutosAgricolas(Set<ProdutoAgricola> produtoAgricolas) {
        this.produtosAgricolas = produtoAgricolas;
    }

    public Set<Venda> getVendas() {
        return vendas;
    }

    public ProdutoVenda vendas(Set<Venda> vendas) {
        this.vendas = vendas;
        return this;
    }

    public ProdutoVenda addVenda(Venda venda) {
        this.vendas.add(venda);
        venda.setProdutoVenda(this);
        return this;
    }

    public ProdutoVenda removeVenda(Venda venda) {
        this.vendas.remove(venda);
        venda.setProdutoVenda(null);
        return this;
    }

    public void setVendas(Set<Venda> vendas) {
        this.vendas = vendas;
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
        ProdutoVenda produtoVenda = (ProdutoVenda) o;
        if (produtoVenda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtoVenda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProdutoVenda{" +
            "id=" + getId() +
            ", preco=" + getPreco() +
            "}";
    }
}
