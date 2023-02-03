package cz.podj06.pidboard.mapper;

import cz.podj06.pidboard.db.entity.StopGroupEntity;
import cz.podj06.pidboard.dto.response.SearchByNameResponseDto;

public class SearchByNameResponseMapper {
    public static SearchByNameResponseDto fromEntity(StopGroupEntity stopGroupEntity) {
        return SearchByNameResponseDto
                .builder()
                .cisId(stopGroupEntity.getCisId())
                .name(stopGroupEntity.getFullName())
                .build();
    }
}
