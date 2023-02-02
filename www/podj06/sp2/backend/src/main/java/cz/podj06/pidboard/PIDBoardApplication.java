package cz.podj06.pidboard;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class PIDBoardApplication {
	public static void main(String[] args) {
		SpringApplication.run(PIDBoardApplication.class, args);
	}
}
