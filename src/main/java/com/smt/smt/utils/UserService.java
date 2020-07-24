/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.utils;

import com.smt.smt.beans.User;
import java.util.List;

/**
 *
 * @author VMHDCLAP26
 */
public interface UserService {
    void insertUser(User user);
	void insertUsers(List<User> users);
	List<User> getAllUsers();
	//void getUserById(String empid);
}
