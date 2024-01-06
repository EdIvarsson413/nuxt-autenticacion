/*
  Warnings:

  - You are about to drop the `one_time_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `provider_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refresh_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `provider_users` DROP FOREIGN KEY `provider_users_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `refresh_tokens_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropTable
DROP TABLE `one_time_tokens`;

-- DropTable
DROP TABLE `provider_users`;

-- DropTable
DROP TABLE `refresh_tokens`;

-- DropTable
DROP TABLE `sessions`;

-- DropTable
DROP TABLE `users`;
