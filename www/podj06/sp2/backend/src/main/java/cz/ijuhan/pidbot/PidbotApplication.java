package cz.ijuhan.pidbot;

import cz.ijuhan.pidbot.configuration.DiscordService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class PidbotApplication implements CommandLineRunner {

	private final DiscordService service;

	public static void main(String[] args) {
		SpringApplication.run(PidbotApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		service.start();
	}
}
