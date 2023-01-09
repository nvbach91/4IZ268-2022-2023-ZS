package cz.ijuhan.pidbot.dto.pid;

import lombok.Data;

import java.util.List;

@Data
public class StopGroup {
    private String name;
    private String fullName;
    private int cis;
    private List<Stop> stops;
}
