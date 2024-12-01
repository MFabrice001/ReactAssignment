package com.police.management.police_management_system.service;

import com.police.management.police_management_system.model.Notification;
import com.police.management.police_management_system.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Fetch all unread notifications.
     * @return list of unread notifications.
     */
    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByIsReadFalse();
    }

    /**
     * Send a new notification.
     *
     * @param title   The title of the notification.
     * @param message The message body of the notification.
     */
    public void sendNotification(Long userId, String title, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId); // Now userId is passed as a parameter
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }


    /**
     * Mark a specific notification as read.
     * @param notificationId The ID of the notification to mark as read.
     */
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    /**
     * Mark all unread notifications as read.
     */
    @Transactional
    public void markAllAsRead() {
        notificationRepository.markAllAsRead();
    }
}
