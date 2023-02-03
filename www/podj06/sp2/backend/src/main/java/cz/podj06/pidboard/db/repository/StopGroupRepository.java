package cz.podj06.pidboard.db.repository;

import cz.podj06.pidboard.db.entity.StopGroupEntity;
import cz.podj06.pidboard.db.entity.StopGroupSearchView;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopGroupRepository extends CrudRepository<StopGroupEntity, Long>,
        JpaSpecificationExecutor<StopGroupEntity> {

    @Query(
            value = "SELECT cis_id as cisId, full_name as fullName, name," +
                    " point(:lon, :lat) <@>  (point(avg_lon, avg_lat)\\:\\:point) as distance FROM stop_group ORDER BY distance LIMIT 10",
            nativeQuery = true
    )
    List<StopGroupSearchView> searchByGeolocation(@Param("lat") float lat, @Param("lon") float lon);
}
