/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.dao;

import com.smt.smt.beans.User;
import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import com.smt.smt.beans.rm.UserRM;
import com.smt.smt.utils.UserService;
import org.springframework.stereotype.Service;

/**
 *
 * @author VMHDCLAP26
 */
@Service
public class SynapseDao {
   private final Logger logger = LogManager.getLogger(this.getClass());
    
    @Autowired
    @Qualifier("jdbcSynapse")
    private JdbcTemplate jdbcTemplate; 
    
     public List<User> validateUser(){
        try {
            logger.info("{}Enter:Blockes Campaigns::{}");
            String query = "select  username,password,email from users";
            if (logger.isDebugEnabled()) {
                logger.info("{}Query:Blocked Campaigns:{}");
            }
            List<User> userdata = jdbcTemplate.query(query, new UserRM());
            Tester();
            Tester1();
            System.out.println("Sucess:---------->"+userdata);
            logger.info("{}Query:Blocked Campaigns:{}"+userdata);
            return userdata;
        } catch (Exception ex) {
            System.out.println("Error: ---------->"+ex.getMessage());
            logger.error("{}Excep:getBlockedCampaigns:Error:{}", ex.getMessage());
            return new ArrayList();
        } 
    }
     
     @Autowired
	UserService userservice;
     
     public User Tester(){
         User user  = new User();
         user.setUserName("kvkchaithanya");
         user.setPassword("*******");
         user.setEmail("kvkchaithanya@gmail.com");
         return user;
     } 
     
     public User Tester1(){
         User user  = new User();
         user.setUserName("kvkchaithanya");
         user.setPassword("*******");
         TestActual(user);
         for (int i=0; i<=10; i++){
             user.setUserName("kvkchaithanya"+i);
         userservice.insertUser(user);
         }
         List<User> userList1 = userservice.getAllUsers();
		for (User employee : userList1) {
			System.out.println(employee.toString());
		}
         return user;
     } 
     
     public String TestActual (User user){
         System.out.println("--------->"+user);
         return "";
     }
    
     
    
}
