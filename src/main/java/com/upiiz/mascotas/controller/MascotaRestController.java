package com.upiiz.mascotas.controller;

import com.upiiz.mascotas.entity.Mascota;
import com.upiiz.mascotas.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaRestController {

    @Autowired
    private MascotaRepository mascotaRepository;

    // LEER: Devuelve todas las mascotas en formato JSON
    @GetMapping
    public List<Mascota> listarMascotas() {
        return mascotaRepository.findAll();
    }

    // CREAR: Recibe un JSON y guarda la nueva mascota
    @PostMapping
    public Mascota guardarMascota(@RequestBody Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    // ACTUALIZAR: Busca por ID y actualiza los datos
    @PutMapping("/{id}")
    public Mascota actualizarMascota(@PathVariable Long id, @RequestBody Mascota mascota) {
        mascota.setId(id); // Aseguramos que se actualice el ID correcto
        return mascotaRepository.save(mascota);
    }

    // ELIMINAR: Borra la mascota por su ID
    @DeleteMapping("/{id}")
    public void eliminarMascota(@PathVariable Long id) {
        mascotaRepository.deleteById(id);
    }
}