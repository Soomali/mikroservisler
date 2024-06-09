package br.com.ms.payments.dto;

import br.com.ms.payments.model.Money;
import br.com.ms.payments.model.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToOne;
import java.math.BigDecimal;

@Getter
@Setter
public class PaymentDTO {
    private Long id;
    private BigDecimal value;
    private String name;
    private String number;
    private String expiration;
    private String code;
    private Status status;
    private Long orderId;
    private Long paymentMode;
    private MoneyDTO money;

}
