/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.service.impl;

import com.smt.smt.beans.User;
import com.smt.smt.dao.UserDao;
import com.smt.smt.utils.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 *
 * @author VMHDCLAP26
 */
@Service
@CacheConfig(cacheNames = "users")
//@CacheConfig(cacheNames = "users");
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;

	@Override
	public void insertUser(User user) {
		userDao.insertUser(user);
	}

	@Override
	public void insertUsers(List<User> users) {
		userDao.insertUsers(users);
	}

	@Override
	@Cacheable()
	public List<User> getAllUsers() {
		System.out.println("Inside the service layer");
		return userDao.getAllUsers();

	}

//	@Override
//	public void getUserById(String empId) {
//		User employee = employeeDao.getUserById(empId);
//		System.out.println(employee);
//	}

//    @Override
//    public void getAllUsers() {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }

}