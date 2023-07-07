package com.example.ecommerce.Mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendmail(String to,String Subject,String text){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(Subject);
        message.setText("hello there thank you for joining us please confirme your identit whith this code "+text);
        javaMailSender.send(message);

    }
}
