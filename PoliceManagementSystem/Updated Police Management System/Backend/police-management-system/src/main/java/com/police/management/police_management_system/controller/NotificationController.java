package com.police.management.police_management_system.controller;

import com.police.management.police_management_system.model.Notification;
import com.police.management.police_management_system.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Get all unread notifications for the current user
    @GetMapping("/user/unread")
    public List<Notification> getUnreadNotificationsForUser() {
        return notificationService.getUnreadNotifications();
    }

    // Send a notification with a specific title and message
    @PostMapping("/send")
    public void sendNotification(@RequestParam Long userId, @RequestParam String title, @RequestParam String message) {
        notificationService.sendNotification(userId, title, message);
    }

    // Mark a specific notification as read by ID
    @PutMapping("/mark-as-read/{id}")
    public void markNotificationAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    // Mark all notifications as read for the current user
    @PutMapping("/user/mark-all-as-read")
    public void markAllNotificationsAsRead() {
        notificationService.markAllAsRead();
    }
}
