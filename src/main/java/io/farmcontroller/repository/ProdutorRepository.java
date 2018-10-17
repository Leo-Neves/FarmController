package io.farmcontroller.repository;

import io.farmcontroller.domain.Produtor;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Produtor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutorRepository extends MongoRepository<Produtor, String> {

}
