package com.upiiz.mascotas.repository;

import com.upiiz.mascotas.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}