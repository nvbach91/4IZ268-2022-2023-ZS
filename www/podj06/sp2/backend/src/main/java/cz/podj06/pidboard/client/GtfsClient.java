package cz.podj06.pidboard.client;

import cz.podj06.pidboard.dto.gtfs.DepartureBoardsResponse;
import cz.podj06.pidboard.exception.DepartureBoardNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class GtfsClient extends GolemioClient {
    public Mono<DepartureBoardsResponse> getDepartureBoard(long cisId) {
        return client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/pid/departureboards")
                        .queryParam("cisIds", cisId)
                        .queryParam("minutesAfter", 60)
                        .build()
                ).retrieve()
                .onStatus(HttpStatus::is4xxClientError, response -> Mono.error(new DepartureBoardNotFoundException(cisId)))
                .bodyToMono(DepartureBoardsResponse.class);
    }
}
