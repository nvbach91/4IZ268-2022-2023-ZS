package cz.ijuhan.pidbot.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "`stop_group`")
@Getter
@Setter
public class StopGroupEntity {
    @Id
    @Column(name = "cis_id")
    private Long cisId;
    private String name;
    @Column(name = "full_name")
    private String fullName;
    @OneToMany(mappedBy = "stopGroup")
    private Set<StopEntity> stops;
}
