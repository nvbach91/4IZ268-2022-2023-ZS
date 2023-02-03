package cz.podj06.pidboard.dto.gtfs;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class DepartureStop {
    @JsonAlias("platform_code")
    private String platformCode;
}
