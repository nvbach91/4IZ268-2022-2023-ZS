package cz.podj06.pidboard.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`stop_group`")
@Getter
@Setter
public class StopGroupEntity {
    @Id
    @Column(name = "cis_id")
    private Long cisId;
    private String name;
    private double avgLat;
    private double avgLon;
    @Column(name = "full_name")
    private String fullName;
}
