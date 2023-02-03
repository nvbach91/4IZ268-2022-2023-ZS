package cz.podj06.pidboard.client;

import cz.podj06.pidboard.dto.pid.StopsResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class PidClient {
    private final WebClient client = WebClient
            .builder()
            .exchangeStrategies(
                    ExchangeStrategies.builder()
                            .codecs(
                                    clientCodecConfigurer -> clientCodecConfigurer
                                            .defaultCodecs()
                                            .maxInMemorySize(50 * 1024 * 1024)
                            )
                            .build()
            )
            .baseUrl("https://data.pid.cz")
            .build();

    public Mono<StopsResponse> getStops() {
        return client.get()
                .uri("/stops/json/stops.json")
                .retrieve()
                .bodyToMono(StopsResponse.class);
    }
}
