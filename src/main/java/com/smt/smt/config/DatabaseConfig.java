/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.config;

import com.smt.smt.beans.User;
import com.smt.smt.beans.rm.UserRM;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import static org.hibernate.annotations.common.util.impl.LoggerFactory.logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author VMHDCLAP26
 */
@Configuration
@PropertySource(value = {"file:config/application.properties"})
public class DatabaseConfig {

    private final Logger logger = LogManager.getLogger(this.getClass());
    @Autowired
    private Environment env;

    @Bean(name = "synapsedatasource")
    @ConfigurationProperties(prefix = "spring.synapsedatasource")
    public DataSource synapseDataSource() {
        System.out.println("--------------------------");
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(env.getProperty("spring.synapsedatasource.driverClassName"));
        dataSource.setUrl(env.getProperty("spring.synapsedatasource.url"));
        dataSource.setUsername(env.getProperty("spring.synapsedatasource.username"));
        dataSource.setPassword(env.getProperty("spring.synapsedatasource.password"));
        return dataSource;
    }

    @Bean(name = "jdbcSynapse")
    @Autowired
    public JdbcTemplate synapseJdbcTemplate(@Qualifier("synapsedatasource") DataSource synapsedatasource) {
        return new JdbcTemplate(synapsedatasource);
    }

//    public List<User> validateUser1() {
//        try {
//            logger.info("{}Enter:Blockes Campaigns::{}");
//            String query = "select  username,password,email from users";
//            if (logger.isDebugEnabled()) {
//                logger.info("{}Query:Blocked Campaigns:{}");
//            }
//            List<User> userdata = jdbcTemplate.query(query, new UserRM());
//            System.out.println("Sucess:---------->" + userdata);
//            logger.info("{}Query:Blocked Campaigns:{}" + userdata);
//            return userdata;
//        } catch (Exception ex) {
//            System.out.println("Error: ---------->" + ex.getMessage());
//            logger.error("{}Excep:getBlockedCampaigns:Error:{}", ex.getMessage());
//            return new ArrayList();
//        }
//    }
}
