package br.com.ms.payments.repository;

import br.com.ms.payments.model.Money;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoneyRepository extends JpaRepository<Money, Long> {
    // You can define custom query methods here if needed
}
