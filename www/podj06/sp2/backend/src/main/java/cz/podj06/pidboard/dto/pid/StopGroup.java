package cz.podj06.pidboard.dto.pid;

import lombok.Data;

import java.util.List;

@Data
public class StopGroup {
    private String name;
    private String fullName;
    private Long cis;
    private double avgLat;
    private double avgLon;
}
