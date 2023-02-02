package cz.podj06.pidboard.service;

import cz.podj06.pidboard.db.entity.StopGroupEntity;
import cz.podj06.pidboard.db.entity.StopGroupSearchView;
import cz.podj06.pidboard.db.repository.StopGroupRepository;
import cz.podj06.pidboard.db.specification.StopGroupSpecification;
import cz.podj06.pidboard.dto.pid.StopsResponse;
import cz.podj06.pidboard.dto.response.SearchByNameResponseDto;
import cz.podj06.pidboard.mapper.SearchByNameResponseMapper;
import cz.podj06.pidboard.mapper.StopGroupMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StopsService {
    private final StopGroupRepository stopGroupRepository;
    private final PidService pidService;

    public void saveStops() {
        log.info("Saving stops");
        stopGroupRepository.deleteAll();
        Flux<StopGroupEntity> stopGroups =
                pidService
                        .getStops()
                        .map(StopsResponse::getStopGroups)
                        .flatMapMany(Flux::fromIterable)
                        .map(StopGroupMapper::toEntity);

        stopGroups.subscribe(stopGroupRepository::save);

        log.info("Saving complete");
    }

    public List<SearchByNameResponseDto> searchByName(String searchQuery) {
        List<StopGroupEntity> stopGroups = stopGroupRepository.findAll(
                new StopGroupSpecification(Arrays.stream(searchQuery.split(" ")).toList())
        );

        return stopGroups.stream().map(SearchByNameResponseMapper::fromEntity).toList();
    }

    public List<StopGroupSearchView> searchByLocation(float lat, float lon) {
        return stopGroupRepository.searchByGeolocation(lat, lon);
    }
}
