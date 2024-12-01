package com.police.management.police_management_system.repository;

import com.police.management.police_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their username
    User findByUsername(String username);

    // Find a user by their email
    User findByEmail(String email);

    // Search for users by username or email, allowing partial matches
    List<User> findByUsernameContainingOrEmailContaining(String username, String email);
}
