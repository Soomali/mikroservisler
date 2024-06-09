package br.com.ms.payments.service;

import br.com.ms.payments.dto.MoneyDTO;
import br.com.ms.payments.dto.PaymentDTO;
import br.com.ms.payments.model.Money;
import br.com.ms.payments.model.Payment;
import br.com.ms.payments.model.Status;
import br.com.ms.payments.repository.MoneyRepository;
import br.com.ms.payments.repository.PaymentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private MoneyRepository moneyRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<PaymentDTO> getAllPayments(Pageable pageable) {
        return paymentRepository
                .findAll(pageable)
                .map(payment -> modelMapper.map(payment, PaymentDTO.class));
    }

    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(payment, PaymentDTO.class);
    }


    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        // Create Money entity
        Money money = new Money();
        money.setUnit(paymentDTO.getMoney().getUnit());
        money.setValue(paymentDTO.getMoney().getValue());

        // Save Money entity
        Money savedMoney = moneyRepository.save(money);

        // Create Payment entity and set Money
        Payment payment = new Payment();
        payment.setValue(paymentDTO.getValue());
        payment.setName(paymentDTO.getName());
        payment.setNumber(paymentDTO.getNumber());
        payment.setExpiration(paymentDTO.getExpiration());
        payment.setCode(paymentDTO.getCode());
        payment.setStatus(paymentDTO.getStatus());
        payment.setOrderId(paymentDTO.getOrderId());
        payment.setPaymentMode(paymentDTO.getPaymentMode());
        payment.setMoney(savedMoney); // Associate Money with Payment

        // Save Payment entity
        Payment savedPayment = paymentRepository.save(payment);
        return toDTO(savedPayment);
    }

    private PaymentDTO toDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(payment.getId());
        dto.setValue(payment.getValue());
        dto.setName(payment.getName());
        dto.setNumber(payment.getNumber());
        dto.setExpiration(payment.getExpiration());
        dto.setCode(payment.getCode());
        dto.setStatus(payment.getStatus());
        dto.setOrderId(payment.getOrderId());
        dto.setPaymentMode(payment.getPaymentMode());
        // Set Money DTO
        MoneyDTO moneyDTO = new MoneyDTO();
        moneyDTO.setUnit(payment.getMoney().getUnit());
        moneyDTO.setValue(payment.getMoney().getValue());
        dto.setMoney(moneyDTO);
        return dto;
    }
//    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
//        Payment payment = modelMapper.map(paymentDTO, Payment.class);
//        payment.setStatus(Status.CREATED);
////        payment.setMoney(paymentDTO.getMoney());
//        paymentRepository.save(payment);
//        return modelMapper.map(payment, PaymentDTO.class);
//    }

    public PaymentDTO updatePayment(PaymentDTO paymentDTO, Long id) {
        Payment payment = modelMapper.map(paymentDTO, Payment.class);
        payment.setId(id);
        paymentRepository.save(payment);
        return modelMapper.map(payment, PaymentDTO.class);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
