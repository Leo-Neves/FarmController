package io.farmcontroller.repository;

import io.farmcontroller.domain.Venda;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Venda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaRepository extends MongoRepository<Venda, String> {

}
