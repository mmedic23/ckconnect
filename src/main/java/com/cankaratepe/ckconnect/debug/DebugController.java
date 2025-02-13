package com.cankaratepe.ckconnect.debug;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/debug")
public class DebugController {

    @GetMapping("/test")
    public String testEndpoint(@RequestParam String name) {
        return String.format("Hello, %s!", name);
    }
}
