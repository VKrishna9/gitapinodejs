/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.config;

/**
 *
 * @author VMHDCLAP26
 */
import com.hazelcast.config.Config;
import com.hazelcast.config.EvictionPolicy;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.MaxSizeConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
@Profile("hazelcast-cache")
public class HazelcastCacheConfig {
 
    
    @Bean
    public Config hazelCastConfig(){
        return new Config()
                .setInstanceName("hazelcast-instance")
                .addMapConfig(
                        new MapConfig()
                                .setName("users")
                                .setMaxSizeConfig(new MaxSizeConfig(200, MaxSizeConfig.MaxSizePolicy.FREE_HEAP_SIZE))
                                .setEvictionPolicy(EvictionPolicy.LRU)
                                .setTimeToLiveSeconds(20));
    }
    
//    @Bean
//    public Config hazelCastConfig() {
// 
//        Config config = new Config();
//        config.setInstanceName("hazelcast-cache");
// 
//        MapConfig allUsersCache = new MapConfig();
//        allUsersCache.setTimeToLiveSeconds(20);
//        allUsersCache.setEvictionPolicy(EvictionPolicy.LFU);
//        config.getMapConfigs().put("alluserscache",allUsersCache);
// 
//        MapConfig usercache = new MapConfig();
//        usercache.setTimeToLiveSeconds(20);
//        usercache.setEvictionPolicy(EvictionPolicy.LFU);
//        config.getMapConfigs().put("usercache",usercache);
// 
//        return config;
//    }
// 
}