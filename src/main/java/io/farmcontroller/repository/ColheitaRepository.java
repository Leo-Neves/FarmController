package io.farmcontroller.repository;

import io.farmcontroller.domain.Colheita;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Colheita entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColheitaRepository extends MongoRepository<Colheita, String> {

}
