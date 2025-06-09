package dev.greenn.backend.repositories;


import dev.greenn.backend.domain.ShoppingListItem;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ItemRepository extends ReactiveMongoRepository<ShoppingListItem, String> {
    Flux<ShoppingListItem> findAllByListId(String listId);
}
