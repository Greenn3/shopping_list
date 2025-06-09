package dev.greenn.backend.controllers;


import dev.greenn.backend.domain.ShoppingListItem;
import dev.greenn.backend.repositories.ItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemRepository itemRepository;
@Autowired
    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @PostMapping
    public Mono<ShoppingListItem> createItem(@Valid @RequestBody ShoppingListItem item) {
        return itemRepository.save(item);
    }

    @GetMapping
    public Flux<ShoppingListItem> getAllItems() {
        return itemRepository.findAll();
    }

@GetMapping("/{id}")
    public Flux<ShoppingListItem> getItemsByListId(@PathVariable String id){
    return itemRepository.findAllByListId((id));
    }

}
