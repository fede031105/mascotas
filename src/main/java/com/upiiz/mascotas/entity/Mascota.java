package com.upiiz.mascotas.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Integer edad;
    private String raza;
    private String observaciones;

    public Mascota() {
    }

    public Mascota(String nombre, Integer edad, String raza, String observaciones) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.observaciones = observaciones;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) { this.edad = edad; }
    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}