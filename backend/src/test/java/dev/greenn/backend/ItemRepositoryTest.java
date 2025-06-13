package dev.greenn.backend;

import dev.greenn.backend.domain.ShoppingListItem;
import dev.greenn.backend.repositories.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static com.mongodb.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
@ActiveProfiles("test")
@DataMongoTest
class ItemRepositoryTest {

    @Autowired
    private ItemRepository itemRepository;
    @BeforeEach
    void cleanDb() {

        itemRepository.deleteAll().block();
    }
    @Test
    void findAllByListId_shouldReturnCorrectItems() {
        // Given

        String listId = "list-123";

        ShoppingListItem item1 = new ShoppingListItem();
        item1.setName("Milk");
        item1.setListId(listId);

        ShoppingListItem item2 = new ShoppingListItem();
        item2.setName("Bread");
        item2.setListId("other-list");

        // When
        itemRepository.saveAll(List.of(item1, item2)).blockLast();

        // Then
        List<ShoppingListItem> items = itemRepository.findAllByListId(listId).collectList().block();

        assertNotNull(items);
        assertEquals(1, items.size());
        assertEquals("Milk", items.get(0).getName());
    }
}
