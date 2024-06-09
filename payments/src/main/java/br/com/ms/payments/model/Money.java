package br.com.ms.payments.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import com.querydsl.core.annotations.QueryEntity;

import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Entity
public class Money {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String unit;

    @NotNull
    private Float value;
}
