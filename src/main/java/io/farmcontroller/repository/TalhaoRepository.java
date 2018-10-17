package io.farmcontroller.repository;

import io.farmcontroller.domain.Talhao;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Talhao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TalhaoRepository extends MongoRepository<Talhao, String> {

}
