package cz.podj06.pidboard.dto.gtfs;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class Departure {
    private Delay delay;
    private Route route;
    @JsonAlias("departure_timestamp")
    private Timestamp departureTimestamp;
    private Trip trip;
    private DepartureStop stop;
}
