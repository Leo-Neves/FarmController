package io.farmcontroller.repository;

import io.farmcontroller.domain.Cultura;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Cultura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CulturaRepository extends MongoRepository<Cultura, String> {

}
