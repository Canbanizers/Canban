-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 19. Nov 2013 um 20:55
-- Server Version: 5.5.32
-- PHP-Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `canban`
--
CREATE DATABASE IF NOT EXISTS `canban` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `canban`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `grouphasticket`
--

CREATE TABLE IF NOT EXISTS `grouphasticket` (
  `id_Ticket` int(11) NOT NULL,
  `id_Creator` int(11) NOT NULL,
  `id_Last_Modifier` int(11) NOT NULL,
  KEY `fk_Creator_idx` (`id_Creator`),
  KEY `fk_Last_Modifier_idx` (`id_Last_Modifier`),
  KEY `fk_Ticket_of_group_idx` (`id_Ticket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `grouphasuser`
--

CREATE TABLE IF NOT EXISTS `grouphasuser` (
  `id_Group` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  KEY `fk_Group_idx` (`id_Group`),
  KEY `fk_User_idx` (`id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `grouproles`
--

CREATE TABLE IF NOT EXISTS `grouproles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `invitations`
--

CREATE TABLE IF NOT EXISTS `invitations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invitation_date` timestamp NULL DEFAULT NULL,
  `invitation_state` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_modify_date` timestamp NULL DEFAULT NULL,
  `wip` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Daten für Tabelle `tickets`
--

INSERT INTO `tickets` (`id`, `state`, `content`, `priority`, `creation_date`, `last_modify_date`, `wip`) VALUES
(4, 1, 'testticket', 7, '2013-09-07 17:18:55', NULL, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userhasgrouproles`
--

CREATE TABLE IF NOT EXISTS `userhasgrouproles` (
  `id_GroupRole` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `id_Group` int(11) NOT NULL,
  KEY `fk_GroupRole_idx` (`id_GroupRole`),
  KEY `fk_User_idx` (`id_User`),
  KEY `fk_Group_for_role_idx` (`id_Group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userhasinvitation`
--

CREATE TABLE IF NOT EXISTS `userhasinvitation` (
  `id_Receiver` int(11) NOT NULL,
  `id_Invitation` int(11) NOT NULL,
  `id_Host` int(11) NOT NULL,
  KEY `fk_Receiver_idx` (`id_Receiver`),
  KEY `fk_Invitation_idx` (`id_Invitation`),
  KEY `fk_Host_idx` (`id_Host`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `password` varchar(125) NOT NULL,
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `password`, `lastlogin`) VALUES
(13, 'muster@42.de', 'M', 'Mustermann', '24', '2013-09-07 17:18:55');

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `grouphasticket`
--
ALTER TABLE `grouphasticket`
  ADD CONSTRAINT `fk_Creator_of_ticket` FOREIGN KEY (`id_Creator`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Last_Modifier_of_ticket` FOREIGN KEY (`id_Last_Modifier`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ticket_of_group` FOREIGN KEY (`id_Ticket`) REFERENCES `tickets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `grouphasuser`
--
ALTER TABLE `grouphasuser`
  ADD CONSTRAINT `fk_Group_of_user` FOREIGN KEY (`id_Group`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_of_group` FOREIGN KEY (`id_User`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `userhasgrouproles`
--
ALTER TABLE `userhasgrouproles`
  ADD CONSTRAINT `fk_GroupRole_of_user` FOREIGN KEY (`id_GroupRole`) REFERENCES `grouproles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Group_of_user_for_role` FOREIGN KEY (`id_Group`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_for_role` FOREIGN KEY (`id_User`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `userhasinvitation`
--
ALTER TABLE `userhasinvitation`
  ADD CONSTRAINT `fk_Host_of_invitation` FOREIGN KEY (`id_Host`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Invitation_for_user` FOREIGN KEY (`id_Invitation`) REFERENCES `invitations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Receiver_of_invitation` FOREIGN KEY (`id_Receiver`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
