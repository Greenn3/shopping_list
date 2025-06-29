package dev.greenn.backend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document
public class ShoppingList {
    @Id
    private String id;
    private String name;
private List<String> users = new ArrayList<>();


}
