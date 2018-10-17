package io.farmcontroller.repository;

import io.farmcontroller.domain.Safra;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Safra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SafraRepository extends MongoRepository<Safra, String> {

}
