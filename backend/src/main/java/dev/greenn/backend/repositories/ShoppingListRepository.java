package dev.greenn.backend.repositories;


import dev.greenn.backend.domain.ShoppingList;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ShoppingListRepository extends ReactiveMongoRepository<ShoppingList, String> {
}
