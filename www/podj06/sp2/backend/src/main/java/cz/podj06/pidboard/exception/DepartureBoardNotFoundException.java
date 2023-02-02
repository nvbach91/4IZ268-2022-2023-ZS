package cz.podj06.pidboard.exception;

import lombok.Getter;

@Getter
public class DepartureBoardNotFoundException extends Exception {
    private final long cisId;
    public DepartureBoardNotFoundException(long cisId) {
        super("Departure board with id " + cisId + " not found");
        this.cisId = cisId;
    }
}
