package ma.fsm.apistudentapp.services;

import jakarta.transaction.Transactional;
import ma.fsm.apistudentapp.dtos.PaymentDTO;
import ma.fsm.apistudentapp.entities.Payment;
import ma.fsm.apistudentapp.entities.PaymentStatus;
import ma.fsm.apistudentapp.entities.PaymentType;
import ma.fsm.apistudentapp.entities.Student;
import ma.fsm.apistudentapp.repository.PaymentRepository;
import ma.fsm.apistudentapp.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }
    public Payment savePayment(MultipartFile file, PaymentDTO paymentDTO) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"),"TP4-Part3","payments");
        if (!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"TP4-Part3","payments",fileName+".pdf");
        Files.copy(file.getInputStream(), filePath);
        Student student = studentRepository.findByCode(paymentDTO.getStudentCode());
        Payment payment = Payment.builder()
                .date(paymentDTO.getDate()).type(paymentDTO.getType()).student(student)
                .amount(paymentDTO.getAmount())
                .file(filePath.toUri().toString())
                .status(PaymentStatus.CREATED)
                .build();
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(PaymentStatus status, Long id){
        Payment payment = paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public byte[] getPaymentFile (Long paymentId) throws IOException {
        Payment payment = paymentRepository.findById(paymentId).get();
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
}
