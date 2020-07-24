/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt;

/**
 *
 * @author VMHDCLAP26
 */


//import com.vm.smt.SynapseMonitor.beans.BlockedCampaigns;
//import com.vm.smt.SynapseMonitor.beans.User;
//import com.vm.smt.SynapseMonitor.config.VMClientRedisRoutesStore;
import com.smt.smt.beans.User;
import com.smt.smt.config.DatabaseConfig;
import com.smt.smt.dao.SynapseDao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EnableCaching
@EntityScan(basePackageClasses = {SMTApplication.class//,
    //Jsr310JpaConverters.class
})
//@ComponentScan({"com.vm.smt.security","com.vm.smt.controllers","com.vm.smt.repositories"})
public class SMTApplication implements CommandLineRunner{

    
    @Autowired
    SynapseDao synapseDao;
    
    public static void main(String[] args) {
        SpringApplication.run(SMTApplication.class, args);
    }

    
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("=====================>");
        synapseDao.validateUser();
    }

    
}

