package cz.podj06.pidboard.controller;

import cz.podj06.pidboard.db.entity.StopGroupSearchView;
import cz.podj06.pidboard.dto.gtfs.DepartureBoardsResponse;
import cz.podj06.pidboard.dto.response.SearchByNameResponseDto;
import cz.podj06.pidboard.service.PidService;
import cz.podj06.pidboard.service.StopsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stops")
@RequiredArgsConstructor
public class StopsController {

    private final StopsService stopsService;
    private final PidService pidService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello!");
    }

    @PostMapping("/search/by-name/{query}")
    public List<SearchByNameResponseDto> searchByName(@PathVariable("query") String query) {
        if (query.length() < 3) {
            return List.of();
        }

        return stopsService.searchByName(query);
    }

    @PostMapping("/search/by-location/{lat}/{lon}")
    public List<StopGroupSearchView> searchByLocation(@PathVariable("lat") float lat, @PathVariable("lon") float lon) {
        return stopsService.searchByLocation(lat, lon);
    }

    @PostMapping("/departure-board/{cisId}")
    public Mono<DepartureBoardsResponse> getDepartureBoard(@PathVariable("cisId") long cisId) {
        return pidService.getDepartureBoard(cisId);
    }
}
