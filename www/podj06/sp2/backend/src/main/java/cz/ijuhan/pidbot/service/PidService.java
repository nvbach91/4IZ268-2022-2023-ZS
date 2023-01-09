package cz.ijuhan.pidbot.service;

import cz.ijuhan.pidbot.client.PidClient;
import cz.ijuhan.pidbot.dto.pid.StopsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PidService {
    private final PidClient pidClient;

    public Mono<StopsResponse> getStops() {
        return pidClient.getStops();
    }
}
