package dev.greenn.backend.controllers;


import dev.greenn.backend.domain.ShoppingListItem;
import dev.greenn.backend.repositories.ItemRepository;
import dev.greenn.backend.repositories.ShoppingListRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemRepository itemRepository;
    private final ShoppingListRepository shoppingListRepository;
@Autowired
    public ItemController(ItemRepository itemRepository, ShoppingListRepository shoppingListRepository) {
        this.itemRepository = itemRepository;
    this.shoppingListRepository = shoppingListRepository;
}

    @PostMapping
    public Mono<ShoppingListItem> createItem(@Valid @RequestBody ShoppingListItem item) {
    String listId = item.getListId();

        return shoppingListRepository.findById(listId)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "List not found")))
                .flatMap(list -> itemRepository.save(item));
    }

    @GetMapping
    public Flux<ShoppingListItem> getAllItems() {
        return itemRepository.findAll();
    }

@GetMapping("/{id}")
    public Flux<ShoppingListItem> getItemsByListId(@PathVariable String id){
    return itemRepository.findAllByListId((id));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteItem(@PathVariable String id) {

        return itemRepository.findById(id)
                .switchIfEmpty(Mono.defer(() -> {
                    return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
                }))
                .flatMap(list -> {
                    System.out.println("✅ Found list: " + list);
                    return itemRepository.deleteById(id).then();
                });
    }

}
