package dev.greenn.backend;


import dev.greenn.backend.domain.ShoppingList;
import dev.greenn.backend.repositories.ShoppingListRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
@ActiveProfiles("test")
@DataMongoTest
public class ShoppingListRepositoryTest {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @BeforeEach
    void cleanDb() {
        shoppingListRepository.deleteAll().block();
    }

    @Test
    void findAll_shouldReturnCorrectItems(){

        ShoppingList list1 = new ShoppingList();
        list1.setName("Groceries");

        ShoppingList list2 = new ShoppingList();
        list2.setName("Clothes");

        shoppingListRepository.saveAll(List.of(list1, list2)).blockLast();

        List<ShoppingList> lists = shoppingListRepository.findAll().collectList().block();

        assertNotNull(lists);
        assertEquals(2, lists.size());
        assertEquals("Groceries", lists.get(0).getName());

        
    }

}
