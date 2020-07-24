/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.service.impl;

import com.smt.smt.beans.User;
import com.smt.smt.beans.rm.UserRM;
import com.smt.smt.dao.UserDao;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import static javafx.scene.input.KeyCode.T;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

/**
 *
 * @author VMHDCLAP26
 */
@Repository
public class UserDaoImpl extends JdbcDaoSupport implements UserDao {
 @Autowired 
	DataSource dataSource;
	
	@PostConstruct
	private void initialize(){
		setDataSource(dataSource);
	}
	
	@Override
	public void insertUser(User user) {
		String sql = "INSERT INTO employee " +
				"(empId, empName) VALUES (?, ?)" ;
		getJdbcTemplate().update(sql, new Object[]{
				user.getUserName(), user.getPassword()
                });
	}
	
	@Override
	public void insertUsers(final List<User> users) {
		String sql = "INSERT INTO employee " + "(empId, empName) VALUES (?, ?)";
		getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				User user = users.get(i);
				ps.setString(1, user.getUserName());
				ps.setString(2, user.getPassword());
			}
			
			public int getBatchSize() {
				return users.size();
			}
		});

	}
	@Override
	public List<User> getAllUsers(){
		String sql = "SELECT * FROM user";
		List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);
		
		List<User> result = new ArrayList<User>();
		for(Map<String, Object> row:rows){
			User user = new User();
			user.setUserName((String)row.get("username"));
			user.setPassword((String)row.get("password"));
			result.add(user);
		}
		
		return result;
	}

//	@Override
//	public User getEmployeeById(String username) {
//		String sql = "SELECT * FROM employee WHERE empId = ?";
//		return (User)getJdbcTemplate().queryForObject(sql, new Object[]{username}, (RowMapper<T>) new RowMapper<UserRM>(){
//			@Override
//			public User mapRow(ResultSet rs, int rwNumber) throws SQLException {
//				User user = new User();
//				user.setUserName(rs.getString("empId"));
//				user.setPassword(rs.getString("empName"));
//				return user;
//			}
//		});
//	}   
}
