/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 *
 * @author VMHDCLAP26
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    
    private String UserName, Password, Email; 

    public String getUserName() {
        return UserName;
    }

    public String getPassword() {
        return Password;
    }

    public String getEmail() {
        return Email;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public void setPassword(String Password) {
        this.Password = Password;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

   
    
       public User(){
        
    }
       public User(String UserName, String UserPassword) {
        this.UserName = UserName;
        this.Password = Password;
       }
       
    public User(String UserName, String UserPassword, String Email) {
        this.UserName = UserName;
        this.Password = Password;
        this.Email = Email;
    }
    
     @Override
    public String toString() {
        return "User{" + "userName=" + UserName + ", password=" + Password + ", email=" + Email + '}';
    }
}
