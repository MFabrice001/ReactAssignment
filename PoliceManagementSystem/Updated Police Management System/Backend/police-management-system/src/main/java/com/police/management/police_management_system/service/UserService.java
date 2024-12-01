package com.police.management.police_management_system.service;

import com.police.management.police_management_system.model.ResetToken;
import com.police.management.police_management_system.model.Role;
import com.police.management.police_management_system.model.User;
import com.police.management.police_management_system.repository.ResetTokenRepository;
import com.police.management.police_management_system.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private HttpSession session; // Injecting HttpSession for session management

    // Automatically add an admin user on application startup
    @PostConstruct
    public void init() {
        addAdminUser(); // Ensure admin user exists in the system
    }

    @Transactional
    public boolean sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false; // User not found
        }

        deleteExistingResetTokenByEmail(email);

        String token = UUID.randomUUID().toString();
        saveResetTokenForUser(user, token);

        String resetUrl = "http://localhost:8080/reset-password?token=" + token;
        String message = "To reset your password, click the link below:\n" + resetUrl;
        sendEmail(email, "Password Reset", message);

        return true;
    }

    private void saveResetTokenForUser(User user, String token) {
        ResetToken resetToken = new ResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        resetTokenRepository.save(resetToken);
    }

    @Transactional
    public void deleteExistingResetTokenByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            resetTokenRepository.findByUser(user).ifPresent(resetToken -> {
                resetTokenRepository.delete(resetToken);
            });
        }
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public boolean doesEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Transactional
    public User registerUser(User user) {
        return userRepository.save(user);
    }


    public Optional<User> findUserByResetToken(String token) {
        return resetTokenRepository.findByToken(token)
                .map(ResetToken::getUser);
    }

    public boolean validatePasswordResetToken(String token) {
        Optional<ResetToken> resetTokenOptional = resetTokenRepository.findByToken(token);
        return resetTokenOptional.isPresent() && resetTokenOptional.get().getExpiryDate().isAfter(LocalDateTime.now());
    }

    @Transactional
    public boolean resetUserPassword(String token, String newPassword) {
        if (!validatePasswordResetToken(token)) {
            return false;
        }

        Optional<User> userOptional = findUserByResetToken(token);
        if (!userOptional.isPresent()) {
            return false;
        }

        User user = userOptional.get();
        user.setPassword(newPassword);
        userRepository.save(user);

        resetTokenRepository.deleteByToken(token);

        return true;
    }

    public void addAdminUser() {
        if (userRepository.findByUsername("admin") == null) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("admin");
            adminUser.setEmail("admin@police.com");
            adminUser.setRole(Role.ROLE_ADMIN);

            userRepository.save(adminUser);
        }
    }

    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> searchUsers(String username, String email) {
        return userRepository.findByUsernameContainingOrEmailContaining(username, email);
    }

    @Transactional
    public void saveAll(List<User> userList) {
        userRepository.saveAll(userList);
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User loginUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            session.setAttribute("loggedInUser", user);
        }
        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }
}
