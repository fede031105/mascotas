package com.upiiz.mascotas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        // Esto le dice a Spring que busque "mascotas.html" en la carpeta templates
        return "mascotas";
    }
}