package cz.podj06.pidboard.controller;

import cz.podj06.pidboard.dto.pid.StopsResponse;
import cz.podj06.pidboard.service.PidService;
import cz.podj06.pidboard.service.StopsService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@Hidden
@RestController
@RequestMapping("/control")
@RequiredArgsConstructor
public class ControlController {
    private final PidService pidService;

    private final StopsService stopsService;

    @GetMapping(value = "/pid", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<StopsResponse> getStops() {
        return pidService.getStops();
    }

    @GetMapping(value = "/save")
    public ResponseEntity<Void> saveStops() {
        stopsService.saveStops();
        return ResponseEntity.ok(null);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello!");
    }
}
