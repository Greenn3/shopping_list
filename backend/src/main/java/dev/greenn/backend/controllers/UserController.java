package dev.greenn.backend.controllers;

import dev.greenn.backend.domain.User;
import dev.greenn.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public Mono<User> createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public Flux<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/me")
    public Mono<User> getOrCreateUser(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject(); // This is the Keycloak user ID (UUID)
        String username = jwt.getClaim("preferred_username");

        return userRepository.findByKeycloakId(keycloakId)
                .switchIfEmpty(
                        userRepository.save(new User( keycloakId, username))
                );
    }
}