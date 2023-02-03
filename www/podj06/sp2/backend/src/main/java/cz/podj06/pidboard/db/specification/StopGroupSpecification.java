package cz.podj06.pidboard.db.specification;

import cz.podj06.pidboard.db.entity.StopGroupEntity;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class StopGroupSpecification implements Specification<StopGroupEntity> {

    private final List<String> terms;

    public StopGroupSpecification(List<String> terms) {
        this.terms = terms;
    }

    @Override
    public Predicate toPredicate(
            Root<StopGroupEntity> root,
            CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder
    ) {
        query.orderBy(criteriaBuilder.asc(criteriaBuilder.length(root.get("name"))));
        return criteriaBuilder
                .and(
                        terms
                                .stream()
                                .map(
                                        t -> criteriaBuilder.like(
                                                criteriaBuilder.lower(root.get("name")),
                                                ("%" + t + "%").toLowerCase()
                                        )
                                ).toArray(Predicate[]::new)
                );
    }
}
