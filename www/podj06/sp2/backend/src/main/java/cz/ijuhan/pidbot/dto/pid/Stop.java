package cz.ijuhan.pidbot.dto.pid;

import lombok.Data;

import java.util.List;

@Data
public class Stop {
    private String id;
    private String platform;
    private List<Line> lines;
    private List<String> gtfsIds;
}
