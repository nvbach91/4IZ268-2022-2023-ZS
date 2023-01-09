package cz.ijuhan.pidbot.controller;

import cz.ijuhan.pidbot.configuration.DiscordService;
import cz.ijuhan.pidbot.dto.pid.StopsResponse;
import cz.ijuhan.pidbot.service.PidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/control")
@RequiredArgsConstructor
public class ControlController {
    private final DiscordService discordService;
    private final PidService pidService;

    @GetMapping("/re-register")
    public ResponseEntity<Void> reRegisterCommands() {
        discordService.reRegisterCommands();

        return ResponseEntity.ok(null);
    }

    @GetMapping(value = "/pid", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<StopsResponse> getStops() {
        return pidService.getStops();
    }
}
