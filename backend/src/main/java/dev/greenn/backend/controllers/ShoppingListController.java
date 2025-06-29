package dev.greenn.backend.controllers;


import dev.greenn.backend.DTOs.AddUserRequest;
import dev.greenn.backend.domain.ShoppingList;
import dev.greenn.backend.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
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
    public Mono<ShoppingList> createList(@RequestBody ShoppingList shoppingList, @AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject(); // This is the Keycloak user ID (UUID)
        System.out.println("keycloakId = " + keycloakId);
        shoppingList.getUsers().add(keycloakId);
        return shoppingListRepository.save(shoppingList);
    }

    @GetMapping
    public Flux<ShoppingList> getAllLists() {
        System.out.println("Controller");
        return shoppingListRepository.findAll();
    }
    @GetMapping("/lists")
    public Flux<ShoppingList> getListsByUsers( @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        System.out.println("userId = " + userId);
        return shoppingListRepository.findByUsersContaining(userId);
    }
    @DeleteMapping("/{id}")
    public Mono<Void> deleteList(@PathVariable String id) {
        System.out.println("🔍 ID from path = " + id);

        return shoppingListRepository.findById(id)
                .switchIfEmpty(Mono.defer(() -> {
                    System.out.println("❌ List not found");
                    return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "List not found"));
                }))
                .flatMap(list -> {
                    System.out.println("✅ Found list: " + list);
                    return shoppingListRepository.deleteById(id).then();
                });
    }

//    @PutMapping("/{id}/items")
//    public Mono<ShoppingList> addItemToList(@PathVariable String id, @RequestBody String newItem) {
//        return shoppingListRepository.findById(id)
//                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "List not found")))
//                .flatMap(list -> {
//                    list.getItems().add(newItem); // 👈 modify the list
//                    return shoppingListRepository.save(list); // 👈 save the updated doc
//                });
//    }
//
    @PutMapping("/{id}")
    public Mono<ShoppingList> addUser(@PathVariable String id, @RequestBody AddUserRequest request){
    return shoppingListRepository.findById(id)
            .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "List not found")))
            .flatMap(list ->{
                list.getUsers().add(request.getUserId());
                return shoppingListRepository.save(list);
            });
    }






}


