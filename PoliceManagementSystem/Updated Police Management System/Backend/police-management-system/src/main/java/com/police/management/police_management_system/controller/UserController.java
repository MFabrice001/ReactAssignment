package com.police.management.police_management_system.controller;

import com.police.management.police_management_system.model.Role;
import com.police.management.police_management_system.model.User;
import com.police.management.police_management_system.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.util.Locale;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource; // Injected for localization

    @GetMapping("/home")
    public String home() {
        return "index"; // Home page
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        return "register"; // Registration page
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") User user, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "register"; // If form validation fails, return registration page
        }
        userService.registerUser(user);
        model.addAttribute("message", "Registration successful! You can now log in.");
        return "login"; // Redirect to login page
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("error", model.getAttribute("error"));
        return "login"; // Login page
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String username, @RequestParam String password, HttpSession session, Model model) {
        User user = userService.loginUser(username);

        if (user == null || !user.getPassword().equals(password)) {
            model.addAttribute("error", "Invalid username or password");
            return "login"; // Show login page with error message
        }

        // Set user information in session
        session.setAttribute("loggedInUser", user);

        // Redirect based on role
        switch (user.getRole()) {
            case ROLE_ADMIN:
                return "redirect:/admin"; // Redirect to admin dashboard
            case ROLE_STAFF:
                return "redirect:/staff"; // Redirect to staff dashboard
            case ROLE_CITIZEN:
                return "redirect:/citizen"; // Redirect to citizen dashboard
            default:
                return "redirect:/login"; // Redirect if no matching role
        }
    }

    @GetMapping("/admin")
    public String showAdminDashboard(HttpSession session, Model model,
                                     @RequestParam(defaultValue = "0") int pageNo,
                                     @RequestParam(defaultValue = "10") int pageSize,
                                     @RequestParam(defaultValue = "id") String sortBy) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null || user.getRole() != Role.ROLE_ADMIN) {
            return "redirect:/login"; // Redirect to login if not logged in or not admin
        }

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<User> userPage = userService.getAllUsers(pageable);

        model.addAttribute("users", userPage.getContent());
        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", userPage.getTotalPages());
        model.addAttribute("totalUsers", userPage.getTotalElements());
        model.addAttribute("sortBy", sortBy);

        return "admin-dashboard"; // Admin dashboard page
    }

    @GetMapping("/staff")
    public String staffPage(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null || user.getRole() != Role.ROLE_STAFF) {
            return "redirect:/login"; // Redirect to login if not logged in or not staff
        }
        return "staff-dashboard"; // Staff dashboard page
    }

    @GetMapping("/citizen")
    public String citizenPage(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null || user.getRole() != Role.ROLE_CITIZEN) {
            return "redirect:/login"; // Redirect to login if not logged in or not citizen
        }
        return "citizen-dashboard"; // Citizen dashboard page
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, RedirectAttributes redirectAttributes) {
        session.invalidate();
        redirectAttributes.addFlashAttribute("message", "You are logged out.");
        return "redirect:/login"; // Redirect to login page after logout
    }
}
