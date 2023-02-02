package cz.podj06.pidboard.dto.gtfs;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class Stop {
    @JsonAlias("stop_name")
    private String stopName;
}
