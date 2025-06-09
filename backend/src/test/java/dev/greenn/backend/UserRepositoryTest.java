package dev.greenn.backend;


import dev.greenn.backend.domain.User;
import dev.greenn.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;

import static com.mongodb.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
public class UserRepositoryTest {

    @Autowired
private UserRepository userRepository;

    @BeforeEach
    void cleanDb() {
        userRepository.deleteAll().block();
    }
    @Test
    void findAll_shouldReturnAllUsers(){

        User user1 = new User();
        user1.setUserName("Marko");

        User user2 = new User();
        user2.setUserName("Antonio");

        User user3 = new User();
        user3.setUserName("Karlo");

        userRepository.saveAll(List.of(user1, user2, user3)).blockLast();


        List<User> users = userRepository.findAll().collectList().block();

        assertNotNull(users);
        assertEquals(3, users.size());
        assertEquals("Marko", users.get(0).getUserName());
        assertEquals("Antonio", users.get(1).getUserName());
        assertEquals("Karlo", users.get(2).getUserName());

    }

}
