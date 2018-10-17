package io.farmcontroller.repository;

import io.farmcontroller.domain.ProdutoVenda;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ProdutoVenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoVendaRepository extends MongoRepository<ProdutoVenda, String> {

}
