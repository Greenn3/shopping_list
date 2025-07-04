package dev.greenn.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Getter
@Setter
@Document
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingListItem {

    @Id
    private String id;
    private String name;
    private String creatorId;
    private String listId;

    private String storeName;
    private String amount;
    private String preferredPrice;

}
