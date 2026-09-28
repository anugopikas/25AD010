package _AD010.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Visitor {

    @Id
    @GeneratedValue
    Long Id;

    String Name;
    String Phone;
    String VisitDate;
    String FromTime;
    String ToTime;
    Long FlatId;
}