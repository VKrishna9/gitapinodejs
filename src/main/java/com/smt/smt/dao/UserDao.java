/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.dao;

import com.smt.smt.beans.User;
import java.util.List;

/**
 *
 * @author VMHDCLAP26
 */
public interface UserDao {
    void insertUser(User user);
	void insertUsers(List<User> employees);
	List<User> getAllUsers();
//	User getUserById(String empId);
}
