package br.com.ms.payments.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoneyDTO {
    private Long id;
    private String unit;
    private Float value;
}
