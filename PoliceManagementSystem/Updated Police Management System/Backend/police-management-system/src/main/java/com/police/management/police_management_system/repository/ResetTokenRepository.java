package com.police.management.police_management_system.repository;

import com.police.management.police_management_system.model.ResetToken;
import com.police.management.police_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {

    // Delete a reset token by its token value
    void deleteByToken(String token);

    // Find reset token associated with a specific user
    Optional<ResetToken> findByUser(User user);

    // Find reset token by its token value
    Optional<ResetToken> findByToken(String token);
}
