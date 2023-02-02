package cz.podj06.pidboard.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SearchByNameResponseDto {
    private long cisId;
    private String name;
}
