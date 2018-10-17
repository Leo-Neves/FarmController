package io.farmcontroller.repository;

import io.farmcontroller.domain.Fazenda;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Fazenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FazendaRepository extends MongoRepository<Fazenda, String> {

}
