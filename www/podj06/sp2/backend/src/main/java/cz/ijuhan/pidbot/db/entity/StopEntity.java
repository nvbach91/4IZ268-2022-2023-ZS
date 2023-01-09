package cz.ijuhan.pidbot.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "`stops`")
@Getter
@Setter
public class StopEntity {
    @Id
    private String id;
    private String platform;
    @ManyToOne
    @JoinColumn(name = "stop_group_id", nullable = false)
    private StopGroupEntity stopGroup;
}
