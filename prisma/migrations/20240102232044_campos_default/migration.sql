-- AlterTable
ALTER TABLE `usuario` MODIFY `confirmado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `rol` VARCHAR(191) NOT NULL DEFAULT 'usuario',
    MODIFY `sesion_iniciada` BOOLEAN NOT NULL DEFAULT false;
