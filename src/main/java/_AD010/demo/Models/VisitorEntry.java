package _AD010.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class VisitorEntry {

    @Id
    @GeneratedValue
    Long Id;

    String phone;
    String entryTime;
    String exitTime;
    String status;
}