package _AD010.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SecurityGuard {

    @Id
    @GeneratedValue
    Long Id;

    String Name;
    String Phone;
    String Email;
    String Address;
    String Shift;
}