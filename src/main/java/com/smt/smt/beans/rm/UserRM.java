/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.beans.rm;

import com.smt.smt.beans.User;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;

/**
 *
 * @author VMHDCLAP26
 */
public class UserRM implements RowMapper<User>{
    
   private final Logger logger = LogManager.getLogger(this.getClass());
   @Override
    public User mapRow(ResultSet rs, int i) throws SQLException {
        try{
            User user = new User();
            user.setUserName(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setEmail(rs.getString("email"));
            return user;
        }catch(Exception e){
            logger.error("Excep:mapRow:UserRM:Error:{}", e.getMessage());
            return null;
        }
    }

}
