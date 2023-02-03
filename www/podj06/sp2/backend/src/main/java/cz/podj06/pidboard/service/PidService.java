package cz.podj06.pidboard.service;

import cz.podj06.pidboard.client.GtfsClient;
import cz.podj06.pidboard.client.PidClient;
import cz.podj06.pidboard.dto.gtfs.DepartureBoardsResponse;
import cz.podj06.pidboard.dto.pid.StopsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PidService {
    private final PidClient pidClient;
    private final GtfsClient gtfsClient;

    public Mono<StopsResponse> getStops() {
        return pidClient.getStops();
    }
    public Mono<DepartureBoardsResponse> getDepartureBoard(long cisId) {
        return gtfsClient.getDepartureBoard(cisId)
                .map(response -> {
                   response.setStops(response.getStops().isEmpty() ? List.of() : List.of(response.getStops().get(0)));

                   return response;
                });
    }
}
