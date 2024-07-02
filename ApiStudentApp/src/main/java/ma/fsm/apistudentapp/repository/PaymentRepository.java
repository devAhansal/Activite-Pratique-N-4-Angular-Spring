package ma.fsm.apistudentapp.repository;

import ma.fsm.apistudentapp.entities.Payment;
import ma.fsm.apistudentapp.entities.PaymentStatus;
import ma.fsm.apistudentapp.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.parameters.P;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);
}
