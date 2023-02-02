package cz.podj06.pidboard.client;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public class GolemioClient implements InitializingBean {
    @Value("${golemio.apiKey}")
    private String apiKey;

    protected WebClient client;

    @Override
    public void afterPropertiesSet() throws Exception {
        client = WebClient
                .builder()
                .baseUrl("https://api.golemio.cz")
                .defaultHeader("X-Access-Token", apiKey)
                .build();
    }
}
