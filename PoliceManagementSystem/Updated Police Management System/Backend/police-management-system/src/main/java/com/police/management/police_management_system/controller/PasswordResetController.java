package com.police.management.police_management_system.controller;

import com.police.management.police_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PasswordResetController {

    @Autowired
    private UserService userService;

    // Display the Forgot Password form
    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password"; // Renders the forgot password page
    }

    // Handle Forgot Password request
    @PostMapping("/forgot-password")
    public String handleForgotPassword(@RequestParam("email") String email, Model model) {
        // Check if the user's email exists in the system
        if (!userService.doesEmailExist(email)) {
            model.addAttribute("error", "Email address not found.");
            return "forgot-password"; // Return to the forgot password page with an error
        }

        // Delete any existing password reset token for the email
        userService.deleteExistingResetTokenByEmail(email);

        // Generate a password reset token and send an email
        boolean emailSent = userService.sendPasswordResetEmail(email);

        if (emailSent) {
            model.addAttribute("message", "A reset link has been sent to your email.");
        } else {
            model.addAttribute("error", "Failed to send email. Please try again.");
        }

        return "forgot-password"; // Return to the forgot password page with a message or error
    }

    // Display the Password Reset form
    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        boolean isValidToken = userService.validatePasswordResetToken(token);

        if (!isValidToken) {
            model.addAttribute("error", "Invalid or expired password reset token.");
            return "forgot-password"; // Redirect to forgot password page if the token is invalid
        }

        model.addAttribute("token", token); // Pass the token to the form
        return "reset-password"; // Render the reset password page
    }

    // Handle Password Reset form submission
    @PostMapping("/reset-password")
    public String handlePasswordReset(@RequestParam("token") String token,
                                      @RequestParam("newPassword") String newPassword,
                                      @RequestParam("confirmNewPassword") String confirmNewPassword,
                                      Model model) {
        // Ensure the new passwords match
        if (!newPassword.equals(confirmNewPassword)) {
            model.addAttribute("error", "Passwords do not match. Please try again.");
            return "reset-password"; // Show reset password page again with an error
        }

        // Attempt to reset the password using the token
        boolean isResetSuccessful = userService.resetUserPassword(token, newPassword);

        if (isResetSuccessful) {
            model.addAttribute("message", "Your password has been successfully reset. You can now log in.");
            return "login"; // Redirect to the login page upon success
        } else {
            model.addAttribute("error", "Failed to reset password. Please try again.");
            return "reset-password"; // Show reset password page again with an error
        }
    }
}
