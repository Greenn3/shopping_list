package dev.greenn.backend.repositories;


import dev.greenn.backend.domain.ShoppingList;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ShoppingListRepository extends ReactiveMongoRepository<ShoppingList, String> {
    Flux<ShoppingList> findByUsersContaining(String userId);
}
