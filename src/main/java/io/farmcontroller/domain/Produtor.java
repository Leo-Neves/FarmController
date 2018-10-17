package io.farmcontroller.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.hibernate.annotations.GenericGenerator;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.*;

/**
 * A Produtor.
 */
@Document(collection = "produtor")
public class Produtor extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Field("nome")
    private String nome;

    @Field("cpf")
    private Integer cpf;

    @Field("data_nascimento")
    private LocalDate dataNascimento;

    @DBRef
    @Field("fazenda")
    private Set<Fazenda> fazendas = new HashSet<>();
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

    public Produtor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCpf() {
        return cpf;
    }

    public Produtor cpf(Integer cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(Integer cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Produtor dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Set<Fazenda> getFazendas() {
        return fazendas;
    }

    public Produtor fazendas(Set<Fazenda> fazendas) {
        this.fazendas = fazendas;
        return this;
    }

    public Produtor addFazenda(Fazenda fazenda) {
        this.fazendas.add(fazenda);
        fazenda.setProdutor(this);
        return this;
    }

    public Produtor removeFazenda(Fazenda fazenda) {
        this.fazendas.remove(fazenda);
        fazenda.setProdutor(null);
        return this;
    }

    public void setFazendas(Set<Fazenda> fazendas) {
        this.fazendas = fazendas;
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
        Produtor produtor = (Produtor) o;
        if (produtor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produtor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf=" + getCpf() +
            ", dataNascimento='" + getDataNascimento() + "'" +
            "}";
    }
}
