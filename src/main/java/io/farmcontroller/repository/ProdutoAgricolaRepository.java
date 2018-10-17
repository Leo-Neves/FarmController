package io.farmcontroller.repository;

import io.farmcontroller.domain.ProdutoAgricola;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ProdutoAgricola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoAgricolaRepository extends MongoRepository<ProdutoAgricola, String> {

}
