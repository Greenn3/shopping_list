package dev.greenn.backend.controllers;


import dev.greenn.backend.domain.ShoppingList;
import dev.greenn.backend.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/shoppingLists")
public class ShoppingListController {

    private final ShoppingListRepository shoppingListRepository;
@Autowired
    public ShoppingListController(ShoppingListRepository shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository;
    }


    @PostMapping
    public Mono<ShoppingList> createList(@RequestBody ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    @GetMapping
    public Flux<ShoppingList> getAllLists() {
        return shoppingListRepository.findAll();
    }


}
