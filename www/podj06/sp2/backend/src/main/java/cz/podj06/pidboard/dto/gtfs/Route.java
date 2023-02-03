package cz.podj06.pidboard.dto.gtfs;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class Route {
    @JsonAlias("short_name")
    private String shortName;
    private int type;
}
