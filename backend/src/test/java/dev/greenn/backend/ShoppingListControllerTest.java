package dev.greenn.backend;


import dev.greenn.backend.controllers.ShoppingListController;
import dev.greenn.backend.domain.ShoppingList;
import dev.greenn.backend.repositories.ShoppingListRepository;
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


@WebFluxTest(controllers = ShoppingListController.class)
public class ShoppingListControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Test
    void createList_shouldReturnSavedList() {
        ShoppingList list = new ShoppingList();
        list.setId("abc123");
        list.setName("Groceries");

        Mockito.when(shoppingListRepository.save(Mockito.any()))
                .thenReturn(Mono.just(list));

        webTestClient.post()
                .uri("/shoppingLists")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("""
                    {
                        "name": "Groceries"
                    }
                """)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.id").isEqualTo("abc123")
                .jsonPath("$.name").isEqualTo("Groceries");
    }

    @Test
    void getAllLists_shouldReturnSavedList() {
        ShoppingList list = new ShoppingList();
        list.setId("abc123");
        list.setName("Groceries");

        Mockito.when(shoppingListRepository.findAll())
                .thenReturn(Flux.just(list));

        webTestClient.get()
                .uri("/shoppingLists")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].id").isEqualTo("abc123")
                .jsonPath("$[0].name").isEqualTo("Groceries");
    }

    // ✅ Manual Mockito configuration to replace @MockBean
    @TestConfiguration
    static class TestConfig {
        @Bean
        public ShoppingListRepository shoppingListRepository() {
            return Mockito.mock(ShoppingListRepository.class);
        }
    }
}

