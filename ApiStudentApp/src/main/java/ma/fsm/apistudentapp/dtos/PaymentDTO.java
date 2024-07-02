package ma.fsm.apistudentapp.dtos;

import jakarta.persistence.*;
import lombok.*;
import ma.fsm.apistudentapp.entities.PaymentStatus;
import ma.fsm.apistudentapp.entities.PaymentType;
import ma.fsm.apistudentapp.entities.Student;

import java.time.LocalDate;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class PaymentDTO {
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private String studentCode;
    private PaymentStatus status;
}
