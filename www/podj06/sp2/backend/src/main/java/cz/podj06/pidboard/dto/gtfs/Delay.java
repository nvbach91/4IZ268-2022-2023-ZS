package cz.podj06.pidboard.dto.gtfs;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class Delay {
    @JsonAlias("is_available")
    private boolean isAvailable;
    private Integer minutes;
    private Integer seconds;
}
