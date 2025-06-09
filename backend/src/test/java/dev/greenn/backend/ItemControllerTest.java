package dev.greenn.backend;


import dev.greenn.backend.controllers.ItemController;
import dev.greenn.backend.domain.ShoppingListItem;
import dev.greenn.backend.repositories.ItemRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@WebFluxTest(controllers = ItemController.class)
public class ItemControllerTest {

    @Autowired
    private WebTestClient webTestClient;
    @Autowired
    private ItemRepository itemRepository;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public ItemRepository itemRepository() {
            return Mockito.mock(ItemRepository.class);
        }
    }
    @Test
    void createItem_shouldReturnCreatedItem(){
        ShoppingListItem item = new ShoppingListItem();
        item.setName("Juice");
        item.setId("123456");

        Mockito.when(itemRepository.save(Mockito.any()))
                        .thenReturn(Mono.just(item));

        webTestClient.post()
                .uri("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(
                        """
                                
                                                                {
                                "id": "123456",
                                "name": "Juice"
                                }
                                """
                )
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.id").isEqualTo("123456")
                .jsonPath("$.name").isEqualTo("Juice");


    }
//    @Test
//    void createItem_shouldReturnCreatedItemError(){
//        ShoppingListItem item = new ShoppingListItem();
//        item.setName("Juice");
//        item.setId("123456");
//
//        Mockito.when(itemRepository.save(Mockito.any()))
//                .thenReturn(Mono.just(item));
//
//        webTestClient.post()
//                .uri("/items")
//                .contentType(MediaType.APPLICATION_JSON)
//                .bodyValue(
//                        """
//
//                                                                {
//                                "id": "123456",
//                                "age": "Juice"
//                                }
//                                """
//                )
//                .exchange()
//                .expectStatus().isOk()
//                .expectBody()
//                .jsonPath("$.id").isEqualTo("123456")
//                .jsonPath("$.name").isEqualTo("Juice");
//
//
//    }

    @Test
    void getItemsByListId_shouldReturnAllItemsFromList(){
        String listId = "list123";

        ShoppingListItem item1 = new ShoppingListItem();
        item1.setId("item1");
        item1.setName("Milk");
        item1.setListId(listId);

        ShoppingListItem item2 = new ShoppingListItem();
        item2.setId("item2");
        item2.setName("Bread");
        item2.setListId(listId);

        Mockito.when(itemRepository.findAllByListId(listId))
                .thenReturn(Flux.just(item1, item2));

        webTestClient.get()
                .uri("/items/" + listId)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.length()").isEqualTo(2)
                .jsonPath("$[0].id").isEqualTo("item1")
                .jsonPath("$[0].name").isEqualTo("Milk")
                .jsonPath("$[1].id").isEqualTo("item2")
                .jsonPath("$[1].name").isEqualTo("Bread");
    }
    @Test
    void getItemsByListId_wrongId(){

//        Mockito.when(itemRepository.findAllByListId("123456"))
//                .thenReturn(Flux.empty());

        webTestClient.get()
                .uri("/items/" + "123456")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.length()").isEqualTo(0);

    }
}
