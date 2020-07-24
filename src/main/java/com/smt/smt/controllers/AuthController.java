/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smt.smt.controllers;

import com.smt.smt.beans.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author VMHDCLAP26
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
     private final Logger logger = LogManager.getLogger(this.getClass());
    //  @Autowired
   // private AuthRepository repository;
     
     @RequestMapping(value = "/login", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
    @ApiOperation(value = "Display greeting message to non-admin user")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "OK")
        ,@ApiResponse(code = 404, message = "The resource not found")}
    )
     public String login(@RequestBody User userlogin) {
         System.out.println(userlogin);
         return "OK";
     }
     
     
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
    @ApiOperation(value = "Display greeting message to non-admin user")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "OK")
        ,@ApiResponse(code = 404, message = "The resource not found")}
    )
     public String rehister(@RequestBody User userlogin) {
         System.out.println(userlogin);
         return "OK2";
     }
}
