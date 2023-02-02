package cz.podj06.pidboard.dto.gtfs;

import lombok.Data;

import java.util.List;

@Data
public class DepartureBoardsResponse {

    private List<Stop> stops;
    private List<Departure> departures;
}
