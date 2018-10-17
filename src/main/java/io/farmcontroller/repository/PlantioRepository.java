package io.farmcontroller.repository;

import io.farmcontroller.domain.Plantio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Plantio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantioRepository extends MongoRepository<Plantio, String> {
    @Query("{}")
    Page<Plantio> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Plantio> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Plantio> findOneWithEagerRelationships(String id);

}
