package cz.ijuhan.pidbot.dto.pid;

import lombok.Data;

import java.util.List;

@Data
public class StopsResponse {
    private String dataFormatVersion;
    private List<StopGroup> stopGroups;
}
