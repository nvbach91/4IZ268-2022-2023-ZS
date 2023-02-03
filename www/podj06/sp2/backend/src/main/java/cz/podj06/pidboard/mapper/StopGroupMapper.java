package cz.podj06.pidboard.mapper;


import cz.podj06.pidboard.db.entity.StopGroupEntity;
import cz.podj06.pidboard.dto.pid.StopGroup;

public class StopGroupMapper {
    public static StopGroupEntity toEntity(StopGroup stopGroup) {
        StopGroupEntity entity = new StopGroupEntity();
        entity.setName(stopGroup.getName());
        entity.setFullName(stopGroup.getFullName());
        entity.setCisId(stopGroup.getCis());
        entity.setAvgLat(stopGroup.getAvgLat());
        entity.setAvgLon(stopGroup.getAvgLon());

        return entity;
    }
}
