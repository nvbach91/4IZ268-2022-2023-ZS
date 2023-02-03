package cz.podj06.pidboard.dto.gtfs;

import lombok.Data;

@Data
public class Timestamp {
    private String predicted;
    private String scheduled;
}
