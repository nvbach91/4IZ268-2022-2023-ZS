package cz.podj06.pidboard.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class RestExceptionHandler {
    @ExceptionHandler(DepartureBoardNotFoundException.class)
    ResponseEntity<Void> departureBoardNotFound(DepartureBoardNotFoundException e) {
        log.info("Departure board with id {} not found", e.getCisId());
        return ResponseEntity.notFound().build();
    }
}
